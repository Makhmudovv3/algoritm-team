import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonsCalendar({ lessons = [], getGroupName }) {
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

  const getLessonsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return lessons.filter(l => l.date && l.date.startsWith(dateStr));
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
                  <div className={`text-[12px] font-medium mb-1 pl-1 ${
                    day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
                    ? 'text-blue-600' : 'text-slate-400'
                  }`}>{day}</div>
                  <div className="space-y-1">
                    {dayLessons.map(l => (
                      <div key={l.id} className={`px-2 py-1 rounded text-[11px] leading-tight truncate cursor-pointer transition-colors ${
                        l.status === 'completed' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100' :
                        l.status === 'cancelled' ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-100' :
                        'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100'
                      }`} title={`${l.topic || 'Mavzusiz'} - ${getGroupName(l.group_id)}`}>
                        {l.topic || 'Mavzusiz'}
                      </div>
                    ))}
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
