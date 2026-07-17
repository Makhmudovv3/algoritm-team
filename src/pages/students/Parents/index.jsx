import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../../services/api';
import { toast } from 'sonner';
import { generateInitialPassword } from '@/utils/helpers';
import { ParentsHeader } from './components/ParentsHeader';
import { ParentsTable } from './components/ParentsTable';
import { ParentModal } from './components/ParentModal';
import { ParentDeleteModal } from './components/ParentDeleteModal';
import { ParentProfileDrawer } from './components/ParentProfileDrawer';

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  
  const initialForm = { name: '', phone: '+998 ', phone2: '', relation: 'Ota' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [parentsData, studentsData] = await Promise.all([
        api.Parents.getAll(),
        api.Students.getAll()
      ]);
      setParents(parentsData);
      setStudents(studentsData);
    } catch(err) {
      console.error(err);
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (parent = null) => {
    if (parent) {
      setEditingId(parent.id);
      setFormData(parent);
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsFormLoading(true);
    try {
      if (!editingId) {
        // Check for duplicates
        const existing = await api.Parents.findBy('phone', formData.phone);
        if (existing) {
          toast.error("Bu telefon raqamiga ega ota-ona allaqachon mavjud");
          setIsFormLoading(false);
          return;
        }
        
        const payload = { 
          ...formData,
          password_hash: generateInitialPassword(formData.phone) 
        };
        const created = await api.Parents.create(payload);
        setParents([...parents, created]);
        toast.success("Ota-ona muvaffaqiyatli qo'shildi");
      } else {
        const updated = await api.Parents.update(editingId, formData);
        setParents(parents.map(p => p.id === editingId ? updated : p));
        toast.success("Ota-ona ma'lumotlari yangilandi");
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
      toast.error("Saqlashda xatolik yuz berdi");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.Parents.delete(deleteConfirmId);
      setParents(parents.filter(p => p.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Ota-ona o'chirildi");
    } catch(err) {
      console.error(err);
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const filteredParents = useMemo(() => {
    return parents.filter(parent => 
      parent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.phone?.includes(searchQuery)
    );
  }, [parents, searchQuery]);

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <ParentsHeader onAddParent={() => handleOpenModal()} />
      
      <ParentsTable 
        parents={filteredParents} 
        students={students}
        isLoading={isLoading} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onEdit={handleOpenModal} 
        onDelete={(id) => setDeleteConfirmId(id)} 
        onRowClick={(parent) => setSelectedParent(parent)}
      />

      <ParentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        isEditing={!!editingId}
        formData={formData} 
        setFormData={setFormData} 
        onSave={handleSave}
      />

      <ParentDeleteModal 
        isOpen={!!deleteConfirmId} 
        onClose={() => setDeleteConfirmId(null)} 
        onConfirm={handleDeleteConfirm} 
      />

      <ParentProfileDrawer
        isOpen={!!selectedParent}
        onClose={() => setSelectedParent(null)}
        parent={selectedParent}
        students={students}
      />
    </div>
  );
}
