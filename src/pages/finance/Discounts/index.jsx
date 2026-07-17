import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Percent } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { PageHeader, TableContainer, SearchBar, EmptyTableState } from '@/components/ui/page-header';

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);
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
      const data = await api.Discounts.getAll();
      setDiscounts(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (discount = null) => {
    if (discount) {
      setEditingId(discount.id);
      setFormData({
        name: discount.name,
        percent: discount.percent || '',
        sum: discount.sum || '',
        comment: discount.comment || ''
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
        const updated = await api.Discounts.update(editingId, payload);
        setDiscounts(discounts.map(d => d.id === editingId ? updated : d));
      } else {
        const created = await api.Discounts.create(payload);
        setDiscounts([...discounts, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Discounts.delete(deleteConfirmId);
        setDiscounts(discounts.filter(d => d.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredDiscounts = discounts.filter(d => 
    (d.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto pb-12 px-6">
      <PageHeader
        title="Chegirmalar"
        description="O'quvchilarga taqdim etiladigan chegirmalar ro'yxati"
        actions={
          <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yangi chegirma
          </Button>
        }
      />

      <TableContainer>
        <div className="p-3 border-b border-slate-100">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Chegirma nomi orqali qidiring..."
            className="w-full sm:max-w-md"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Nomi</TableHead>
                <TableHead>Miqdori</TableHead>
                <TableHead>Izoh</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="p-0">
                    <EmptyTableState 
                      icon={Percent}
                      title="Chegirmalar topilmadi" 
                      description="Hozircha hech qanday chegirma turi kiritilmagan yoki qidiruv natijasi bo'sh." 
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredDiscounts.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600   flex items-center justify-center shrink-0">
                          <Percent size={16} />
                        </div>
                        <span className="text-slate-900 ">{d.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-600 ">
                      {d.percent ? `${d.percent}%` : d.sum ? `${new Intl.NumberFormat('uz-UZ').format(d.sum)} UZS` : '-'}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                      {d.comment || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(d)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(d.id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Chegirmani Tahrirlash' : "Yangi Chegirma Qo'shish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Chegirma nomi</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Masalan: Oila chegirmasi" />
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
                placeholder="10" 
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
                placeholder="50000" 
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

      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="O'chirishni tasdiqlaysizmi?">
        <div className="space-y-4">
          <p className="text-slate-600 ">Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="w-full" onClick={() => setDeleteConfirmId(null)}>Bekor qilish</Button>
            <Button variant="destructive" className="w-full" onClick={handleDeleteConfirm}>O'chirish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
