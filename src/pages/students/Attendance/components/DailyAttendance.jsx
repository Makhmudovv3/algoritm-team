import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, SearchBar, EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';

export default function DailyAttendance({ attendances, students, groups, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [dateFilter, setDateFilter]  = useState('');

  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || 'Noma\'lum';
  const getGroupName   = (id) => groups.find(g => g.id === id)?.name || 'Noma\'lum';

  const groupOptions = [
    { label: 'Barcha guruhlar', value: '' },
    ...groups.map(g => ({ label: g.name, value: g.id }))
  ];

  const filtered = attendances.filter(a => {
    const sName = getStudentName(a.student_id).toLowerCase();
    const matchSearch = sName.includes(searchQuery.toLowerCase());
    const matchGroup  = groupFilter ? String(a.group_id) === String(groupFilter) : true;
    const matchDate   = dateFilter ? a.date && a.date.startsWith(dateFilter) : true;
    return matchSearch && matchGroup && matchDate;
  });

  return (
    <TableContainer>
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100 flex-wrap relative z-40">
        <div className="w-full sm:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="O'quvchi ismi..."
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={groupOptions}
            value={groupFilter}
            onChange={setGroupFilter}
          />
        </div>
        <div className="w-full sm:w-44">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-8 w-full px-3 text-[13px] border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-slate-700 placeholder:text-slate-400 bg-white"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">O'quvchi</TableHead>
            <TableHead>Guruh</TableHead>
            <TableHead>Sana</TableHead>
            <TableHead className="pr-4 text-right">Status</TableHead>
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
                <EmptyTableState title="Davomat topilmadi" description="Qidiruv yoki filtrlarni o'zgartiring." />
              </TableCell>
            </TableRow>
          ) : (
            filtered.map(a => (
              <TableRow key={a.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={getStudentName(a.student_id)} size="sm" />
                    <span className="text-[13px] font-medium text-slate-900">{getStudentName(a.student_id)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="neutral">{getGroupName(a.group_id)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    {a.date ? a.date.substring(0, 10) : '—'}
                  </div>
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <Badge variant={a.status === 'present' ? 'success' : 'danger'}>
                    {a.status === 'present' ? 'Kelgan' : 'Kelmagan'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
