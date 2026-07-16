import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import BranchTable from './components/BranchTable';
import BranchModal from './components/BranchModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { getBranches, saveBranches } from '../../../utils/db';

export default function Branches() {
  const [branches, setBranches] = useState(getBranches() || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({ name: '', address: '' });

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (branch = null) => {
    if (branch) {
      setEditingBranch(branch);
      setFormData({ name: branch.name, address: branch.address });
    } else {
      setEditingBranch(null);
      setFormData({ name: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBranch(null);
    setFormData({ name: '', address: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return;

    let newBranches;
    if (editingBranch) {
      newBranches = branches.map(b => 
        b.id === editingBranch.id 
          ? { ...b, name: formData.name, address: formData.address } 
          : b
      );
    } else {
      const newId = branches.length > 0 ? Math.max(...branches.map(b => b.id)) + 1 : 1;
      newBranches = [...branches, { id: newId, name: formData.name, address: formData.address }];
    }
    
    setBranches(newBranches);
    saveBranches(newBranches);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newBranches = branches.filter(b => b.id !== itemToDelete);
      setBranches(newBranches);
      saveBranches(newBranches);
      setItemToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Filiallar</h1>
          <p className="text-sm text-gray-500 mt-1">Barcha o'quv markaz filiallarini boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yangi filial
        </button>
      </div>

      <div className="mb-6 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Filial nomiga ko'ra qidiring..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      <BranchTable 
        branches={filteredBranches}
        searchQuery={searchQuery}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <BranchModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingBranch}
      />

      <DeleteModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Filialni o'chirishni tasdiqlaysizmi?"
      />
    </div>
  );
}
