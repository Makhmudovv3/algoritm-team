import React from 'react';
import { Edit2, Trash2, ShieldCheck, Shield, UserCircle, Calendar } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RoleTable({ roles, onEdit, onDelete }) {
  const getRoleIcon = (level) => {
    switch (level) {
      case 1: return <ShieldCheck size={14} className="text-indigo-600" />;
      case 2: return <Shield size={14} className="text-blue-600" />;
      default: return <UserCircle size={14} className="text-sky-600" />;
    }
  };

  const getLevelVariant = (level) => {
    switch (level) {
      case 1: return "purple";
      case 2: return "info";
      default: return "neutral";
    }
  };

  if (roles.length === 0) {
    return (
      <TableContainer>
        <EmptyTableState 
          title="Rollari topilmadi" 
          description="Yangi rol qo'shish uchun yuqoridagi tugmani bosing" 
        />
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 pl-4">#</TableHead>
            <TableHead>Rol nomi</TableHead>
            <TableHead>Darajasi (Level)</TableHead>
            <TableHead>Yaratilgan sana</TableHead>
            <TableHead className="w-24 text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={role.id} className="group cursor-pointer">
              <TableCell className="pl-4 text-slate-500 font-mono text-[11px]">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {getRoleIcon(role.level)}
                  </div>
                  <span className="text-[13px] font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    {role.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getLevelVariant(role.level)}>
                  Level {role.level}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  {role.created_at ? new Date(role.created_at).toLocaleDateString('uz-UZ') : '-'}
                </div>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(role)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(role.id)}>
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
