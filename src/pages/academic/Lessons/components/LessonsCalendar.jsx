import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonsCalendar({ lessons = [], schedules = [], rooms = [], groups = [], courses = [], teachers = [], users = [], getGroupName }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  let firstDay = getFirstDayOfMonth(year, month);
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getGroupDetails = (groupId) => {
    const group = groups.find(g => String(g.id) === String(groupId));
    if (!group) return null;
    
    const course = courses.find(c => String(c.id) === String(group.course_id));
    const teacher = teachers.find(t => String(t.id) === String(group.teacher_id));
    const user = teacher ? users.find(u => String(u.id) === String(teacher.user_id)) : null;

    return {
      groupName: group.name,
      courseName: course?.name || 'Noma\'lum fan',
      teacherName: user?.fullname || 'O\'qituvchi belgilanmagan'
    };
  };

  const getLessonTime = (lesson) => {
    if (!lesson.date) return '14:00';
    const d = new Date(lesson.date);
    const jsDay = d.getDay() === 0 ? 7 : d.getDay();
    const groupSchedule = schedules?.find(s => String(s.group_id) === String(lesson.group_id) && String(s.day_of_week) === String(jsDay));
    return groupSchedule ? groupSchedule.start_time : '14:00';
  };

  const getLessonsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let dayLessons = lessons.filter(l => l.date && l.date.startsWith(dateStr));
    
    dayLessons.sort((a, b) => {
      return getLessonTime(a).localeCompare(getLessonTime(b));
    });

    return dayLessons;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <h2 className="text-[15px] font-semibold text-slate-900">{monthNames[month]} {year}</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon-sm" onClick={prevMonth} className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon-sm" onClick={nextMonth} className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
        {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map(d => (
          <div key={d} className="py-2 text-center text-[12px] font-medium text-slate-500 border-r border-slate-200 last:border-0">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const dayLessons = getLessonsForDate(day);
          return (
            <div key={idx} className={`min-h-[120px] p-1.5 border-b border-r border-slate-200 ${!day ? 'bg-slate-50/50' : 'bg-white'}`}>
              {day && (
                <>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className={`flex items-center justify-center text-[12px] font-medium w-6 h-6 rounded-full ${
                      day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500'
                    }`}>{day}</span>
                  </div>
                  <div className="space-y-1">
                    {dayLessons.map(l => {
                      const details = getGroupDetails(l.group_id);
                      if (!details) return null;
                      return (
                      <div key={l.id} className="group px-1.5 py-1.5 rounded hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 flex flex-col" title={`${l.topic || 'Mavzusiz'} - ${details.groupName}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            l.status === 'completed' ? 'bg-emerald-500' :
                            l.status === 'cancelled' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`} />
                          <span className="text-[10px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors tracking-wide flex gap-1">
                            <span>{getLessonTime(l)}</span>
                            <span>•</span>
                            <span>{details.groupName}</span>
                          </span>
                        </div>
                        <div className="pl-3 flex flex-col gap-0.5">
                          <span className="text-[11px] font-medium text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">
                            {details.courseName}
                          </span>
                          <span className="text-[10px] text-slate-500 line-clamp-1 leading-tight flex items-center gap-1">
                            {details.teacherName}
                          </span>
                        </div>
                      </div>
                    )})}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
