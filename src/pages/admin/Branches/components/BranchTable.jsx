import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, EmptyTableState } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';

export default function BranchTable({ branches, searchQuery, onEdit, onDelete }) {
  if (branches.length === 0) {
    return (
      <TableContainer>
        <EmptyTableState 
          title={searchQuery ? "Qidiruvingiz bo'yicha filial topilmadi" : "Filiallar yo'q"} 
          description={searchQuery ? "Qidiruv so'zini o'zgartirib ko'ring." : "Yangi filial qo'shing."} 
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
            <TableHead>Filial nomi</TableHead>
            <TableHead>Manzili</TableHead>
            <TableHead className="w-24 text-right pr-4">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch, index) => (
            <TableRow key={branch.id} className="group">
              <TableCell className="pl-4 text-slate-500 font-mono text-[11px]">{index + 1}</TableCell>
              <TableCell className="font-medium text-slate-900">{branch.name}</TableCell>
              <TableCell className="text-slate-600">{branch.address}</TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(branch)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(branch.id)}>
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
