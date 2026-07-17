import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, PhoneCall, Calendar } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import CustomSelect from '@/components/CustomSelect';
import { PageHeader, TableContainer, SearchBar, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';

export default function CallLogs() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    phone_number: '+998 ',
    call_date: '',
    call_status: 'success',
    comments: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lData, uData] = await Promise.all([
        api.CallLogs.getAll(),
        api.Users.getAll()
      ]);
      setLogs(lData);
      setUsers(uData);
    } finally {
      setIsLoading(false);
    }
  };

  const userOptions = users.map(u => ({ label: u.fullname || u.name || 'Unknown', value: u.id }));
  const statusOptions = [
    { label: 'Muvaffaqiyatli', value: 'success', colorClass: 'bg-emerald-500' },
    { label: 'Javobsiz', value: 'no_answer', colorClass: 'bg-amber-500' },
    { label: 'Qayta aloqa', value: 'call_back', colorClass: 'bg-blue-500' },
    { label: 'Xato raqam', value: 'wrong_number', colorClass: 'bg-red-500' }
  ];

  const getUserName = (id) => users.find(u => u.id === id)?.fullname || 'Unknown';

  const handleOpenModal = (log = null) => {
    if (log) {
      setEditingId(log.id);
      setFormData({
        user_id: log.user_id,
        phone_number: log.phone_number,
        call_date: log.call_date ? log.call_date.split('T')[0] : '',
        call_status: log.call_status || 'success',
        comments: log.comments || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        user_id: userOptions.length > 0 ? userOptions[0].value : '',
        phone_number: '+998 ',
        call_date: '',
        call_status: 'success',
        comments: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.user_id || !formData.phone_number || !formData.call_date) return;

    try {
      if (editingId) {
        const updated = await api.CallLogs.update(editingId, formData);
        setLogs(logs.map(l => l.id === editingId ? updated : l));
      } else {
        const created = await api.CallLogs.create(formData);
        setLogs([...logs, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.CallLogs.delete(deleteConfirmId);
        setLogs(logs.filter(l => l.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredLogs = logs.filter(l => 
    (l.phone_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.comments || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto pb-12 px-6">
      <PageHeader
        title="Qo'ng'iroqlar"
        description="Mijozlar bilan aloqa jurnali"
        actions={
          <Button onClick={() => handleOpenModal()} className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yangi qo'ng'iroq
          </Button>
        }
      />

      <TableContainer>
        <div className="p-3 border-b border-slate-100">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Raqam yoki izoh orqali qidiring..."
            className="w-full sm:max-w-md"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Xodim</TableHead>
                <TableHead>Telefon Raqam</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Izoh</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="p-0">
                    <EmptyTableState 
                      icon={PhoneCall}
                      title="Qo'ng'iroqlar topilmadi" 
                      description="Hozircha hech qanday qo'ng'iroq qayd etilmagan." 
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="pl-4 font-medium">
                      <div className="flex items-center gap-2.5">
                        <AvatarInitials name={getUserName(l.user_id)} size="sm" />
                        <span className="text-[13px] text-slate-900">{getUserName(l.user_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600  font-medium">
                      {l.phone_number}
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{l.call_date ? l.call_date.substring(0,10) : '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          l.call_status === 'success' ? 'success' : 
                          l.call_status === 'wrong_number' ? 'destructive' : 
                          l.call_status === 'no_answer' ? 'warning' : 'default'
                        }
                      >
                        {statusOptions.find(o => o.value === l.call_status)?.label || l.call_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm max-w-[200px] truncate">
                      {l.comments || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(l)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(l.id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Qo\'ng\'iroqni Tahrirlash' : "Yangi Qo'ng'iroq"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Xodim</label>
              <CustomSelect options={userOptions} value={formData.user_id} onChange={val => setFormData({...formData, user_id: val})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Qo'ng'iroq sanasi</label>
              <Input required type="date" value={formData.call_date} onChange={e => setFormData({...formData, call_date: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Telefon raqami</label>
            <Input 
              required 
              value={formData.phone_number} 
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d+]/g, '');
                if (!val.startsWith('+998')) val = '+998';
                
                let digits = val.replace(/\D/g, '').substring(3);
                let formatted = '+998';
                if (digits.length > 0) formatted += ' ' + digits.substring(0, 2);
                if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
                if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
                if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
                
                setFormData({ ...formData, phone_number: formatted });
              }} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Status</label>
            <CustomSelect options={statusOptions} value={formData.call_status} onChange={val => setFormData({...formData, call_status: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Izoh</label>
            <Input value={formData.comments} onChange={e => setFormData({...formData, comments: e.target.value})} placeholder="Qo'ng'iroq bo'yicha qisqacha ma'lumot..." />
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
