import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TableContainer, SearchBar, EmptyTableState, AvatarInitials, Toolbar } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Calendar, MoreHorizontal } from 'lucide-react';

const PAYMENT_TYPE = { cash: 'Naqd', card: 'Plastik', bank: 'Bank' };

export default function TransactionsTable({
  isLoading, payments, students, accounts,
  searchQuery, setSearchQuery,
  accountFilter, setAccountFilter
}) {
  const getStudentName = (id) => students.find(s => s.id === id)?.fullname || '—';
  const getAccountName = (id) => accounts.find(a => a.id === id)?.name || '—';
  const accountOptions = [
    { label: 'Barcha hisoblar', value: '' },
    ...accounts.map(a => ({ label: a.name, value: a.id }))
  ];

  const filtered = payments.filter(p => {
    const name = getStudentName(p.student_id).toLowerCase();
    const matchSearch  = name.includes(searchQuery.toLowerCase());
    const matchAccount = accountFilter ? String(p.finance_account_id) === String(accountFilter) : true;
    return matchSearch && matchAccount;
  });

  return (
    <TableContainer>
      {/* Toolbar inside the card */}
      <div className="flex flex-col sm:flex-row gap-2 p-3 border-b border-slate-100">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="O'quvchi ismi..."
          className="w-full sm:w-64"
        />
        <Select
          options={accountOptions}
          value={accountFilter}
          onChange={setAccountFilter}
          className="w-full sm:w-44"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">O'quvchi</TableHead>
            <TableHead>Summa</TableHead>
            <TableHead>To'lov turi</TableHead>
            <TableHead>Hisob</TableHead>
            <TableHead>Sana</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                {[1,2,3,4,5,6].map(c => (
                  <TableCell key={c}><div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: c === 1 ? '80%' : '60%' }} /></TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="p-0">
                <EmptyTableState title="To'lovlar topilmadi" />
              </TableCell>
            </TableRow>
          ) : (
            filtered.map(p => (
              <TableRow key={p.id} className="cursor-pointer">
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={getStudentName(p.student_id)} size="sm" />
                    <span className="text-[13px] font-medium text-slate-900">{getStudentName(p.student_id)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] font-semibold text-slate-900 tabular-nums">
                  {new Intl.NumberFormat('uz-UZ').format(p.sum)}
                  <span className="text-[11px] font-normal text-slate-400 ml-1">UZS</span>
                </TableCell>
                <TableCell>
                  <Badge variant="neutral">{PAYMENT_TYPE[p.type] || p.type}</Badge>
                </TableCell>
                <TableCell className="text-[12px] text-slate-500">{getAccountName(p.finance_account_id)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {p.date ? p.date.substring(0, 10) : '—'}
                  </div>
                </TableCell>
                <TableCell className="pr-3" onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
