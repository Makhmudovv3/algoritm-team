import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AvatarInitials } from '@/components/ui/page-header';
import { Users, Clock, MapPin, MoreHorizontal, Calendar } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown';

export function GroupCard({ group, teacherName, courseName, roomName, onView, onEdit, onDelete }) {
  const studentsCount  = 12;  // placeholder
  const capacity       = 15;
  const progressPct    = Math.round((studentsCount / capacity) * 100);

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-150 cursor-pointer group"
      onClick={() => onView(group)}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <AvatarInitials name={group.name} size="md" />
            <div>
              <h3 className="text-[13px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                {group.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{courseName}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                onClick={e => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit(group); }}>
                Tahrirlash
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                onClick={e => { e.stopPropagation(); onDelete(group.id); }}
              >
                O'chirish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <AvatarInitials name={teacherName} size="xs" />
            <span className="truncate">{teacherName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{roomName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>{
              group.days === '2-4-6' ? 'Sesh · Pay · Shan' :
              group.days === 'everyday' ? 'Har kuni' :
              'Dush · Chor · Jum'
            }</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span>14:00 – 15:30</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50/50 rounded-b-xl">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Users className="h-3 w-3" /> O'quvchilar
          </span>
          <span className="text-[11px] font-semibold text-slate-700">
            {studentsCount}/{capacity}
          </span>
        </div>
        <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Badge variant={group.is_active ? 'success' : 'danger'}>
            {group.is_active ? 'Faol' : 'Nofaol'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
