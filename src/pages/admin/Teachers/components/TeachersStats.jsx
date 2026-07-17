import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { Users, UserCheck, UserX, Wallet } from 'lucide-react';

export default function TeachersStats({ teachers }) {
  const active   = teachers.filter(t => t.is_active).length;
  const inactive = teachers.length - active;
  const avgSalary = teachers.length
    ? teachers.reduce((acc, t) => acc + (t.salary_per_student || 0), 0) / teachers.length
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      <StatCard label="Jami"         value={teachers.length} icon={Users}      trendUp />
      <StatCard label="Faol"         value={active}          icon={UserCheck}  trendUp />
      <StatCard label="Nofaol"       value={inactive}        icon={UserX}      trendUp={false} />
      <StatCard label="O'rtacha maosh" value={`${new Intl.NumberFormat('uz-UZ').format(Math.round(avgSalary))}`} suffix="UZS" icon={Wallet} trendUp />
    </div>
  );
}
