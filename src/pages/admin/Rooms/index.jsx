import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import RoomTable from './components/RoomTable';
import RoomModal from './components/RoomModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { getRooms, saveRooms, getBranches } from '../../../utils/db';

export default function Rooms() {
  const [branches] = useState(getBranches() || []);
  const [rooms, setRooms] = useState(getRooms() || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({ name: '', capacity: '', branch_id: '' });

  const getBranchName = (branchId) => {
    const branch = branches.find(b => b.id === Number(branchId));
    return branch ? branch.name : 'Noma\'lum';
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === 'all' || room.branch_id === Number(branchFilter);
    return matchesSearch && matchesBranch;
  });

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({ name: room.name, capacity: room.capacity, branch_id: room.branch_id });
    } else {
      setEditingRoom(null);
      setFormData({ name: '', capacity: '', branch_id: branches.length > 0 ? branches[0].id : '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
    setFormData({ name: '', capacity: '', branch_id: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.capacity || !formData.branch_id) return;

    let newRooms;
    if (editingRoom) {
      newRooms = rooms.map(r => 
        r.id === editingRoom.id 
          ? { ...r, name: formData.name, capacity: Number(formData.capacity), branch_id: Number(formData.branch_id) } 
          : r
      );
    } else {
      const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
      newRooms = [...rooms, { id: newId, name: formData.name, capacity: Number(formData.capacity), branch_id: Number(formData.branch_id) }];
    }
    
    setRooms(newRooms);
    saveRooms(newRooms);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newRooms = rooms.filter(r => r.id !== itemToDelete);
      setRooms(newRooms);
      saveRooms(newRooms);
      setItemToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Xonalar</h1>
          <p className="text-sm text-gray-500 mt-1">Filiallardagi o'quv xonalarini boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yangi xona
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Xona nomiga ko'ra qidiring..." 
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

      <RoomTable 
        rooms={filteredRooms}
        searchQuery={searchQuery}
        branchFilter={branchFilter}
        getBranchName={getBranchName}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <RoomModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        branches={branches}
        isEditing={!!editingRoom}
      />

      <DeleteModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Xonani o'chirishni tasdiqlaysizmi?"
      />
    </div>
  );
}
