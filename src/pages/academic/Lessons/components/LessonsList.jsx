import React from 'react';
import { Edit2, Trash2, Calendar, BookOpen, Users, CalendarDays, Clock, MoreVertical } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';

export default function LessonsList({ lessons, isLoading, onEdit, onDelete, getGroupName, getLessonTime }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-[14px]">Darslar yuklanmoqda...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarDays className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-[15px] font-semibold text-slate-900 mb-1">Darslar topilmadi</h3>
        <p className="text-slate-500 text-[13px] max-w-sm mx-auto">
          Qidiruv so'ziga mos darslar yo'q yoki tizimga hali darslar kiritilmagan.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[300px] pl-6 font-semibold text-slate-600">Dars mavzusi</TableHead>
            <TableHead className="font-semibold text-slate-600">Guruh</TableHead>
            <TableHead className="font-semibold text-slate-600">Sana va Vaqt</TableHead>
            <TableHead className="font-semibold text-slate-600">Holat</TableHead>
            <TableHead className="text-right pr-6 font-semibold text-slate-600">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map((l) => (
            <TableRow key={l.id} className="group hover:bg-slate-50/50">
              <TableCell className="pl-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-blue-50 text-blue-600 rounded-md">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 text-[14px]">{l.topic || 'Mavzusiz'}</div>
                    <div className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1">
                      ID: LSN-{l.id.substring(0, 8)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-[13px] font-medium text-slate-700">{getGroupName(l.group_id)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-900 font-medium">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                    {l.date ? l.date.substring(0, 10) : '—'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {getLessonTime ? getLessonTime(l) : '14:00'}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium border ${
                  l.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                  l.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                  'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {l.status === 'completed' ? "O'tildi" : l.status === 'cancelled' ? "Bekor qilindi" : "Reja"}
                </span>
              </TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onEdit(l)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Tahrirlash
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50" onClick={() => onDelete(l.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> O'chirish
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
