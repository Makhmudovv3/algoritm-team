import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, BookOpen } from "lucide-react";
import { api } from '../../../services/api';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', duration_month: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.Courses.getAll();
      setCourses(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingId(course.id);
      setFormData({ name: course.name, duration_month: course.duration_month });
    } else {
      setEditingId(null);
      setFormData({ name: '', duration_month: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.duration_month) return;

    try {
      if (editingId) {
        const updated = await api.Courses.update(editingId, { name: formData.name, duration_month: Number(formData.duration_month) });
        setCourses(courses.map(c => c.id === editingId ? updated : c));
      } else {
        const created = await api.Courses.create({ name: formData.name, duration_month: Number(formData.duration_month) });
        setCourses([...courses, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Courses.delete(deleteConfirmId);
        setCourses(courses.filter(c => c.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredCourses = courses.filter(course => 
    (course.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 ">Kurslar</h1>
          <p className="text-sm text-slate-500 ">O'quv markazidagi mavjud kurs yo'nalishlarini boshqarish</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={16} /> Yangi kurs
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <div className="w-full sm:max-w-md">
            <Input 
              icon={Search} 
              placeholder="Kurs nomi orqali qidiring..." 
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
                <TableHead>Kurs Nomi</TableHead>
                <TableHead>Davomiyligi (Oy)</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600   flex items-center justify-center">
                          <BookOpen size={16} />
                        </div>
                        <span className="text-slate-900 ">{course.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 ">
                      {course.duration_month} oy
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(course)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 " onClick={() => setDeleteConfirmId(course.id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Kursni Tahrirlash' : "Yangi Kurs Qo'shish"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Kurs nomi</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Masalan: Frontend React" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Davomiyligi (Oylarda)</label>
            <Input required type="number" min="1" value={formData.duration_month} onChange={e => setFormData({...formData, duration_month: e.target.value})} placeholder="Masalan: 6" />
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
