import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function LessonsHomework({ lessons = [], getGroupName }) {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-slate-200 rounded-md">
        <p className="text-slate-500 text-[13px]">Hozircha vazifalar mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Vazifa / Dars</TableHead>
            <TableHead>Guruh</TableHead>
            <TableHead>Muddat</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead className="text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map(l => (
            <TableRow key={l.id} className="group">
              <TableCell className="pl-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <BookOpen size={14} />
                  </div>
                  <div>
                    <span className="text-[13px] font-medium text-slate-900 block max-w-xs truncate">
                      {l.topic ? `${l.topic} yuzasidan vazifa` : 'Vazifa kiritilmagan'}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">{l.date ? l.date.substring(0, 10) : '—'} darsiga</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-[13px] text-slate-600">{getGroupName(l.group_id)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Clock size={13} className="text-slate-400" />
                  {l.date ? `${l.date.substring(0, 10)} 23:59` : '—'}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={l.status === 'completed' ? 'success' : 'neutral'}>
                  {l.status === 'completed' ? 'Tekshirildi' : 'Kutilmoqda'}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-4">
                <Button variant="outline" size="sm" className="h-7 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {l.status === 'completed' ? "Natijani ko'rish" : "Tekshirish"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
