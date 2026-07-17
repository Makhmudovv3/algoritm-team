import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../../services/api';
import BranchesHeader from './components/BranchesHeader';
import BranchesStats from './components/BranchesStats';
import BranchesGrid from './components/BranchesGrid';
import BranchFormModal from './components/BranchFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import BranchDetailsDrawer from './components/BranchDetailsDrawer';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const urlBranchId = searchParams.get('branchId');
  const [selectedBranch, setSelectedBranch] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', address: '' });

  useEffect(() => {
    if (branches.length > 0 && urlBranchId) {
      const branch = branches.find(b => b.id === urlBranchId);
      if (branch) setSelectedBranch(branch);
    } else if (!urlBranchId) {
      setSelectedBranch(null);
    }
  }, [urlBranchId, branches]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.Branches.getAll();
      setBranches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (branch = null) => {
    if (branch) {
      setEditingId(branch.id);
      setFormData({ name: branch.name, address: branch.address });
    } else {
      setEditingId(null);
      setFormData({ name: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.address) return;

    try {
      if (editingId) {
        const updated = await api.Branches.update(editingId, formData);
        setBranches(branches.map(b => b.id === editingId ? updated : b));
      } else {
        const created = await api.Branches.create(formData);
        setBranches([...branches, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Branches.delete(deleteConfirmId);
        setBranches(branches.filter(b => b.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <BranchesHeader onAdd={() => handleOpenModal()} />
      
      {!isLoading && <BranchesStats branches={branches} />}

      <BranchesGrid 
        branches={branches}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        onEdit={handleOpenModal}
        onDelete={(b) => setDeleteConfirmId(b.id)}
        onViewDetails={(b) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set('branchId', b.id);
          setSearchParams(newParams);
          setSelectedBranch(b);
        }}
      />

      <BranchFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        editingId={editingId}
      />

      <DeleteConfirmModal 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <BranchDetailsDrawer 
        isOpen={!!selectedBranch}
        onClose={() => {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('branchId');
          setSearchParams(newParams);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />
    </div>
  );
}
