import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import TeacherTable from './components/TeacherTable';
import TeacherModal from './components/TeacherModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { getTeachers, saveTeachers, getBranches, getUsers, saveUsers } from '../../../utils/db';

export default function Teachers() {
  const [branches] = useState(getBranches() || []);
  const [users, setUsers] = useState(getUsers() || []);
  const [teachers, setTeachers] = useState(getTeachers() || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', phone: '+998 ', email: '', 
    branch_id: '', salary_per_student: '', is_active: true 
  });

  // Sync users automatically if changed elsewhere (optional, but good if we rely on global state)
  // Real apps use contexts or react-query, but for now we just use local storage on initial load.

  const getBranchName = (branchId) => {
    const branch = branches.find(b => b.id === Number(branchId));
    return branch ? branch.name : 'Noma\'lum';
  };

  const getUser = (userId) => {
    return users.find(u => u.id === Number(userId)) || {};
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(amount);
  };

  const filteredTeachers = teachers.filter(teacher => {
    const user = getUser(teacher.user_id);
    const matchesSearch = (user.name || user.fullname || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === 'all' || teacher.branch_id === Number(branchFilter);
    return matchesSearch && matchesBranch;
  });

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      const user = getUser(teacher.user_id);
      setEditingTeacher(teacher);
      setFormData({ 
        name: user.name || user.fullname || '', 
        phone: user.phone || '', 
        email: user.email || '', 
        branch_id: teacher.branch_id, 
        salary_per_student: teacher.salary_per_student, 
        is_active: teacher.is_active 
      });
    } else {
      setEditingTeacher(null);
      setFormData({ 
        name: '', phone: '', email: '', 
        branch_id: branches.length > 0 ? branches[0].id : '', 
        salary_per_student: '', is_active: true 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
    setFormData({ name: '', phone: '+998 ', email: '', branch_id: '', salary_per_student: '', is_active: true });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.branch_id || !formData.salary_per_student) return;

    let newTeachers;
    let newUsers;

    if (editingTeacher) {
      newUsers = users.map(u => 
        u.id === editingTeacher.user_id 
          ? { ...u, name: formData.name, fullname: formData.name, phone: formData.phone, email: formData.email }
          : u
      );
      newTeachers = teachers.map(t => 
        t.id === editingTeacher.id 
          ? { ...t, branch_id: Number(formData.branch_id), salary_per_student: Number(formData.salary_per_student), is_active: formData.is_active } 
          : t
      );
    } else {
      const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      newUsers = [...users, { id: newUserId, fullname: formData.name, name: formData.name, phone: formData.phone, email: formData.email, role_id: '33333333-3333-3333-3333-333333333333', is_active: true, created_at: new Date().toISOString() }];
      
      const newTeacherId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
      newTeachers = [...teachers, { 
        id: newTeacherId, 
        user_id: newUserId, 
        branch_id: Number(formData.branch_id), 
        salary_per_student: Number(formData.salary_per_student), 
        is_active: formData.is_active 
      }];
    }
    
    setUsers(newUsers);
    saveUsers(newUsers);
    
    setTeachers(newTeachers);
    saveTeachers(newTeachers);
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newTeachers = teachers.filter(t => t.id !== itemToDelete);
      setTeachers(newTeachers);
      saveTeachers(newTeachers);
      setItemToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">O'qituvchilar</h1>
          <p className="text-sm text-gray-500 mt-1">O'quv markazidagi barcha o'qituvchilarni boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yangi o'qituvchi
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="O'qituvchi ismiga ko'ra qidiring..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors appearance-none bg-white cursor-pointer"
          >
            <option value="all">Barcha filiallar</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
      </div>

      <TeacherTable 
        teachers={filteredTeachers}
        searchQuery={searchQuery}
        branchFilter={branchFilter}
        getUser={getUser}
        getBranchName={getBranchName}
        formatMoney={formatMoney}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <TeacherModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        branches={branches}
        isEditing={!!editingTeacher}
      />

      <DeleteModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="O'qituvchini o'chirishni tasdiqlaysizmi?"
      />
    </div>
  );
}
