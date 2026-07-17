import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RoomTable({ rooms, searchQuery, branchFilter, getBranchName, onEdit, onDelete }) {
  if (rooms.length === 0) {
    return (
      <TableContainer>
        <EmptyTableState 
          title={searchQuery || branchFilter !== 'all' ? "Qidiruvingiz bo'yicha xona topilmadi" : "Xonalar yo'q"} 
          description={searchQuery || branchFilter !== 'all' ? "Filtrni o'zgartirib ko'ring." : "Yangi xona qo'shing."} 
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
            <TableHead>Xona nomi</TableHead>
            <TableHead>Sig'imi</TableHead>
            <TableHead>Filial</TableHead>
            <TableHead className="w-24 text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow key={room.id} className="group cursor-pointer">
              <TableCell className="pl-4 text-slate-500 font-mono text-[11px]">{index + 1}</TableCell>
              <TableCell className="font-medium text-slate-900">{room.name}</TableCell>
              <TableCell>
                <Badge variant="neutral">{room.capacity} kishi</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="info">{getBranchName(room.branch_id)}</Badge>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(room)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(room.id)}>
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
