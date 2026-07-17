import React, { useState, useMemo } from 'react';
import { calculateAttendanceStats, groupAttendancesBy } from '../../../../utils/attendance';
import { SearchBar, TableContainer, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Select } from '@/components/ui/select';
import { CalendarDays, CheckCircle2, XCircle, AlertCircle, Circle } from 'lucide-react';

export default function MonthlyAttendance({ attendances, students, groups, teachers, isLoading }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().substring(0, 7));
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');

  // Generate days of the selected month
  const daysInMonth = useMemo(() => {
    const [year, month] = currentMonth.split('-');
    const numDays = new Date(year, month, 0).getDate();
    return Array.from({ length: numDays }, (_, i) => {
      const d = new Date(year, month - 1, i + 1);
      return {
        day: i + 1,
        dateString: d.toISOString().substring(0, 10),
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      };
    });
  }, [currentMonth]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.fullname.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Check if student belongs to the filtered group
      const studentGroupIds = groups.map(g => g.id); // Mock: we should actually cross-check StudentGroups, but since we don't have it passed here, we'll approximate or skip if not strictly available. 
      // Wait, in this schema, how do we know a student's group if we don't have StudentGroups?
      // For now, let's filter by checking if any of their attendances belong to that group.
      let matchGroup = true;
      if (groupFilter) {
        matchGroup = attendances.some(a => a.student_id === s.id && a.group_id === groupFilter);
      }

      // Teacher filter: same logic, check if group belongs to teacher
      let matchTeacher = true;
      if (teacherFilter) {
        const teacherGroupIds = groups.filter(g => g.teacher_id === teacherFilter).map(g => g.id);
        matchTeacher = attendances.some(a => a.student_id === s.id && teacherGroupIds.includes(a.group_id));
      }

      return matchSearch && matchGroup && matchTeacher;
    });
  }, [students, searchQuery, groupFilter, teacherFilter, attendances, groups]);

  // Map attendances for quick lookup: map[student_id][dateString] = status
  const attendanceMap = useMemo(() => {
    const map = {};
    attendances.forEach(a => {
      if (!a.date) return;
      const dateKey = a.date.substring(0, 10);
      if (!map[a.student_id]) map[a.student_id] = {};
      map[a.student_id][dateKey] = a.status;
    });
    return map;
  }, [attendances]);

  const groupOptions = [{ label: 'Barcha guruhlar', value: '' }, ...groups.map(g => ({ label: g.name, value: g.id }))];
  const teacherOptions = [{ label: "Barcha o'qituvchilar", value: '' }, ...teachers.map(t => {
    const tName = t.fullname || t.name || t.first_name || `O'qituvchi ID: ${String(t.id).substring(0,5)}`;
    return { label: tName, value: t.id };
  })];

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'excused': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Circle className="w-4 h-4 text-slate-200" />;
    }
  };

  return (
    <TableContainer className="flex flex-col relative">
      <div className="flex flex-col lg:flex-row gap-3 p-4 border-b border-slate-100 flex-wrap items-start lg:items-center relative z-40">
        <div className="w-full sm:w-auto">
          <input 
            type="month" 
            value={currentMonth} 
            onChange={e => setCurrentMonth(e.target.value)}
            className="h-9 px-3 text-sm font-medium text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full sm:w-40 bg-white"
          />
        </div>
        <div className="w-full sm:w-64">
          <SearchBar 
            placeholder="O'quvchi izlash..." 
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
        <div className="w-full sm:w-48">
          <Select 
            options={teacherOptions} 
            value={teacherFilter} 
            onChange={setTeacherFilter} 
          />
        </div>
      </div>

      <div className="overflow-x-auto premium-scrollbar relative max-h-[600px] overflow-y-auto z-10">
        <table className="w-full text-sm text-left border-collapse min-w-max">
          <thead className="text-xs text-slate-500 bg-slate-50 uppercase sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-medium sticky left-0 bg-slate-50 z-30 border-r border-b border-slate-200 min-w-[200px]">
                O'quvchi
              </th>
              {daysInMonth.map(d => (
                <th key={d.day} className={`px-2 py-3 text-center border-b border-slate-200 min-w-[40px] ${d.isWeekend ? 'bg-slate-100/50' : ''}`}>
                  {d.day}
                </th>
              ))}
              <th className="px-3 py-3 text-center border-b border-l border-slate-200 sticky right-0 bg-slate-50 z-30 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.05)]">
                Davomat
              </th>
              <th className="px-3 py-3 text-center border-b border-slate-200 bg-slate-50">K</th>
              <th className="px-3 py-3 text-center border-b border-slate-200 bg-slate-50">Y</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={daysInMonth.length + 4} className="text-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={daysInMonth.length + 4} className="p-0">
                  <EmptyTableState title="O'quvchilar topilmadi" description="Boshqa oydagi yoki guruhdagi ma'lumotlarni qidirib ko'ring." />
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => {
                const studentAtt = attendanceMap[student.id] || {};
                
                // Calculate stats for this student in this month
                const monthlyRecords = daysInMonth.map(d => ({ status: studentAtt[d.dateString] || null })).filter(a => a.status);
                const stats = calculateAttendanceStats(monthlyRecords);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-2 sticky left-0 bg-white group-hover:bg-slate-50/50 z-10 border-r border-slate-100 shadow-[4px_0_6px_-4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-2">
                        <AvatarInitials name={student.fullname} size="sm" />
                        <span className="font-medium text-slate-900 truncate max-w-[150px]">{student.fullname}</span>
                      </div>
                    </td>
                    {daysInMonth.map(d => {
                      const status = studentAtt[d.dateString];
                      return (
                        <td key={d.day} className={`px-2 py-2 text-center ${d.isWeekend ? 'bg-slate-50/50' : ''}`}>
                          <div className="flex justify-center items-center h-full w-full">
                            {renderStatusIcon(status)}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center font-semibold text-blue-600 sticky right-0 bg-white group-hover:bg-slate-50/50 z-10 border-l border-slate-100 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.05)]">
                      {stats.percentage}%
                    </td>
                    <td className="px-3 py-2 text-center text-emerald-600 font-medium">
                      {stats.present}
                    </td>
                    <td className="px-3 py-2 text-center text-red-500 font-medium">
                      {stats.absent}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Kelgan</div>
        <div className="flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-500"/> Kelmagan</div>
        <div className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-yellow-500"/> Sababli</div>
        <div className="flex items-center gap-1.5"><Circle className="w-4 h-4 text-slate-200"/> Dars bo'lmagan</div>
      </div>
    </TableContainer>
  );
}
