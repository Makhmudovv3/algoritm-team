import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import LessonsHeader from './components/LessonsHeader';
import LessonsFilter from './components/LessonsFilter';
import LessonsList from './components/LessonsList';
import LessonsSchedule from './components/LessonsSchedule';
import LessonsCalendar from './components/LessonsCalendar';
import LessonsHomework from './components/LessonsHomework';
import LessonsFormModal from './components/LessonsFormModal';
import LessonsDeleteModal from './components/LessonsDeleteModal';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    group_id: '',
    date: '',
    status: 'scheduled',
    topic: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lData, gData] = await Promise.all([
        api.Lessons.getAll(),
        api.Groups.getAll()
      ]);
      setLessons(lData);
      setGroups(gData);
    } finally {
      setIsLoading(false);
    }
  };

  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));
  const statusOptions = [
    { label: 'Rejalashtirilgan', value: 'scheduled' },
    { label: "O'tildi", value: 'completed' },
    { label: 'Bekor qilindi', value: 'cancelled' }
  ];

  const getGroupName = (id) => groups.find(g => g.id === id)?.name || 'Unknown';

  const handleOpenModal = (lesson = null) => {
    if (lesson) {
      setEditingId(lesson.id);
      setFormData({
        group_id: lesson.group_id,
        date: lesson.date ? lesson.date.split('T')[0] : '',
        status: lesson.status || 'scheduled',
        topic: lesson.topic || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        group_id: groupOptions.length > 0 ? groupOptions[0].value : '',
        date: '',
        status: 'scheduled',
        topic: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.group_id || !formData.date) return;
    try {
      if (editingId) {
        const updated = await api.Lessons.update(editingId, formData);
        setLessons(lessons.map(l => l.id === editingId ? updated : l));
      } else {
        const created = await api.Lessons.create(formData);
        setLessons([...lessons, created]);
      }
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Lessons.delete(deleteConfirmId);
        setLessons(lessons.filter(l => l.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredLessons = lessons.filter(l => {
    const matchSearch = (l.topic || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchGroup = groupFilter ? String(l.group_id) === String(groupFilter) : true;
    return matchSearch && matchGroup;
  });

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <LessonsHeader onNewLesson={() => handleOpenModal()} />

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Ro'yxat</TabsTrigger>
          <TabsTrigger value="schedule">Jadval</TabsTrigger>
          <TabsTrigger value="calendar">Taqvim</TabsTrigger>
          <TabsTrigger value="homework">Vazifalar</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            <LessonsFilter 
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              groupFilter={groupFilter} setGroupFilter={setGroupFilter}
              groupOptions={groupOptions}
            />
            <LessonsList 
              lessons={filteredLessons} 
              isLoading={isLoading} 
              onEdit={handleOpenModal} 
              onDelete={setDeleteConfirmId} 
              getGroupName={getGroupName} 
            />
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <LessonsSchedule lessons={filteredLessons} getGroupName={getGroupName} />
        </TabsContent>

        <TabsContent value="calendar">
          <LessonsCalendar lessons={filteredLessons} getGroupName={getGroupName} />
        </TabsContent>

        <TabsContent value="homework">
          <LessonsHomework lessons={filteredLessons} getGroupName={getGroupName} />
        </TabsContent>
      </Tabs>

      <LessonsFormModal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave}
        formData={formData} setFormData={setFormData}
        groupOptions={groupOptions} statusOptions={statusOptions} editingId={editingId}
      />

      <LessonsDeleteModal 
        isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
