import React, { useMemo } from 'react';
import { calculateAttendanceStats } from '../../../../utils/attendance';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, User, TrendingUp, TrendingDown } from 'lucide-react';
import { EmptyTableState } from '@/components/ui/page-header';

export default function GroupAttendance({ attendances, groups, students, teachers, isLoading }) {
  const groupStats = useMemo(() => {
    return groups.map(group => {
      // Find students in this group (from attendances or StudentGroups if available, using attendances as fallback)
      // Since we don't have StudentGroups here directly mapped, we'll estimate from attendances
      const groupAttendances = attendances.filter(a => a.group_id === group.id);
      
      const uniqueStudentIds = new Set(groupAttendances.map(a => a.student_id));
      const studentCount = uniqueStudentIds.size; // We can also use students array if they had group_id
      
      const teacher = teachers.find(t => t.id === group.teacher_id);
      
      const stats = calculateAttendanceStats(groupAttendances);

      // Best / Worst Student in Group
      let bestStudent = null;
      let worstStudent = null;
      
      if (uniqueStudentIds.size > 0) {
        let bestPct = -1;
        let worstPct = 101;
        
        uniqueStudentIds.forEach(sId => {
          const sAtt = groupAttendances.filter(a => a.student_id === sId);
          const sStats = calculateAttendanceStats(sAtt);
          
          if (sStats.percentage > bestPct) {
            bestPct = sStats.percentage;
            bestStudent = students.find(s => s.id === sId)?.fullname || "Noma'lum";
          }
          if (sStats.percentage < worstPct) {
            worstPct = sStats.percentage;
            worstStudent = students.find(s => s.id === sId)?.fullname || "Noma'lum";
          }
        });
      }

      // Calculate total lessons. We assume unique dates for this group in the month
      const uniqueDates = new Set(groupAttendances.filter(a => a.date).map(a => a.date.substring(0, 10)));
      
      const tName = teacher ? (teacher.fullname || teacher.name || teacher.first_name || `O'qituvchi ID: ${String(teacher.id).substring(0,5)}`) : "Biriktirilmagan";

      return {
        ...group,
        teacherName: tName,
        studentCount,
        stats,
        totalLessons: uniqueDates.size,
        bestStudent,
        worstStudent
      };
    });
  }, [groups, attendances, teachers, students]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (groupStats.length === 0) {
    return <EmptyTableState title="Guruhlar topilmadi" description="Hozircha tizimda guruhlar mavjud emas." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {groupStats.map(group => (
        <Card key={group.id} className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <User className="w-3.5 h-3.5 mr-1" />
                    {group.teacherName}
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-sm font-semibold flex items-center">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  {group.totalLessons} dars
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-2">
                <div className="text-sm font-medium text-slate-500 flex items-center">
                  <Users className="w-4 h-4 mr-1.5" />
                  {group.studentCount} o'quvchi
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {group.stats.percentage}%
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2 mb-1 overflow-hidden">
                <div 
                  className={`h-2 rounded-full ${group.stats.percentage >= 80 ? 'bg-emerald-500' : group.stats.percentage >= 50 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                  style={{ width: `${group.stats.percentage}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-slate-400 text-right">Umumiy davomat</div>
            </div>
            
            <div className="bg-slate-50 p-4 grid grid-cols-2 gap-4 divide-x divide-slate-200">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" /> Eng yaxshi
                </div>
                <div className="text-sm font-medium text-slate-800 truncate" title={group.bestStudent || '-'}>
                  {group.bestStudent || '-'}
                </div>
              </div>
              <div className="pl-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-red-500" /> Eng yomon
                </div>
                <div className="text-sm font-medium text-slate-800 truncate" title={group.worstStudent || '-'}>
                  {group.worstStudent || '-'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
