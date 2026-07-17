import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { api } from '../../../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { PageHeader, TableContainer, SearchBar, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Select } from '@/components/ui/select';

export default function Ratings() {
  const [ratings, setRatings] = useState([]);
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
    score: '',
    comment: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rData, sData, gData] = await Promise.all([
        api.Ratings.getAll(),
        api.Students.getAll(),
        api.Groups.getAll()
      ]);
      setRatings(rData);
      setStudents(sData);
      setGroups(gData);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || "Noma'lum";
  const getGroupName = (id) => groups.find(g => g.id === id)?.name || "Noma'lum";

  const studentOptions = [{ label: "O'quvchini tanlang", value: "" }, ...students.map(s => ({ label: s.fullname, value: s.id }))];
  const groupOptions = [{ label: "Barcha guruhlar", value: "" }, ...groups.map(g => ({ label: g.name, value: g.id }))];

  const handleOpenModal = (rating = null) => {
    if (rating) {
      setEditingId(rating.id);
      setFormData({
        student_id: rating.student_id,
        group_id: rating.group_id,
        score: rating.score,
        comment: rating.comment || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        student_id: '',
        group_id: '',
        score: '',
        comment: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.group_id || !formData.score) return;

    try {
      const payload = {
        ...formData,
        score: Number(formData.score)
      };

      if (editingId) {
        const updated = await api.Ratings.update(editingId, payload);
        setRatings(ratings.map(r => r.id === editingId ? updated : r));
      } else {
        const created = await api.Ratings.create(payload);
        setRatings([...ratings, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Ratings.delete(deleteConfirmId);
        setRatings(ratings.filter(r => r.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredRatings = ratings.filter(r => {
    const sName = (getStudentName(r.student_id) || '').toLowerCase();
    const matchSearch = sName.includes(searchQuery.toLowerCase());
    const matchGroup = groupFilter ? String(r.group_id) === String(groupFilter) : true;
    return matchSearch && matchGroup;
  });

  const renderStars = (score) => {
    return (
      <div className="flex gap-1">
        {[1,2,3,4,5].map(star => (
          <Star 
            key={star} 
            size={14} 
            className={star <= score ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300 space-y-6">
      <PageHeader 
        title="Reyting" 
        description="O'quvchilarning baholari va o'zlashtirish ko'rsatkichlari"
        actions={
          <Button onClick={() => handleOpenModal()} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Plus size={16} /> Yangi baho
          </Button>
        }
      />

      <TableContainer>
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-3 relative z-40">
          <div className="w-full sm:w-64">
            <SearchBar 
              placeholder="O'quvchi ismi bo'yicha qidiring..." 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select 
              options={groupOptions} 
              value={groupFilter} 
              onChange={setGroupFilter} 
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-4 rounded bg-slate-100 animate-pulse w-48" />
                <div className="h-4 rounded bg-slate-100 animate-pulse w-24" />
                <div className="h-4 rounded bg-slate-100 animate-pulse w-32" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">O'quvchi</TableHead>
                <TableHead>Guruh</TableHead>
                <TableHead>Baho</TableHead>
                <TableHead>Izoh</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRatings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="p-0">
                    <EmptyTableState title="Ma'lumot topilmadi" description="Qidiruv natijasi yoki guruh bo'yicha hech qanday baho topilmadi." icon={Star} />
                  </TableCell>
                </TableRow>
              ) : (
                filteredRatings.map((r) => (
                  <TableRow key={r.id} className="group hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <AvatarInitials name={getStudentName(r.student_id)} size="sm" />
                        <span className="text-[13px] font-medium text-slate-900">{getStudentName(r.student_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-600 font-medium">
                      {getGroupName(r.group_id)}
                    </TableCell>
                    <TableCell>
                      {renderStars(r.score)}
                    </TableCell>
                    <TableCell className="text-slate-500 text-[13px] max-w-[200px] truncate">
                      {r.comment || '—'}
                    </TableCell>
                    <TableCell className="pr-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-slate-700" onClick={() => handleOpenModal(r)}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteConfirmId(r.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Bahoni Tahrirlash' : "Yangi Baho Qo'shish"} maxWidth="max-w-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">O'quvchi <span className="text-red-500">*</span></label>
              <div className="relative z-50">
                <Select 
                  options={studentOptions} 
                  value={formData.student_id} 
                  onChange={val => setFormData({...formData, student_id: val})} 
                  placeholder="O'quvchini tanlang..."
                  searchable
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guruh <span className="text-red-500">*</span></label>
              <div className="relative z-40">
                <Select 
                  options={groups.map(g => ({ label: g.name, value: g.id }))} 
                  value={formData.group_id} 
                  onChange={val => setFormData({...formData, group_id: val})} 
                  placeholder="Guruhni tanlang..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Baho (1 dan 5 gacha) <span className="text-red-500">*</span></label>
              <Input required type="number" min="1" max="5" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} placeholder="5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Izoh</label>
              <Input value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} placeholder="Qo'shimcha izoh (ixtiyoriy)..." />
            </div>
          </div>
          <div className="pt-5 border-t border-slate-100 flex gap-3 justify-end">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit">Saqlash</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="O'chirishni tasdiqlaysizmi?" maxWidth="max-w-md">
        <div className="space-y-6">
          <p className="text-sm text-slate-600">Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setDeleteConfirmId(null)}>Bekor qilish</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>O'chirish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
