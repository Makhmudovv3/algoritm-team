import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { GitBranch, Users, GraduationCap, CreditCard } from 'lucide-react';

export default function BranchesStats({ branches }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      <StatCard label="Jami filiallar" value={branches.length} icon={GitBranch} trendUp />
      <StatCard label="O'qituvchilar"  value="124"             icon={Users}         trendUp />
      <StatCard label="O'quvchilar"    value="3,450"           icon={GraduationCap} trendUp />
      <StatCard label="Oylik daromad"  value="450"             suffix="M UZS"       icon={CreditCard} trendUp />
    </div>
  );
}
