import React from 'react';
import { GroupCard } from './GroupCard';

export function GroupsGrid({ groups, teachers, courses, rooms, users, onView, onEdit, onDelete }) {
  const getTeacherName = (tId) => {
    const teacher = teachers.find(t => t.id === tId);
    if (!teacher) return 'Noma\'lum';
    return users.find(u => u.id === teacher.user_id)?.fullname || 'Noma\'lum';
  };

  const getCourseName = (cId) => courses.find(c => c.id === cId)?.name || 'Noma\'lum';
  const getRoomName = (rId) => rooms.find(r => r.id === rId)?.name || 'Noma\'lum';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {groups.map(group => (
        <GroupCard 
          key={group.id}
          group={group}
          teacherName={getTeacherName(group.teacher_id)}
          courseName={getCourseName(group.course_id)}
          roomName={getRoomName(group.room_id)}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
