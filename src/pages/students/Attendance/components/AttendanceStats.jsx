import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { Users, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export default function AttendanceStats({ attendances }) {
  const totalRecords = attendances.length || 0;
  const presentRecords = attendances.filter(a => a.status === 'present').length || 0;
  const absentRecords = attendances.filter(a => a.status === 'absent').length || 0;
  const presentPercentage = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
      <StatCard label="Umumiy yozuvlar" value={totalRecords} icon={Users} trendUp />
      <StatCard label="Kelganlar" value={presentRecords} icon={CheckCircle2} trendUp />
      <StatCard label="Kelmaganlar" value={absentRecords} icon={XCircle} trendUp={false} />
      <StatCard label="Davomat ko'rsatkichi" value={`${presentPercentage}`} suffix="%" icon={TrendingUp} trendUp />
    </div>
  );
}
