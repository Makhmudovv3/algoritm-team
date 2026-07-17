import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { GroupsHeader } from './components/GroupsHeader';
import { GroupsStats } from './components/GroupsStats';
import { GroupsToolbar } from './components/GroupsToolbar';
import { GroupsFilters } from './components/GroupsFilters';
import { GroupsGrid } from './components/GroupsGrid';
import { GroupsTable } from './components/GroupsTable';
import { GroupProfileDrawer } from './components/GroupProfileDrawer';
import { GroupFormModal } from './components/GroupFormModal';
import { GroupEmptyState } from './components/GroupEmptyState';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [viewMode, setViewMode] = useState('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingGroup, setViewingGroup] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = { name: '', course_id: '', teacher_id: '', room_id: '', start_date: '', end_date: '', price: '', is_active: 'true', days: '1-3-5' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gData, cData, tData, rData, uData] = await Promise.all([
        api.Groups.getAll(), api.Courses.getAll(), api.Teachers.getAll(), api.Rooms.getAll(), api.Users.getAll()
      ]);
      setGroups(gData); setCourses(cData); setTeachers(tData); setRooms(rData); setUsers(uData);
    } finally {
      setIsLoading(false);
    }
  };

  const getTeacherName = (tId) => {
    const teacher = teachers.find(t => t.id === tId);
    return teacher ? (users.find(u => u.id === teacher.user_id)?.fullname || 'Noma\'lum') : 'Noma\'lum';
  };
  const getCourseName = (cId) => courses.find(c => c.id === cId)?.name || 'Noma\'lum';
  const getRoomName = (rId) => rooms.find(r => r.id === rId)?.name || 'Noma\'lum';

  const courseOptions = courses.map(c => ({ label: c.name, value: c.id }));
  const teacherOptions = teachers.map(t => ({ label: getTeacherName(t.id), value: t.id }));
  const roomOptions = rooms.map(r => ({ label: r.name, value: r.id }));

  const filteredGroups = groups.filter(g => {
    const matchSearch = (g.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchCourse = courseFilter ? String(g.course_id) === String(courseFilter) : true;
    const matchTeacher = teacherFilter ? String(g.teacher_id) === String(teacherFilter) : true;
    const matchStatus = statusFilter ? String(g.is_active) === statusFilter : true;
    return matchSearch && matchCourse && matchTeacher && matchStatus;
  });

  const handleOpenForm = (group = null) => {
    if (group) {
      setEditingId(group.id);
      setFormData({
        name: group.name, course_id: group.course_id, teacher_id: group.teacher_id, room_id: group.room_id,
        start_date: group.start_date ? group.start_date.split('T')[0] : '',
        end_date: group.end_date ? group.end_date.split('T')[0] : '',
        price: group.price, is_active: String(group.is_active)
      });
    } else {
      setEditingId(null);
      setFormData({ ...initialForm, course_id: courseOptions[0]?.value || '', teacher_id: teacherOptions[0]?.value || '', room_id: roomOptions[0]?.value || '' });
    }
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price: Number(formData.price), is_active: formData.is_active === 'true' };
      if (editingId) {
        const updated = await api.Groups.update(editingId, payload);
        setGroups(groups.map(g => g.id === editingId ? updated : g));
        if (viewingGroup?.id === editingId) setViewingGroup(updated);
      } else {
        const created = await api.Groups.create(payload);
        setGroups([...groups, created]);

        // Auto-generate schedules
        const daysMapping = { '1-3-5': [1, 3, 5], '2-4-6': [2, 4, 6], 'everyday': [1, 2, 3, 4, 5, 6] };
        const selectedDays = daysMapping[formData.days] || [1, 3, 5];
        
        for (const d of selectedDays) {
          await api.Schedules.create({
            group_id: created.id,
            room_id: created.room_id,
            day_of_week: d,
            start_time: '14:00',
            end_time: '16:00'
          });
        }

        // Auto-generate lessons for the first month (12 lessons max)
        const startDate = formData.start_date ? new Date(formData.start_date) : new Date();
        const dates = [];
        let curDate = new Date(startDate);
        while (dates.length < 12) {
          const jsDay = curDate.getDay() === 0 ? 7 : curDate.getDay();
          if (selectedDays.includes(jsDay)) {
            dates.push(new Date(curDate));
          }
          curDate.setDate(curDate.getDate() + 1);
        }

        for (let i = 0; i < dates.length; i++) {
          await api.Lessons.create({
            group_id: created.id,
            date: dates[i].toISOString().split('T')[0],
            status: 'scheduled',
            topic: `${i + 1}-dars`
          });
        }
      }
      setIsFormOpen(false);
    } catch(err) { console.error(err); }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Groups.delete(deleteConfirmId);
        setGroups(groups.filter(g => g.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) { console.error(err); }
    }
  };

  const handleClearFilters = () => { setSearchQuery(''); setCourseFilter(''); setTeacherFilter(''); setStatusFilter(''); };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Guruhlar');

    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Guruh nomi', key: 'name', width: 20 },
      { header: 'Kurs', key: 'course', width: 25 },
      { header: 'O\'qituvchi', key: 'teacher', width: 25 },
      { header: 'Xona', key: 'room', width: 15 },
      { header: 'Oylik narx (UZS)', key: 'price', width: 20 },
      { header: 'Holat', key: 'status', width: 15 },
    ];

    filteredGroups.forEach((g, index) => {
      worksheet.addRow({
        no: index + 1,
        name: g.name || '-',
        course: getCourseName(g.course_id) || '-',
        teacher: getTeacherName(g.teacher_id) || '-',
        room: getRoomName(g.room_id) || '-',
        price: Number(g.price || 0),
        status: g.is_active ? 'Faol' : 'Nofaol'
      });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } }; // Blue-600
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
      };
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.eachCell((cell, colNumber) => {
        cell.alignment = { vertical: 'middle', horizontal: colNumber === 6 ? 'right' : 'left' };
        if (colNumber === 1 || colNumber === 7) cell.alignment.horizontal = 'center';
        cell.border = {
          top: {style:'thin', color:{argb:'FFEEEEEE'}}, 
          left: {style:'thin', color:{argb:'FFEEEEEE'}}, 
          bottom: {style:'thin', color:{argb:'FFEEEEEE'}}, 
          right: {style:'thin', color:{argb:'FFEEEEEE'}}
        };
        // Price format
        if (colNumber === 6) cell.numFmt = '#,##0';
        
        // Status color
        if (colNumber === 7) {
          cell.font = { color: { argb: cell.value === 'Faol' ? 'FF16A34A' : 'FFDC2626' }, bold: true };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Guruhlar_Hisoboti.xlsx');
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <GroupsHeader onAddGroup={() => handleOpenForm()} onExport={handleExport} />
      <GroupsStats groups={groups} />
      
      <GroupsToolbar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        viewMode={viewMode} setViewMode={setViewMode}
        isFiltersOpen={isFiltersOpen} onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
      />
      
      <GroupsFilters 
        isOpen={isFiltersOpen} courseOptions={courseOptions} teacherOptions={teacherOptions} roomOptions={roomOptions}
        courseFilter={courseFilter} setCourseFilter={setCourseFilter} teacherFilter={teacherFilter} setTeacherFilter={setTeacherFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter} onReset={handleClearFilters}
      />

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-slate-900  border-t-transparent rounded-full animate-spin"></div></div>
      ) : filteredGroups.length === 0 ? (
        <GroupEmptyState onClearFilters={handleClearFilters} />
      ) : viewMode === 'grid' ? (
        <GroupsGrid groups={filteredGroups} teachers={teachers} courses={courses} rooms={rooms} users={users} onView={setViewingGroup} onEdit={handleOpenForm} onDelete={setDeleteConfirmId} />
      ) : (
        <GroupsTable groups={filteredGroups} teachers={teachers} courses={courses} rooms={rooms} users={users} onView={setViewingGroup} onEdit={handleOpenForm} onDelete={setDeleteConfirmId} />
      )}

      <GroupProfileDrawer group={viewingGroup} teacherName={viewingGroup ? getTeacherName(viewingGroup.teacher_id) : ''} courseName={viewingGroup ? getCourseName(viewingGroup.course_id) : ''} roomName={viewingGroup ? getRoomName(viewingGroup.room_id) : ''} isOpen={!!viewingGroup} onClose={() => setViewingGroup(null)} onEdit={handleOpenForm} onDelete={setDeleteConfirmId} />
      <GroupFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} editingId={editingId} formData={formData} setFormData={setFormData} handleSave={handleSave} courseOptions={courseOptions} teacherOptions={teacherOptions} roomOptions={roomOptions} />
      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="O'chirishni tasdiqlaysizmi?" maxWidth="max-w-md">
        <div className="space-y-4">
          <p className="text-slate-600 ">Rostdan ham ushbu guruhni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex gap-3 pt-2 justify-end">
            <Button variant="ghost" onClick={() => setDeleteConfirmId(null)}>Bekor qilish</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Ha, o'chirilsin</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
