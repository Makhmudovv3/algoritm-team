import React, { useState, useEffect } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import RoleTable from './components/RoleTable';
import RoleModal from './components/RoleModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { getRoles, saveRoles } from '../../../utils/db';

export default function Roles() {
  const [roles, setRoles] = useState(getRoles() || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({ name: '', level: '' });

  const handleOpenModal = (role = null) => {
    if (role) {
      setEditingRole(role);
      setFormData({ name: role.name, level: role.level });
    } else {
      setEditingRole(null);
      setFormData({ name: '', level: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
    setFormData({ name: '', level: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.level) return;

    let newRoles;
    if (editingRole) {
      newRoles = roles.map(r => 
        r.id === editingRole.id 
          ? { ...r, name: formData.name, level: Number(formData.level) } 
          : r
      );
    } else {
      const newId = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      newRoles = [...roles, { id: newId, name: formData.name, level: Number(formData.level), created_at: createdAt }];
    }
    
    setRoles(newRoles);
    saveRoles(newRoles);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newRoles = roles.filter(r => r.id !== itemToDelete);
      setRoles(newRoles);
      saveRoles(newRoles);
      setItemToDelete(null);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 text-white transform hover:scale-105 transition-transform duration-300">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rollar paneli</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Tizimdagi huquqlar va lavozimlarni boshqarish</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Plus size={18} className="relative z-10" />
          <span className="relative z-10">Yangi rol</span>
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <RoleTable 
          roles={roles} 
          onEdit={handleOpenModal} 
          onDelete={handleDelete} 
        />
      </div>

      <RoleModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingRole}
      />

      <DeleteModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Rolni o'chirishni tasdiqlaysizmi?"
      />
    </div>
  );
}
