import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const mockPayments = [
  { id: 1, student: "Aliyev Vali", course: "Ingliz tili B2", amount: "450,000 UZS", date: "Bugun, 14:30", status: "success" },
  { id: 2, student: "Murodov Jamshid", course: "Matematika", amount: "300,000 UZS", date: "Bugun, 11:15", status: "success" },
  { id: 3, student: "Karimova Odina", course: "IELTS", amount: "550,000 UZS", date: "Kecha", status: "warning" },
  { id: 4, student: "Tolipov Jasur", course: "Fizika", amount: "350,000 UZS", date: "Kecha", status: "success" },
];

export function RecentPayments() {
  return (
    <Card className="flex flex-col mb-8">
      <CardHeader className="border-b border-slate-100  pb-4">
        <CardTitle className="text-base">So'nggi To'lovlar</CardTitle>
      </CardHeader>
      <div className="p-0">
        <Table className="border-0 shadow-none">
          <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent">
              <TableHead className="pl-6 text-xs">O'quvchi</TableHead>
              <TableHead className="text-xs">Kurs</TableHead>
              <TableHead className="text-xs">Summa</TableHead>
              <TableHead className="text-xs">Vaqt</TableHead>
              <TableHead className="pr-6 text-xs">Holat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar initials={payment.student.split(' ').map(n => n[0]).join('')} size="sm" />
                    <span className="font-medium text-slate-900  text-[13px]">{payment.student}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-slate-500">{payment.course}</TableCell>
                <TableCell className="text-[13px] font-medium">{payment.amount}</TableCell>
                <TableCell className="text-[13px] text-slate-500">{payment.date}</TableCell>
                <TableCell className="pr-6">
                  <Badge variant={payment.status === 'success' ? 'success' : 'warning'}>
                    {payment.status === 'success' ? 'To\'landi' : 'Kutilmoqda'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
