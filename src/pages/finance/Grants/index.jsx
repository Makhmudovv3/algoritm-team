import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Award } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import ConfirmModal from '@/components/ConfirmModal';
import { PageHeader, TableContainer, SearchBar, EmptyTableState } from '@/components/ui/page-header';

export default function Grants() {
  const [grants, setGrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    percent: '',
    sum: '',
    comment: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.Grants.getAll();
      setGrants(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (grant = null) => {
    if (grant) {
      setEditingId(grant.id);
      setFormData({
        name: grant.name,
        percent: grant.percent || '',
        sum: grant.sum || '',
        comment: grant.comment || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        percent: '',
        sum: '',
        comment: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      const payload = {
        name: formData.name,
        percent: formData.percent ? Number(formData.percent) : null,
        sum: formData.sum ? Number(formData.sum) : null,
        comment: formData.comment
      };

      if (editingId) {
        const updated = await api.Grants.update(editingId, payload);
        setGrants(grants.map(g => g.id === editingId ? updated : g));
      } else {
        const created = await api.Grants.create(payload);
        setGrants([...grants, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Grants.delete(deleteConfirmId);
        setGrants(grants.filter(g => g.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredGrants = grants.filter(g => 
    (g.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto pb-12 px-6">
      <PageHeader
        title="Grantlar"
        description="Iqtidorli o'quvchilarga beriladigan maxsus grantlar"
        actions={
          <Button onClick={() => handleOpenModal()}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yangi grant
          </Button>
        }
      />

      <TableContainer>
        <div className="p-3 border-b border-slate-100">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Grant nomi orqali qidiring..."
            className="w-full sm:max-w-md"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Grant Nomi</TableHead>
                <TableHead>Miqdori</TableHead>
                <TableHead>Izoh</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="p-0">
                    <EmptyTableState 
                      icon={Award}
                      title="Grantlar topilmadi" 
                      description="Hozircha hech qanday grant kiritilmagan yoki qidiruv natijasi bo'sh." 
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredGrants.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600   flex items-center justify-center shrink-0">
                          <Award size={16} />
                        </div>
                        <span className="text-slate-900 ">{g.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-600 ">
                      {g.percent ? `${g.percent}%` : g.sum ? `${new Intl.NumberFormat('uz-UZ').format(g.sum)} UZS` : '-'}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                      {g.comment || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(g)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(g.id)}>
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
      </TableContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Grantni Tahrirlash' : "Yangi Grant Qo'shish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Grant nomi</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Masalan: 100% Grant" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Foizi (%)</label>
              <Input 
                type="number" 
                min="0" 
                max="100" 
                value={formData.percent} 
                onChange={e => setFormData({...formData, percent: e.target.value, sum: e.target.value ? '' : formData.sum})} 
                placeholder="100" 
                disabled={!!formData.sum}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Summasi (UZS)</label>
              <Input 
                type="number" 
                min="0" 
                value={formData.sum} 
                onChange={e => setFormData({...formData, sum: e.target.value, percent: e.target.value ? '' : formData.percent})} 
                placeholder="Masalan: 0" 
                disabled={!!formData.percent}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">Iltimos, foiz yoki summa kiriting (ikkalasini emas). Birini ishlatsangiz ikkinchisi o'chadi.</p>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Izoh</label>
            <Input value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} placeholder="Qisqacha ma'lumot..." />
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
