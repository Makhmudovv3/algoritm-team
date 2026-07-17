import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';

export default function LessonsSchedule({ schedules = [], rooms = [], groups = [], courses = [], teachers = [], users = [] }) {
  const days = [
    { id: 1, name: 'Dushanba' },
    { id: 2, name: 'Seshanba' },
    { id: 3, name: 'Chorshanba' },
    { id: 4, name: 'Payshanba' },
    { id: 5, name: 'Juma' },
    { id: 6, name: 'Shanba' },
    { id: 7, name: 'Yakshanba' }
  ];

  if (rooms.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-16 text-center shadow-sm">
        <h3 className="text-[15px] font-semibold text-slate-900 mb-1">Xonalar mavjud emas</h3>
        <p className="text-slate-500 text-[13px] max-w-sm mx-auto">
          Dars jadvalini ko'rish uchun avval tizimga xonalarni kiritishingiz kerak.
        </p>
      </div>
    );
  }

  const getSchedulesForCell = (roomId, dayId) => {
    return schedules
      .filter(s => String(s.room_id) === String(roomId) && Number(s.day_of_week) === dayId)
      .sort((a, b) => (a.start_time || '00:00').localeCompare(b.start_time || '00:00'));
  };

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

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Header */}
        <div className="grid grid-cols-[140px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-50 border-b border-slate-200">
          <div className="p-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center justify-center">
            Xonalar
          </div>
          {days.map(day => (
            <div key={day.id} className="p-4 text-center font-semibold text-[13px] text-slate-700 border-r border-slate-200 last:border-0">
              {day.name}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="divide-y divide-slate-200">
          {rooms.map(room => (
            <div key={room.id} className="grid grid-cols-[140px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] hover:bg-slate-50/30 transition-colors">
              {/* Room name */}
              <div className="p-4 font-medium text-[14px] text-slate-800 border-r border-slate-200 bg-slate-50/50 flex flex-col justify-center items-center text-center">
                <span className="font-bold">{room.name}</span>
                <span className="text-[11px] text-slate-500 mt-1 font-normal bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-sm">
                  Sig'im: {room.capacity}
                </span>
              </div>
              {/* Days columns */}
              {days.map(day => {
                const cellSchedules = getSchedulesForCell(room.id, day.id);
                
                return (
                  <div key={day.id} className="p-2 border-r border-slate-200 last:border-0 min-h-[140px] bg-white">
                    <div className="space-y-2">
                      {cellSchedules.map(schedule => {
                        const details = getGroupDetails(schedule.group_id);
                        if (!details) return null;

                        return (
                          <div key={schedule.id} className="bg-white border border-blue-100 rounded-lg p-2.5 shadow-sm hover:border-blue-300 hover:shadow transition-all group relative overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500"></div>
                            
                            <div className="flex items-center justify-between mb-1.5 pl-1.5">
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Clock className="h-2.5 w-2.5" />
                                {schedule.start_time} - {schedule.end_time}
                              </span>
                              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                {details.groupName}
                              </span>
                            </div>
                            
                            <div className="space-y-1 mt-2 pl-1.5">
                              <div className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium line-clamp-2 leading-tight">
                                <BookOpen className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                                <span>{details.courseName}</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-[10px] text-slate-500 line-clamp-1 pt-0.5 border-t border-slate-100">
                                <User className="h-3 w-3 text-slate-400 shrink-0" />
                                <span>{details.teacherName}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
