import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Wallet, Building2, CreditCard, Landmark } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import CustomSelect from '@/components/CustomSelect';
import ConfirmModal from '@/components/ConfirmModal';

export default function FinanceAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    branch_id: '',
    type: 'cash'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aData, bData] = await Promise.all([
        api.FinanceAccounts.getAll(),
        api.Branches.getAll()
      ]);
      setAccounts(aData);
      setBranches(bData);
    } finally {
      setIsLoading(false);
    }
  };

  const branchOptions = branches.map(b => ({ label: b.name, value: b.id }));
  const typeOptions = [
    { label: 'Naqd pul (Kassa)', value: 'cash' },
    { label: 'Plastik Karta', value: 'card' },
    { label: 'Bank Hisob-Raqami', value: 'bank' }
  ];

  const getBranchName = (id) => branches.find(b => b.id === id)?.name || 'Unknown';

  const handleOpenModal = (account = null) => {
    if (account) {
      setEditingId(account.id);
      setFormData({
        name: account.name,
        branch_id: account.branch_id,
        type: account.type || 'cash'
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        branch_id: branchOptions.length > 0 ? branchOptions[0].value : '',
        type: 'cash'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.branch_id) return;

    try {
      if (editingId) {
        const updated = await api.FinanceAccounts.update(editingId, formData);
        setAccounts(accounts.map(a => a.id === editingId ? updated : a));
      } else {
        const created = await api.FinanceAccounts.create(formData);
        setAccounts([...accounts, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.FinanceAccounts.delete(deleteConfirmId);
        setAccounts(accounts.filter(a => a.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredAccounts = accounts.filter(a => {
    const matchSearch = (a.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchBranch = branchFilter ? String(a.branch_id) === String(branchFilter) : true;
    return matchSearch && matchBranch;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'card': return <CreditCard size={16} />;
      case 'bank': return <Landmark size={16} />;
      default: return <Wallet size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 ">Moliya Hisoblari</h1>
          <p className="text-sm text-slate-500 ">Filiallardagi kassa va bank hisob raqamlarini boshqarish</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={16} /> Yangi hisob
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:max-w-md">
              <Input 
                icon={Search} 
                placeholder="Hisob nomi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-64">
              <CustomSelect 
                options={[{label: "Barcha filiallar", value: ""}, ...branchOptions]} 
                value={branchFilter} 
                onChange={setBranchFilter} 
              />
            </div>
          </div>
        </CardHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hisob Nomi / Turi</TableHead>
                <TableHead>Filial</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600   flex items-center justify-center shrink-0">
                          {getTypeIcon(a.type)}
                        </div>
                        <div>
                          <div className="text-slate-900 ">{a.name}</div>
                          <div className="text-xs text-slate-500 capitalize">{a.type === 'cash' ? 'Naqd pul (Kassa)' : a.type === 'card' ? 'Plastik karta' : 'Bank'}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Building2 size={14} className="text-slate-400" />
                        <span>{getBranchName(a.branch_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(a)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(a.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Hisobni Tahrirlash' : "Yangi Hisob Qo'shish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Hisob nomi</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Masalan: Asosiy kassa" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Filial</label>
            <CustomSelect options={branchOptions} value={formData.branch_id} onChange={val => setFormData({...formData, branch_id: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Hisob turi</label>
            <CustomSelect options={typeOptions} value={formData.type} onChange={val => setFormData({...formData, type: val})} />
          </div>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="w-full">Saqlash</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteConfirmId} 
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
