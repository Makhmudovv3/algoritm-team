import React, { useState, useEffect } from 'react';
import { Plus, Search, ArrowRightLeft } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import CustomSelect from '@/components/CustomSelect';
import AlertModal from '@/components/AlertModal';

export default function StudentTransfer() {
  const [transfers, setTransfers] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    from_group_id: '',
    to_group_id: '',
    transfer_date: '',
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trData, stData, grData] = await Promise.all([
        api.StudentTransfers.getAll(),
        api.Students.getAll(),
        api.Groups.getAll()
      ]);
      setTransfers(trData);
      setStudents(stData);
      setGroups(grData);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || 'Unknown';
  const getGroupName = (id) => groups.find(g => g.id === id)?.name || 'Unknown';

  const studentOptions = students.map(s => ({ label: s.fullname, value: s.id }));
  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));

  const handleOpenModal = () => {
    setFormData({
      student_id: studentOptions.length > 0 ? studentOptions[0].value : '',
      from_group_id: groupOptions.length > 0 ? groupOptions[0].value : '',
      to_group_id: groupOptions.length > 1 ? groupOptions[1].value : (groupOptions.length > 0 ? groupOptions[0].value : ''),
      transfer_date: '',
      reason: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.from_group_id || !formData.to_group_id || !formData.transfer_date) return;
    if (formData.from_group_id === formData.to_group_id) {
      setAlertMessage("Yangi guruh eskisidan farq qilishi kerak.");
      return;
    }

    try {
      // 1. Create transfer history record
      const created = await api.StudentTransfers.create(formData);
      
      // 2. Update actual group membership
      const studentGroups = await api.StudentGroups.getAll();
      const existingRecord = studentGroups.find(sg => 
        sg.student_id === formData.student_id && 
        sg.group_id === formData.from_group_id && 
        sg.status === 'Active'
      );
      
      if (existingRecord) {
        await api.StudentGroups.update(existingRecord.id, { 
          status: 'Left', 
          left_at: formData.transfer_date 
        });
      }
      
      await api.StudentGroups.create({
        student_id: formData.student_id,
        group_id: formData.to_group_id,
        joined_at: formData.transfer_date,
        left_at: null,
        status: 'Active'
      });

      setTransfers([...transfers, created]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const filteredTransfers = transfers.filter(tr => {
    const sName = (getStudentName(tr.student_id) || '').toLowerCase();
    return sName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 ">O'quvchi Ko'chirish</h1>
          <p className="text-sm text-slate-500 ">O'quvchilarni bir guruhdan boshqa guruhga o'tkazish tarixi</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={16} /> Yangi ko'chirish
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <div className="w-full sm:max-w-md">
            <Input 
              icon={Search} 
              placeholder="O'quvchi ismi bo'yicha qidiring..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                <TableHead>O'quvchi</TableHead>
                <TableHead>Eski Guruh</TableHead>
                <TableHead>Yangi Guruh</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Sabab</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransfers.map((tr) => (
                  <TableRow key={tr.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600   flex items-center justify-center shrink-0">
                          <ArrowRightLeft size={16} />
                        </div>
                        <span className="text-slate-900 ">{getStudentName(tr.student_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      <span className="line-through text-slate-400  mr-2">{getGroupName(tr.from_group_id)}</span>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600 ">
                      {getGroupName(tr.to_group_id)}
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      {tr.transfer_date ? tr.transfer_date.substring(0,10) : '-'}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {tr.reason || '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="O'quvchini Boshqa Guruhga O'tkazish">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">O'quvchi</label>
            <CustomSelect options={studentOptions} value={formData.student_id} onChange={val => setFormData({...formData, student_id: val})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Qaysi guruhdan</label>
              <CustomSelect options={groupOptions} value={formData.from_group_id} onChange={val => setFormData({...formData, from_group_id: val})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Qaysi guruhga</label>
              <CustomSelect options={groupOptions} value={formData.to_group_id} onChange={val => setFormData({...formData, to_group_id: val})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">O'tkazish sanasi</label>
            <Input required type="date" value={formData.transfer_date} onChange={e => setFormData({...formData, transfer_date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Sabab (ixtiyoriy)</label>
            <Input value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="Masalan: Vaqti to'g'ri kelmadi" />
          </div>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="w-full">Saqlash</Button>
          </div>
        </form>
      </Modal>

      <AlertModal 
        isOpen={!!alertMessage} 
        onClose={() => setAlertMessage('')} 
        message={alertMessage} 
      />
    </div>
  );
}
