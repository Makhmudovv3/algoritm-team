import React from 'react';
import { Edit2, Trash2, Phone } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, SearchBar, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';

export function ParentsTable({
  parents, isLoading,
  searchQuery, setSearchQuery,
  onEdit, onDelete, onRowClick
}) {
  const filtered = parents.filter(p =>
    (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.phone || '').includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      <TableContainer>
        <div className="p-4 border-b border-slate-100 bg-white">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Ism yoki telefon orqali qidiring..."
            className="w-full sm:max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">F.I.SH</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Parol</TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {[1, 2, 3, 4].map(c => (
                    <TableCell key={c}>
                      <div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: c === 1 ? '70%' : '50%' }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="p-0">
                  <EmptyTableState title="Ota-onalar topilmadi" />
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(p => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => onRowClick(p)}
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <AvatarInitials name={p.name} size="sm" />
                      <span className="text-[13px] font-medium text-slate-900">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {p.phone}
                    </div>
                  </TableCell>
                  <TableCell className="text-[12px] text-slate-400 font-mono">
                    {p.password || '—'}
                  </TableCell>
                  <TableCell className="pr-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-slate-700" onClick={() => onEdit(p)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(p.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
