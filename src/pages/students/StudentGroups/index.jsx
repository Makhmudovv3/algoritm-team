import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Link } from 'lucide-react';
import { api } from '../../../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import CustomSelect from '@/components/CustomSelect';
import CustomDatePicker from '@/components/ui/date-picker';
import ConfirmModal from '@/components/ConfirmModal';
import { PageHeader, TableContainer, SearchBar, EmptyTableState } from '@/components/ui/page-header';

export default function StudentGroups() {
  const [studentGroups, setStudentGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    student_id: '',
    group_id: '',
    joined_date: '',
    status: 'active'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sgData, sData, gData] = await Promise.all([
        api.StudentGroups.getAll(),
        api.Students.getAll(),
        api.Groups.getAll()
      ]);
      setStudentGroups(sgData);
      setStudents(sData);
      setGroups(gData);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || 'Unknown';
  const getGroupName = (id) => groups.find(g => g.id === id)?.name || 'Unknown';

  const studentOptions = students.map(s => ({ label: s.fullname, value: s.id }));
  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));
  const statusOptions = [
    { label: 'Faol', value: 'active', colorClass: 'bg-emerald-500' },
    { label: 'Ketgan', value: 'left', colorClass: 'bg-red-500' },
    { label: 'Muzlatilgan', value: 'frozen', colorClass: 'bg-blue-500' }
  ];

  const handleOpenModal = (sg = null) => {
    if (sg) {
      setEditingId(sg.id);
      setFormData({
        student_id: sg.student_id,
        group_id: sg.group_id,
        joined_date: sg.joined_date ? sg.joined_date.split('T')[0] : '',
        status: sg.status || 'active'
      });
    } else {
      setEditingId(null);
      setFormData({
        student_id: studentOptions.length > 0 ? studentOptions[0].value : '',
        group_id: groupOptions.length > 0 ? groupOptions[0].value : '',
        joined_date: '',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.group_id || !formData.joined_date) return;

    try {
      if (editingId) {
        const updated = await api.StudentGroups.update(editingId, formData);
        setStudentGroups(studentGroups.map(sg => sg.id === editingId ? updated : sg));
      } else {
        const created = await api.StudentGroups.create(formData);
        setStudentGroups([...studentGroups, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.StudentGroups.delete(deleteConfirmId);
        setStudentGroups(studentGroups.filter(sg => sg.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredStudentGroups = studentGroups.filter(sg => {
    const sName = (getStudentName(sg.student_id) || '').toLowerCase();
    const matchSearch = sName.includes(searchQuery.toLowerCase());
    const matchGroup = groupFilter ? String(sg.group_id) === String(groupFilter) : true;
    return matchSearch && matchGroup;
  });

  return (
    <div className="max-w-[1600px] mx-auto pb-12 px-6">
      <PageHeader
        title="O'quvchi va Guruh"
        description="O'quvchilarni guruhlarga biriktirish"
        actions={
          <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Guruhga qo'shish
          </Button>
        }
      />

      <TableContainer>
        <div className="p-3 border-b border-slate-100 flex flex-col sm:flex-row gap-4 w-full items-center">
          <div className="w-full sm:max-w-md">
            <SearchBar 
              placeholder="O'quvchi ismi bo'yicha qidiring..." 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="w-full sm:w-64">
            <CustomSelect 
              options={[{label: "Barcha guruhlar", value: ""}, ...groupOptions]} 
              value={groupFilter} 
              onChange={setGroupFilter} 
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">O'quvchi / Guruh</TableHead>
                <TableHead>Qo'shilgan Sana</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-4">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudentGroups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="p-0">
                    <EmptyTableState 
                      icon={Link}
                      title="Ma'lumot topilmadi" 
                      description="Hozircha hech qanday o'quvchi guruhga biriktirilmagan yoki qidiruv natijasi bo'sh." 
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudentGroups.map((sg) => (
                  <TableRow key={sg.id}>
                    <TableCell className="font-medium pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <Link size={16} />
                        </div>
                        <div>
                          <div className="text-slate-900 font-semibold">{getStudentName(sg.student_id)}</div>
                          <div className="text-xs text-slate-500">{getGroupName(sg.group_id)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {sg.joined_date ? new Date(sg.joined_date).toLocaleDateString('uz-UZ') : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={sg.status === 'active' ? 'success' : sg.status === 'left' ? 'destructive' : 'secondary'}
                      >
                        {statusOptions.find(o => o.value === sg.status)?.label || sg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(sg)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(sg.id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Ma\'lumotni Tahrirlash' : "O'quvchini Guruhga Biriktirish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">O'quvchi</label>
            <CustomSelect options={studentOptions} value={formData.student_id} onChange={val => setFormData({...formData, student_id: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Guruh</label>
            <CustomSelect options={groupOptions} value={formData.group_id} onChange={val => setFormData({...formData, group_id: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Qo'shilgan sana</label>
            <CustomDatePicker required value={formData.joined_date} onChange={e => setFormData({...formData, joined_date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Status</label>
            <CustomSelect options={statusOptions} value={formData.status} onChange={val => setFormData({...formData, status: val})} />
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
