import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { AvatarInitials } from '@/components/ui/page-header';
import { MoreHorizontal, Edit2, Trash2, Eye, MessageSquare } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown';

export function StudentsTableRow({
  student, branchName, parentName,
  isSelected, onToggleSelect, onView, onEdit, onDelete
}) {
  return (
    <TableRow
      data-state={isSelected ? 'selected' : undefined}
      className="cursor-pointer"
      onClick={() => onToggleSelect(student.id)}
    >
      {/* Checkbox */}
      <TableCell className="w-10 pl-4" onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(student.id)}
          aria-label="Select student"
        />
      </TableCell>

      {/* Name + ID */}
      <TableCell onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2.5">
          <AvatarInitials name={student.fullname} size="sm" />
          <div>
            <button
              className="text-[13px] font-medium text-slate-900 hover:text-blue-600 transition-colors leading-none"
              onClick={e => { e.stopPropagation(); onView(student); }}
            >
              {student.fullname}
            </button>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              #{student.id.toString().padStart(4, '0')}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Phone */}
      <TableCell className="text-[13px] text-slate-500" onClick={e => e.stopPropagation()}>
        {student.phone}
      </TableCell>

      {/* Branch */}
      <TableCell className="text-[13px] text-slate-600" onClick={e => e.stopPropagation()}>
        {branchName}
      </TableCell>

      {/* Parent */}
      <TableCell className="text-[13px] text-slate-500" onClick={e => e.stopPropagation()}>
        {parentName}
      </TableCell>

      {/* Status */}
      <TableCell onClick={e => e.stopPropagation()}>
        <Badge variant={student.is_active ? 'success' : 'danger'}>
          {student.is_active ? 'Faol' : 'Nofaol'}
        </Badge>
      </TableCell>

      {/* Actions (hover only) */}
      <TableCell className="w-12 pr-3" onClick={e => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onSelect={() => onView(student)}>
              <Eye className="mr-2 h-3.5 w-3.5 text-slate-400" />
              Profilni ko'rish
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onEdit(student)}>
              <Edit2 className="mr-2 h-3.5 w-3.5 text-slate-400" />
              Tahrirlash
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-3.5 w-3.5 text-slate-400" />
              Xabar yuborish
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => onDelete(student.id)}
              className="text-red-600 hover:bg-red-50 focus:bg-red-50"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              O'chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
