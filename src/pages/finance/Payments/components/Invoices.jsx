import React, { useState, useEffect } from 'react';
import { TableContainer, EmptyTableState, Toolbar, AvatarInitials } from '@/components/ui/page-header';
import { FileText, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/CustomSelect';
import { api } from '../../../../services/api';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    sum: '',
    status: 'paid'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [iData, sData] = await Promise.all([
        api.Invoices.getAll(),
        api.Students.getAll()
      ]);
      setInvoices(iData);
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
      status: 'paid'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.sum) return;
    
    try {
      const payload = { 
        ...formData, 
        sum: Number(formData.sum),
        invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}` // Autogenerate
      };
      const created = await api.Invoices.create(payload);
      setInvoices([...invoices, created]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.Invoices.delete(id);
      setInvoices(invoices.filter(i => i.id !== id));
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <TableContainer>
      <Toolbar 
        left={<h2 className="text-[15px] font-semibold text-slate-900 px-2 py-1">Invoyslar (To'lov varaqalari)</h2>}
        right={<Button size="sm" onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white">Yangi invoys yaratish</Button>}
        className="px-3 pt-3 border-b border-slate-100"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Invoys raqami</TableHead>
            <TableHead>Mijoz / O'quvchi</TableHead>
            <TableHead>Summa</TableHead>
            <TableHead>Holati</TableHead>
            <TableHead className="text-right">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-slate-500">Yuklanmoqda...</TableCell>
            </TableRow>
          ) : invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="p-0">
                <EmptyTableState 
                  icon={FileText}
                  title="Invoyslar topilmadi" 
                  description="Hozircha hech qanday invoys (to'lov varaqasi) yaratilmagan." 
                />
              </TableCell>
            </TableRow>
          ) : (
            invoices.map(i => (
              <TableRow key={i.id}>
                <TableCell className="pl-4 text-[13px] font-medium text-slate-900">
                  #{i.invoice_number}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={getStudentName(i.student_id)} size="sm" />
                    <span className="text-[13px] text-slate-700">{getStudentName(i.student_id)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] font-semibold text-slate-900 tabular-nums">
                  {new Intl.NumberFormat('uz-UZ').format(i.sum)}
                  <span className="text-[11px] font-normal text-slate-400 ml-1">UZS</span>
                </TableCell>
                <TableCell>
                  <Badge variant={i.status === 'paid' ? 'success' : 'warning'}>
                    {i.status === 'paid' ? "To'langan" : 'Kutilmoqda'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(i.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi invoys yaratish">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mijoz / O'quvchi</label>
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
              placeholder="Masalan: 450000" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Invoys holati</label>
            <CustomSelect 
              options={[
                {label: 'To\'langan', value: 'paid'},
                {label: 'Kutilmoqda', value: 'pending'}
              ]} 
              value={formData.status} 
              onChange={val => setFormData({...formData, status: val})} 
            />
          </div>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="w-full">Yaratish</Button>
          </div>
        </form>
      </Modal>
    </TableContainer>
  );
}
