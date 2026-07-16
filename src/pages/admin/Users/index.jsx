import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { getUsers, saveUsers, getRoles } from '../../../utils/db';

export default function Users() {
  const [roles] = useState(getRoles() || []);
  const [users, setUsers] = useState(getUsers() || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [formData, setFormData] = useState({ 
    fullname: '', phone: '+998 ', email: '', 
    role_id: '', is_active: true 
  });

  const getRoleName = (roleId) => {
    // role.id is a UUID (string) now
    const role = roles.find(r => String(r.id) === String(roleId));
    return role ? role.name : 'Noma\'lum';
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = user.fullname.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
    const matchesRole = roleFilter === 'all' || String(user.role_id) === String(roleFilter);
    return matchesSearch && matchesRole;
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ 
        fullname: user.fullname, 
        phone: user.phone, 
        email: user.email, 
        role_id: user.role_id, 
        is_active: user.is_active 
      });
    } else {
      setEditingUser(null);
      setFormData({ 
        fullname: '', phone: '+998 ', email: '', 
        role_id: roles.length > 0 ? roles[0].id : '', 
        is_active: true 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ fullname: '', phone: '', email: '', role_id: '', is_active: true });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone || !formData.role_id) return;

    let newUsers;
    if (editingUser) {
      newUsers = users.map(u => 
        u.id === editingUser.id 
          ? { ...u, fullname: formData.fullname, phone: formData.phone, email: formData.email, role_id: formData.role_id, is_active: formData.is_active } 
          : u
      );
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const today = new Date().toISOString();
      newUsers = [...users, { 
        id: newId, 
        fullname: formData.fullname, 
        phone: formData.phone, 
        email: formData.email, 
        role_id: formData.role_id, 
        is_active: formData.is_active,
        created_at: today
      }];
    }
    
    setUsers(newUsers);
    saveUsers(newUsers);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newUsers = users.filter(u => u.id !== itemToDelete);
      setUsers(newUsers);
      saveUsers(newUsers);
      setItemToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Xodimlar</h1>
          <p className="text-sm text-gray-500 mt-1">Tizim foydalanuvchilari va xodimlarni boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yangi xodim
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Ism yoki email orqali qidiring..." 
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors appearance-none bg-white cursor-pointer"
          >
            <option value="all">Barcha rollar</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
      </div>

      <UserTable 
        users={filteredUsers}
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        getRoleName={getRoleName}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <UserModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        roles={roles}
        isEditing={!!editingUser}
      />

      <DeleteModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Xodimni o'chirishni tasdiqlaysizmi?"
      />
    </div>
  );
}
