import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown';

export function GroupsTable({ groups, teachers, courses, rooms, users, onView, onEdit, onDelete }) {
  const getTeacherName = (tId) => {
    const t = teachers.find(t => t.id === tId);
    return t ? (users.find(u => u.id === t.user_id)?.fullname || '—') : '—';
  };
  const getCourseName = (cId) => courses.find(c => c.id === cId)?.name || '—';
  const getRoomName   = (rId) => rooms.find(r => r.id === rId)?.name || '—';

  if (!groups.length) {
    return (
      <TableContainer>
        <EmptyTableState title="Guruhlar topilmadi" description="Filtr yoki qidiruv so'rovini o'zgartiring." />
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Guruh</TableHead>
            <TableHead>Kurs / O'qituvchi</TableHead>
            <TableHead>Xona</TableHead>

            <TableHead>Muddat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map(g => (
            <TableRow key={g.id} className="cursor-pointer" onClick={() => onView(g)}>
              <TableCell className="pl-4">
                <div className="flex items-center gap-2.5">
                  <AvatarInitials name={g.name} size="sm" />
                  <div>
                    <p className="text-[13px] font-medium text-slate-900 hover:text-blue-600 transition-colors">
                      {g.name}
                    </p>
                    <p className="text-[11px] text-slate-400">{getRoomName(g.room_id)}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-[13px] text-slate-700">{getCourseName(g.course_id)}</p>
                <p className="text-[11px] text-slate-400">{getTeacherName(g.teacher_id)}</p>
              </TableCell>
              <TableCell className="text-[13px] text-slate-500">{getRoomName(g.room_id)}</TableCell>

              <TableCell>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Calendar className="h-3 w-3 text-slate-300" />
                  {g.start_date ? g.start_date.substring(0, 10) : '—'}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={g.is_active ? 'success' : 'danger'}>
                  {g.is_active ? 'Faol' : 'Nofaol'}
                </Badge>
              </TableCell>
              <TableCell className="pr-3" onClick={e => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onEdit(g)}>Tahrirlash</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 hover:bg-red-50" onClick={() => onDelete(g.id)}>O'chirish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
