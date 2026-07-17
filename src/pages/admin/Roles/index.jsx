import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ShieldCheck, Search } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { PageHeader } from '@/components/ui/page-header';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', level: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.Roles.getAll();
      setRoles(data);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRoles = roles.filter(r => 
    (r.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (role = null) => {
    if (role) {
      setEditingId(role.id);
      setFormData({ name: role.name, level: role.level });
    } else {
      setEditingId(null);
      setFormData({ name: '', level: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.level) return;

    try {
      if (editingId) {
        const updated = await api.Roles.update(editingId, { name: formData.name, level: Number(formData.level) });
        setRoles(roles.map(r => r.id === editingId ? updated : r));
      } else {
        const created = await api.Roles.create({ name: formData.name, level: Number(formData.level) });
        setRoles([...roles, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Roles.delete(deleteConfirmId);
        setRoles(roles.filter(r => r.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-8">
      <PageHeader
        title="Rollar"
        description="Tizim rollari va ruxsatlarini boshqarish"
        actions={
          <Button size="sm" onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            Yangi rol
          </Button>
        }
      />

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden rounded-lg">
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rollarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full pl-8 pr-3 text-[13px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Rol nomi</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Daraja</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 text-right w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-[13px] text-slate-500">
                      Rollar topilmadi
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id} className="group hover:bg-slate-50/50 border-b border-slate-100 last:border-0 transition-colors">
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                            <ShieldCheck size={12} />
                          </div>
                          <span className="text-[13px] font-medium text-slate-900">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-[13px] text-slate-600">
                        {role.level}
                      </TableCell>
                      <TableCell className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" onClick={() => handleOpenModal(role)}>
                            <Edit2 size={12} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" onClick={() => setDeleteConfirmId(role.id)}>
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Rolni tahrirlash' : "Yangi rol"}>
        <form onSubmit={handleSave} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-700">Rol nomi</label>
            <Input 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              placeholder="masalan: Administrator"
              className="h-8 text-[13px] border-slate-200 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-700">Daraja</label>
            <Input 
              required 
              type="number" 
              min="1" 
              value={formData.level} 
              onChange={e => setFormData({...formData, level: e.target.value})} 
              placeholder="1"
              className="h-8 text-[13px] border-slate-200 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
            <Button type="button" variant="outline" className="h-8 text-[13px] px-3 border-slate-200" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="h-8 text-[13px] px-3 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Rolni saqlash</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="Rolni o'chirish">
        <div className="pt-4">
          <p className="text-[13px] text-slate-600 mb-6">Rostdan ham bu rolni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Button variant="outline" className="h-8 text-[13px] px-3 border-slate-200" onClick={() => setDeleteConfirmId(null)}>Bekor qilish</Button>
            <Button variant="destructive" className="h-8 text-[13px] px-3 bg-red-600 hover:bg-red-700 text-white shadow-sm" onClick={handleDeleteConfirm}>O'chirish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
