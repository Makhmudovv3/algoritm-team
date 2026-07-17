import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { ParentsHeader } from './components/ParentsHeader';
import { ParentsTable } from './components/ParentsTable';
import { ParentModal } from './components/ParentModal';
import ConfirmModal from '@/components/ConfirmModal';
import { ParentProfileDrawer } from './components/ParentProfileDrawer';

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.Parents.getAll();
      setParents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (parent = null) => {
    if (parent) {
      setEditingId(parent.id);
      setFormData({
        name: parent.name,
        phone: parent.phone,
        password: parent.password || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        phone: '+998 ',
        password: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.phone) return;
    try {
      if (editingId) {
        const updated = await api.Parents.update(editingId, formData);
        setParents(parents.map(p => p.id === editingId ? updated : p));
      } else {
        const created = await api.Parents.create(formData);
        setParents([...parents, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Parents.delete(deleteConfirmId);
        setParents(parents.filter(p => p.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <ParentsHeader onAddParent={() => handleOpenModal()} />
      
      <ParentsTable 
        parents={parents}
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
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />

      <ConfirmModal 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <ParentProfileDrawer
        isOpen={!!selectedParent}
        onClose={() => setSelectedParent(null)}
        parent={selectedParent}
      />
    </div>
  );
}
