import React from 'react';
import { Edit2, Trash2, ChevronRight } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TeachersTable({ teachers, getUserName, getBranchName, onEdit, onDelete, onViewProfile }) {
  if (!teachers.length) {
    return (
      <TableContainer>
        <EmptyTableState title="O'qituvchilar topilmadi" description="Filtr yoki qidiruv so'rovini o'zgartiring." />
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">O'qituvchi</TableHead>
            <TableHead>Filial</TableHead>
            <TableHead>Maosh (o'quvchi)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map(t => {
            const name = getUserName(t.user_id);
            return (
              <TableRow
                key={t.id}
                className="cursor-pointer group"
                onClick={() => onViewProfile(t)}
              >
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={name} size="sm" />
                    <div>
                      <p className="text-[13px] font-medium text-slate-900 leading-none">{name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono">#{t.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-slate-500">
                  {getBranchName(t.branch_id)}
                </TableCell>
                <TableCell className="text-[13px] font-medium text-slate-700">
                  {new Intl.NumberFormat('uz-UZ').format(t.salary_per_student)}
                  <span className="text-[11px] text-slate-400 ml-1">UZS</span>
                </TableCell>
                <TableCell>
                  <Badge variant={t.is_active ? 'success' : 'danger'}>
                    {t.is_active ? 'Faol' : 'Nofaol'}
                  </Badge>
                </TableCell>
                <TableCell className="pr-3" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-slate-700" onClick={() => onEdit(t)}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(t.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-slate-700" onClick={() => onViewProfile(t)}>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
