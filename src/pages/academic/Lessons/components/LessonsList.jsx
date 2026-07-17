import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LessonsList({ lessons, isLoading, onEdit, onDelete, getGroupName }) {
  if (isLoading) {
    return (
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Mavzu / Guruh</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}>
                {[1, 2, 3, 4].map(c => (
                  <TableCell key={c}>
                    <div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: c === 1 ? '70%' : '50%' }} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (lessons.length === 0) {
    return (
      <TableContainer>
        <EmptyTableState title="Darslar topilmadi" description="Yangi dars qo'shing yoki filtrlarni o'zgartiring." />
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Mavzu / Guruh</TableHead>
            <TableHead>Sana</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map(l => (
            <TableRow key={l.id} className="group cursor-pointer">
              <TableCell className="pl-4">
                <div className="flex items-center gap-2.5">
                  <AvatarInitials name={l.topic || 'Mavzusiz'} size="sm" />
                  <div>
                    <span className="text-[13px] font-medium text-slate-900 block leading-none truncate max-w-[200px] sm:max-w-xs">{l.topic || 'Mavzusiz'}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Guruh: {getGroupName(l.group_id)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  {l.date ? l.date.substring(0, 10) : '—'}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  l.status === 'completed' ? 'success' : 
                  l.status === 'cancelled' ? 'danger' : 'neutral'
                }>
                  {l.status === 'completed' ? "O'tildi" : l.status === 'cancelled' ? 'Bekor qilindi' : 'Rejalashtirilgan'}
                </Badge>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(l)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(l.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
