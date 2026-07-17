import React, { useMemo, useState } from 'react';
import { calculateAttendanceStats } from '../../../../utils/attendance';
import { TableContainer, SearchBar, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, Users } from 'lucide-react';

export default function TeacherAttendance({ attendances, groups, teachers, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'percentage', direction: 'desc' });

  const teacherStats = useMemo(() => {
    // 1. Map teachers to their data
    let stats = teachers.map(teacher => {
      // Find groups taught by this teacher
      const teacherGroups = groups.filter(g => g.teacher_id === teacher.id);
      
      // Collect all attendances for these groups
      const groupIds = teacherGroups.map(g => g.id);
      const teacherAttendances = attendances.filter(a => groupIds.includes(a.group_id));
      
      // Calculate total student count
      const uniqueStudentIds = new Set(teacherAttendances.map(a => a.student_id));
      const studentCount = uniqueStudentIds.size;
      
      // Calculate overall stats
      const overallStats = calculateAttendanceStats(teacherAttendances);

      // Find Best / Worst Group
      let bestGroup = null;
      let worstGroup = null;
      
      if (teacherGroups.length > 0) {
        let bestPct = -1;
        let worstPct = 101;
        
        teacherGroups.forEach(g => {
          const gAtt = teacherAttendances.filter(a => a.group_id === g.id);
          const gStats = calculateAttendanceStats(gAtt);
          
          if (gStats.percentage > bestPct) {
            bestPct = gStats.percentage;
            bestGroup = g.name;
          }
          if (gStats.percentage < worstPct) {
            worstPct = gStats.percentage;
            worstGroup = g.name;
          }
        });
      }

      // Teacher Name mapping
      const teacherName = teacher.fullname || teacher.name || teacher.first_name || `O'qituvchi ID: ${String(teacher.id).substring(0,5)}`;

      return {
        id: teacher.id,
        name: teacherName,
        groupCount: teacherGroups.length,
        studentCount,
        percentage: overallStats.percentage,
        bestGroup,
        worstGroup
      };
    });

    // 2. Filter by search
    if (searchQuery) {
      stats = stats.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Sort
    stats.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return stats;
  }, [teachers, groups, attendances, searchQuery, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortableHead = ({ label, sortKey, className }) => (
    <TableHead 
      className={`cursor-pointer hover:bg-slate-100 transition-colors select-none ${className || ''}`}
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={`w-3.5 h-3.5 ${sortConfig.key === sortKey ? 'text-blue-600' : 'text-slate-400'}`} />
      </div>
    </TableHead>
  );

  return (
    <TableContainer>
      <div className="p-3 border-b border-slate-100">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="O'qituvchi ismi..."
          className="w-full sm:max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead label="O'qituvchi" sortKey="name" className="pl-4" />
            <SortableHead label="Guruhlar soni" sortKey="groupCount" />
            <SortableHead label="O'quvchilar soni" sortKey="studentCount" />
            <SortableHead label="O'rtacha Davomat" sortKey="percentage" />
            <TableHead>Eng yaxshi guruh</TableHead>
            <TableHead className="pr-4">Eng past guruh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                {[1, 2, 3, 4, 5, 6].map(c => (
                  <TableCell key={c}>
                    <div className="h-4 rounded bg-slate-100 animate-pulse w-1/2" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : teacherStats.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="p-0">
                <EmptyTableState icon={Users} title="O'qituvchilar topilmadi" description="Qidiruv natijasi bo'sh." />
              </TableCell>
            </TableRow>
          ) : (
            teacherStats.map(t => (
              <TableRow key={t.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    <AvatarInitials name={t.name} size="sm" />
                    <span className="font-medium text-slate-900">{t.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {t.groupCount} ta
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {t.studentCount} ta
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 w-32">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${t.percentage >= 80 ? 'bg-emerald-500' : t.percentage >= 50 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                        style={{ width: `${t.percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold ${t.percentage >= 80 ? 'text-emerald-600' : t.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {t.percentage}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {t.bestGroup || '-'}
                  </span>
                </TableCell>
                <TableCell className="pr-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                    {t.worstGroup || '-'}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
