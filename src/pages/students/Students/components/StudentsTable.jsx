import React from 'react';
import {
  Table, TableBody, TableHead, TableHeader, TableRow, TableCell
} from '@/components/ui/table';
import { TableContainer, EmptyTableState, TableLoadingSkeleton } from '@/components/ui/page-header';
import { Checkbox } from '@/components/ui/checkbox';
import { StudentsTableRow } from './StudentsTableRow';

export function StudentsTable({
  students, branches, parents,
  isLoading, selectedIds,
  onToggleSelect, onSelectAll,
  onView, onEdit, onDelete, onClearFilters
}) {
  const getBranchName = (id) => branches.find(b => b.id === id)?.name || '—';
  const getParentName = (id) => parents.find(p => p.id === id)?.name || '—';
  const allSelected = students.length > 0 && selectedIds.length === students.length;

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-slate-50">
            <TableHead className="w-10 pl-4">
              <Checkbox checked={allSelected} onChange={onSelectAll} aria-label="Select all" />
            </TableHead>
            <TableHead>O'quvchi</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Parol</TableHead>
            <TableHead>Filial</TableHead>
            <TableHead>Ota-ona</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableLoadingSkeleton cols={7} rows={7} />
          ) : students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="p-0">
                <EmptyTableState
                  title="O'quvchilar topilmadi"
                  description="Filtr yoki qidiruv so'rovini o'zgartiring."
                  onReset={onClearFilters}
                />
              </TableCell>
            </TableRow>
          ) : (
            students.map(student => (
              <StudentsTableRow
                key={student.id}
                student={student}
                branchName={getBranchName(student.branch_id)}
                parentName={getParentName(student.parent_id)}
                isSelected={selectedIds.includes(student.id)}
                onToggleSelect={onToggleSelect}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
