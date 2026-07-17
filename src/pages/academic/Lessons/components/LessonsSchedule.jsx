import React, { useState } from 'react';
import { Clock, MapPin, Users } from 'lucide-react';

export default function LessonsSchedule({ lessons, getGroupName }) {
  const [view, setView] = useState('weekly');

  const todayStr = new Date().toISOString().substring(0, 10);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const displayLessons = lessons.filter(l => {
    if (!l.date) return false;
    if (view === 'daily') {
      return l.date.substring(0, 10) === todayStr;
    } else {
      const lessonDate = new Date(l.date);
      return lessonDate >= startOfWeek && lessonDate <= endOfWeek;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-[14px] font-medium text-slate-900">Darslar jadvali</h2>
        <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1 text-[12px] font-medium rounded-sm transition-colors ${
              view === 'daily' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Kunlik
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-3 py-1 text-[12px] font-medium rounded-sm transition-colors ${
              view === 'weekly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Haftalik
          </button>
        </div>
      </div>

      {displayLessons.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-md">
          <p className="text-slate-500 text-[13px]">Jadval uchun {view === 'daily' ? 'bugun' : 'bu hafta'} darslar topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayLessons.map((lesson) => (
            <div key={lesson.id} className="bg-white border border-slate-200 rounded-md p-4 shadow-sm hover:shadow transition-shadow group flex flex-col gap-3">
              <div>
                <span className={`inline-flex mb-2 px-1.5 py-0.5 rounded-full text-[11px] font-medium border ${
                  lesson.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                  lesson.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                  'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {lesson.status === 'completed' ? "O'tildi" : lesson.status === 'cancelled' ? "Bekor qilindi" : "Rejalashtirilgan"}
                </span>
                <h3 className="font-medium text-[13px] text-slate-900 line-clamp-1">
                  {lesson.topic || 'Mavzusiz'}
                </h3>
              </div>
              
              <div className="space-y-1.5 text-[12px] text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>{lesson.date ? lesson.date.substring(0, 10) : '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-slate-400" />
                  <span>{getGroupName(lesson.group_id)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span>Markaziy filial</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
                <div className="text-[12px] text-slate-500 truncate pr-2">
                  O'qituvchi nomi kiritilmagan
                </div>
                <button className="text-[12px] font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center py-6">
        <p className="text-slate-400 text-[12px]">
          * Tez orada to'liq jadval tizimi ishga tushadi
        </p>
      </div>
    </div>
  );
}
