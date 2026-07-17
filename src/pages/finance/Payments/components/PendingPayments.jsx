import React, { useState, useEffect } from 'react';
import { TableContainer, EmptyTableState, Toolbar, AvatarInitials } from '@/components/ui/page-header';
import { Clock, Calendar, MoreHorizontal, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/CustomSelect';
import { api } from '../../../../services/api';

export default function PendingPayments() {
  const [pending, setPending] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    sum: '',
    due_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pData, sData] = await Promise.all([
        api.PendingPayments.getAll(),
        api.Students.getAll()
      ]);
      setPending(pData);
      setStudents(sData);
    } finally {
      setIsLoading(false);
    }
  };

  const studentOptions = students.map(s => ({ label: s.fullname, value: s.id }));
  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || 'Noma\'lum';

  const handleOpenModal = () => {
    setFormData({
      student_id: studentOptions.length > 0 ? studentOptions[0].value : '',
      sum: '',
      due_date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.sum || !formData.due_date) return;
    try {
      const payload = { ...formData, sum: Number(formData.sum) };
      const created = await api.PendingPayments.create(payload);
      setPending([...pending, created]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.PendingPayments.delete(id);
      setPending(pending.filter(p => p.id !== id));
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <TableContainer>
      <Toolbar 
        left={<h2 className="text-[15px] font-semibold text-slate-900 px-2 py-1">Kutilayotgan to'lovlar (Qarzlar)</h2>}
        right={
          <Button size="sm" onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white">
            Qarz / To'lov qo'shish
          </Button>
        }
        className="px-3 pt-3 border-b border-slate-100"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">O'quvchi</TableHead>
            <TableHead>Qarzdorlik summasi</TableHead>
            <TableHead>Muddat</TableHead>
            <TableHead className="text-right">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
             <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-slate-500">Yuklanmoqda...</TableCell>
            </TableRow>
          ) : pending.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="p-0">
                <EmptyTableState 
                  icon={Clock}
                  title="Kutilayotgan to'lovlar yo'q" 
                  description="Barcha o'quvchilar to'lovlarni o'z vaqtida amalga oshirishgan." 
                />
              </TableCell>
            </TableRow>
          ) : (
            pending.map(p => (
              <TableRow key={p.id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={getStudentName(p.student_id)} size="sm" />
                    <span className="text-[13px] font-medium text-slate-900">{getStudentName(p.student_id)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] font-semibold text-slate-900 tabular-nums">
                  {new Intl.NumberFormat('uz-UZ').format(p.sum)}
                  <span className="text-[11px] font-normal text-slate-400 ml-1">UZS</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-amber-600">
                    <Calendar className="h-3.5 w-3.5" />
                    {p.due_date ? p.due_date.substring(0, 10) : '—'}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi qarzdorlik qo'shish">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">O'quvchi</label>
            <CustomSelect 
              options={studentOptions} 
              value={formData.student_id} 
              onChange={val => setFormData({...formData, student_id: val})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Summa (UZS)</label>
            <Input 
              required 
              type="number" 
              min="0" 
              value={formData.sum} 
              onChange={e => setFormData({...formData, sum: e.target.value})} 
              placeholder="Masalan: 300000" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Qaytarish / To'lash muddati</label>
            <Input 
              required 
              type="date" 
              value={formData.due_date} 
              onChange={e => setFormData({...formData, due_date: e.target.value})} 
            />
          </div>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="w-full">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </TableContainer>
  );
}
