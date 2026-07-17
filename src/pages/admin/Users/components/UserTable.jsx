import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function UserTable({ users, searchQuery, roleFilter, getRoleName, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <TableContainer>
        <EmptyTableState 
          title={searchQuery || roleFilter !== 'all' ? "Qidiruvingiz bo'yicha xodim topilmadi" : "Xodimlar yo'q"} 
          description={searchQuery || roleFilter !== 'all' ? "Filtrni o'zgartirib ko'ring." : "Yangi xodim qo'shing."} 
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
            <TableHead>Xodim</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Roli</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24 text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} className="group cursor-pointer">
              <TableCell className="pl-4 text-slate-500 font-mono text-[11px]">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <AvatarInitials name={user.fullname} size="sm" />
                  <div>
                    <span className="text-[13px] font-medium text-slate-900 block leading-none">{user.fullname}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-600 text-[13px]">{user.phone}</TableCell>
              <TableCell>
                <Badge variant="neutral">{getRoleName(user.role_id)}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.is_active ? 'success' : 'danger'}>
                  {user.is_active ? 'Faol' : 'Nofaol'}
                </Badge>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(user)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(user.id)}>
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
