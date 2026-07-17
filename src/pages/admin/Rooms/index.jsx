import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';

// Components
import RoomsHeader from './components/RoomsHeader';
import RoomsFilter from './components/RoomsFilter';
import RoomsGrid from './components/RoomsGrid';
import RoomFormModal from './components/RoomFormModal';
import RoomDeleteModal from './components/RoomDeleteModal';
import RoomDetailsDrawer from './components/RoomDetailsDrawer';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [detailsRoom, setDetailsRoom] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', capacity: '', branch_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsData, branchesData] = await Promise.all([
        api.Rooms.getAll(),
        api.Branches.getAll()
      ]);
      setRooms(roomsData);
      setBranches(branchesData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBranchName = (branchId) => branches.find(b => b.id === branchId)?.name || 'Noma\'lum';
  const branchOptions = branches.map(b => ({ label: b.name, value: b.id }));

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = (room.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter ? room.branch_id === branchFilter : true;
    return matchesSearch && matchesBranch;
  });

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingId(room.id);
      setFormData({ name: room.name, capacity: room.capacity, branch_id: room.branch_id });
    } else {
      setEditingId(null);
      setFormData({ name: '', capacity: '', branch_id: branchOptions.length > 0 ? branchOptions[0].value : '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.capacity || !formData.branch_id) return;

    try {
      if (editingId) {
        const updated = await api.Rooms.update(editingId, { ...formData, capacity: Number(formData.capacity) });
        setRooms(rooms.map(r => r.id === editingId ? updated : r));
      } else {
        const created = await api.Rooms.create({ ...formData, capacity: Number(formData.capacity) });
        setRooms([...rooms, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Rooms.delete(deleteConfirmId);
        setRooms(rooms.filter(r => r.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <RoomsHeader onAddRoom={() => handleOpenModal()} />
      
      <RoomsFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        branchFilter={branchFilter}
        setBranchFilter={setBranchFilter}
        branchOptions={branchOptions}
      />

      <RoomsGrid 
        rooms={filteredRooms}
        getBranchName={getBranchName}
        onEdit={handleOpenModal}
        onDelete={setDeleteConfirmId}
        onViewDetails={setDetailsRoom}
        isLoading={isLoading}
      />

      <RoomFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        branchOptions={branchOptions}
        handleSave={handleSave}
      />

      <RoomDeleteModal 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <RoomDetailsDrawer 
        isOpen={!!detailsRoom}
        onClose={() => setDetailsRoom(null)}
        room={detailsRoom}
        branchName={detailsRoom ? getBranchName(detailsRoom.branch_id) : ''}
      />
    </div>
  );
}
