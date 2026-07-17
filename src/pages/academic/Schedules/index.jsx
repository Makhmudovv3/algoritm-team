import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, Layers } from 'lucide-react';
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import CustomSelect from '@/components/CustomSelect';

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [groupFilter, setGroupFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    group_id: '',
    room_id: '',
    day_of_week: '1',
    start_time: '',
    end_time: ''
  });

  const dayNames = {
    1: 'Dushanba',
    2: 'Seshanba',
    3: 'Chorshanba',
    4: 'Payshanba',
    5: 'Juma',
    6: 'Shanba',
    7: 'Yakshanba'
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sData, gData, rData] = await Promise.all([
        api.Schedules.getAll(),
        api.Groups.getAll(),
        api.Rooms.getAll()
      ]);
      setSchedules(sData);
      setGroups(gData);
      setRooms(rData);
    } finally {
      setIsLoading(false);
    }
  };

  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));
  const roomOptions = rooms.map(r => ({ label: r.name, value: r.id }));
  const dayOptions = Object.keys(dayNames).map(key => ({ label: dayNames[key], value: key }));

  const getGroupName = (id) => groups.find(g => g.id === id)?.name || 'Unknown';
  const getRoomName = (id) => rooms.find(r => r.id === id)?.name || 'Unknown';

  const handleOpenModal = (s = null) => {
    if (s) {
      setEditingId(s.id);
      setFormData({
        group_id: s.group_id,
        room_id: s.room_id,
        day_of_week: String(s.day_of_week),
        start_time: s.start_time,
        end_time: s.end_time
      });
    } else {
      setEditingId(null);
      setFormData({
        group_id: groupOptions.length > 0 ? groupOptions[0].value : '',
        room_id: roomOptions.length > 0 ? roomOptions[0].value : '',
        day_of_week: '1',
        start_time: '',
        end_time: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.group_id || !formData.room_id || !formData.start_time || !formData.end_time) return;

    try {
      const payload = {
        group_id: formData.group_id,
        room_id: formData.room_id,
        day_of_week: Number(formData.day_of_week),
        start_time: formData.start_time,
        end_time: formData.end_time
      };

      if (editingId) {
        const updated = await api.Schedules.update(editingId, payload);
        setSchedules(schedules.map(s => s.id === editingId ? updated : s));
      } else {
        const created = await api.Schedules.create(payload);
        setSchedules([...schedules, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Schedules.delete(deleteConfirmId);
        setSchedules(schedules.filter(s => s.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredSchedules = schedules.filter(s => {
    const matchGroup = groupFilter ? String(s.group_id) === String(groupFilter) : true;
    const matchDay = dayFilter ? String(s.day_of_week) === String(dayFilter) : true;
    return matchGroup && matchDay;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 ">Dars Jadvali</h1>
          <p className="text-sm text-slate-500 ">Haftalik dars jadvallarini rejalashtirish va boshqarish</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={16} /> Yangi jadval
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:w-64">
              <CustomSelect 
                options={[{label: "Barcha guruhlar", value: ""}, ...groupOptions]} 
                value={groupFilter} 
                onChange={setGroupFilter} 
              />
            </div>
            <div className="w-full sm:w-64">
              <CustomSelect 
                options={[{label: "Barcha kunlar", value: ""}, ...dayOptions]} 
                value={dayFilter} 
                onChange={setDayFilter} 
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
                <TableHead>Guruh</TableHead>
                <TableHead>Hafta Kuni</TableHead>
                <TableHead>Vaqt</TableHead>
                <TableHead>Xona</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredSchedules.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600   flex items-center justify-center shrink-0">
                          <Layers size={16} />
                        </div>
                        <span className="text-slate-900 ">{getGroupName(s.group_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="font-medium">{dayNames[s.day_of_week] || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 ">
                        <Clock size={14} />
                        {s.start_time.substring(0,5)} - {s.end_time.substring(0,5)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 ">
                        <MapPin size={14} className="text-slate-400" />
                        <span>{getRoomName(s.room_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(s)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(s.id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Jadvalni Tahrirlash' : "Yangi Jadval Qo'shish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Guruh</label>
            <CustomSelect options={groupOptions} value={formData.group_id} onChange={val => setFormData({...formData, group_id: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Hafta Kuni</label>
            <CustomSelect options={dayOptions} value={formData.day_of_week} onChange={val => setFormData({...formData, day_of_week: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Xona</label>
            <CustomSelect options={roomOptions} value={formData.room_id} onChange={val => setFormData({...formData, room_id: val})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Boshlanish vaqti</label>
              <Input required type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Tugash vaqti</label>
              <Input required type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} />
            </div>
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
