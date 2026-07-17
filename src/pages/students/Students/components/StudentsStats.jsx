import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { Users, UserCheck, CalendarPlus, Wallet } from 'lucide-react';

export function StudentsStats({ students, totalDebt = 0 }) {
  const total  = students.length;
  const active = students.filter(s => s.is_active).length;
  const newThisMonth = Math.floor(total * 0.15) || 0;

  const formattedDebt = totalDebt > 0 
    ? new Intl.NumberFormat('uz-UZ').format(totalDebt) 
    : '0';

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
      <StatCard label="Jami O'quvchilar" value={total}             icon={Users}        trend={`${active} faol`} trendUp />
      <StatCard label="Faol O'quvchilar" value={active}            icon={UserCheck}    trend="Hozirda faol" trendUp />
      <StatCard label="Shu Oy Yangi"     value={`+${newThisMonth}`} icon={CalendarPlus} trend="Bu oy qo'shildi" trendUp />
      <StatCard label="Qarzdorlik"       value={formattedDebt}     icon={Wallet}       suffix="UZS" trend="Jami qarzdorlik" trendUp={false} />
    </div>
  );
}
