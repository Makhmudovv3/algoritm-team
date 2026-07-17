import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import TeachersHeader from './components/TeachersHeader';
import TeachersStats from './components/TeachersStats';
import TeachersFilter from './components/TeachersFilter';
import TeachersTable from './components/TeachersTable';
import TeachersGrid from './components/TeachersGrid';
import TeacherProfileDrawer from './components/TeacherProfileDrawer';
import TeacherFormModal from './components/TeacherFormModal';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [viewMode, setViewMode] = useState('list');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    branch_id: '',
    salary_per_student: '',
    is_active: 'true'
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [tData, uData, bData] = await Promise.all([
        api.Teachers.getAll(),
        api.Users.getAll(),
        api.Branches.getAll()
      ]);
      setTeachers(tData);
      setUsers(uData);
      setBranches(bData);
    } finally {
      setIsLoading(false);
    }
  };

  const userOptions = users.map(u => ({ label: u.name || u.fullname, value: u.id }));
  const branchOptions = branches.map(b => ({ label: b.name, value: b.id }));
  const statusOptions = [
    { label: 'Faol', value: 'true' },
    { label: 'Nofaol', value: 'false' }
  ];

  const handleOpenModal = (t = null) => {
    if (t) {
      setEditingId(t.id);
      setFormData({
        user_id: t.user_id,
        branch_id: t.branch_id,
        salary_per_student: t.salary_per_student,
        is_active: String(t.is_active)
      });
    } else {
      setEditingId(null);
      setFormData({
        user_id: userOptions.length > 0 ? userOptions[0].value : '',
        branch_id: branchOptions.length > 0 ? branchOptions[0].value : '',
        salary_per_student: '',
        is_active: 'true'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: formData.user_id,
        branch_id: formData.branch_id,
        salary_per_student: Number(formData.salary_per_student),
        is_active: formData.is_active === 'true'
      };

      if (editingId) {
        const updated = await api.Teachers.update(editingId, payload);
        setTeachers(teachers.map(t => t.id === editingId ? updated : t));
      } else {
        const created = await api.Teachers.create(payload);
        setTeachers([...teachers, created]);
      }
      setIsModalOpen(false);
    } catch(err) { console.error(err); }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Teachers.delete(deleteConfirmId);
        setTeachers(teachers.filter(t => t.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) { console.error(err); }
    }
  };

  const getUserName = (id) => users.find(u => u.id === id)?.fullname || users.find(u => u.id === id)?.name || 'Noma\'lum';
  const getBranchName = (id) => branches.find(b => b.id === id)?.name || 'Noma\'lum';

  const filteredTeachers = teachers.filter(t => {
    const uName = (getUserName(t.user_id) || '').toLowerCase();
    const matchSearch = uName.includes(searchQuery.toLowerCase());
    const matchBranch = branchFilter ? String(t.branch_id) === String(branchFilter) : true;
    return matchSearch && matchBranch;
  });

  return (
    <div className="space-y-6">
      <TeachersHeader onAdd={() => handleOpenModal()} viewMode={viewMode} setViewMode={setViewMode} />
      <TeachersStats teachers={teachers} />

      <Card>
        <TeachersFilter 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
          branchFilter={branchFilter} setBranchFilter={setBranchFilter} 
          branchOptions={branchOptions} 
        />
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : viewMode === 'list' ? (
          <TeachersTable teachers={filteredTeachers} getUserName={getUserName} getBranchName={getBranchName} onEdit={handleOpenModal} onDelete={setDeleteConfirmId} onViewProfile={setSelectedTeacher} />
        ) : (
          <TeachersGrid teachers={filteredTeachers} getUserName={getUserName} getBranchName={getBranchName} onEdit={handleOpenModal} onDelete={setDeleteConfirmId} onViewProfile={setSelectedTeacher} />
        )}
      </Card>

      <TeacherFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isEditing={!!editingId} formData={formData} setFormData={setFormData} userOptions={userOptions} branchOptions={branchOptions} statusOptions={statusOptions} onSave={handleSave} />

      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="O'chirishni tasdiqlaysizmi?">
        <div className="space-y-4">
          <p className="text-slate-600 ">Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="w-full" onClick={() => setDeleteConfirmId(null)}>Bekor qilish</Button>
            <Button variant="destructive" className="w-full" onClick={handleDeleteConfirm}>O'chirish</Button>
          </div>
        </div>
      </Modal>

      <TeacherProfileDrawer isOpen={!!selectedTeacher} onClose={() => setSelectedTeacher(null)} teacher={selectedTeacher} getUserName={getUserName} getBranchName={getBranchName} />
    </div>
  );
}
