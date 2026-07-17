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
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);
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

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lData, gData, sData, rData, cData, tData, uData] = await Promise.all([
        api.Lessons.getAll(),
        api.Groups.getAll(),
        api.Schedules.getAll(),
        api.Rooms.getAll(),
        api.Courses.getAll(),
        api.Teachers.getAll(),
        api.Users.getAll()
      ]);
      setLessons(lData);
      setGroups(gData);
      setSchedules(sData);
      setRooms(rData);
      setCourses(cData);
      setTeachers(tData);
      setUsers(uData);
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

  const getGroupName = (id) => groups.find(g => String(g.id) === String(id))?.name || '';

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

  const getLessonTime = (lesson) => {
    if (!lesson.date) return '14:00';
    const d = new Date(lesson.date);
    const jsDay = d.getDay() === 0 ? 7 : d.getDay();
    const groupSchedule = schedules?.find(s => String(s.group_id) === String(lesson.group_id) && String(s.day_of_week) === String(jsDay));
    return groupSchedule ? groupSchedule.start_time : '14:00';
  };

  const filteredLessons = lessons.filter(l => {
    // Hide lessons with missing groups
    const groupExists = groups.some(g => String(g.id) === String(l.group_id));
    if (!groupExists) return false;

    const matchSearch = (l.topic || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchGroup = groupFilter ? String(l.group_id) === String(groupFilter) : true;
    return matchSearch && matchGroup;
  }).sort((a, b) => {
    const dateA = a.date || '';
    const dateB = b.date || '';
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    
    return getLessonTime(a).localeCompare(getLessonTime(b));
  });

  const validSchedules = schedules.filter(s => groups.some(g => String(g.id) === String(s.group_id)));

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
              getLessonTime={getLessonTime}
            />
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <LessonsSchedule 
            schedules={validSchedules} 
            rooms={rooms} 
            groups={groups} 
            courses={courses} 
            teachers={teachers} 
            users={users} 
          />
        </TabsContent>

        <TabsContent value="calendar">
          <LessonsCalendar 
            lessons={filteredLessons} 
            schedules={validSchedules} 
            rooms={rooms}
            groups={groups}
            courses={courses}
            teachers={teachers}
            users={users}
            getGroupName={getGroupName} 
          />
        </TabsContent>

        <TabsContent value="homework" className="mt-6">
          <div className="space-y-4">
            <LessonsFilter 
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              groupFilter={groupFilter} setGroupFilter={setGroupFilter}
              groupOptions={groupOptions}
            />
            <LessonsHomework lessons={filteredLessons} getGroupName={getGroupName} getLessonTime={getLessonTime} />
          </div>
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
