import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { Layers, CheckCircle2, Users, GraduationCap, BarChart3, Wallet } from 'lucide-react';

export function GroupsStats({ groups }) {
  const total        = groups.length;
  const active       = groups.filter(g => g.is_active).length;
  const totalStudents = total * 12;
  const totalTeachers = new Set(groups.map(g => g.teacher_id)).size || 0;
  const totalRevenue  = groups.reduce((acc, g) => acc + (Number(g.price) || 0) * 12, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
      <StatCard label="Jami guruhlar"    value={total}          icon={Layers}       trendUp />
      <StatCard label="Faol guruhlar"    value={active}         icon={CheckCircle2} trend={`${total - active} nofaol`} trendUp />
      <StatCard label="O'quvchilar"      value={totalStudents}  icon={Users}        trendUp />
      <StatCard label="O'qituvchilar"    value={totalTeachers}  icon={GraduationCap} trendUp />
      <StatCard label="O'rtacha davomat" value="88%"            icon={BarChart3}    trendUp />
      <StatCard label="Oylik tushum"     value={`${(totalRevenue / 1000000).toFixed(1)}M`} suffix="UZS" icon={Wallet} trendUp />
    </div>
  );
}
