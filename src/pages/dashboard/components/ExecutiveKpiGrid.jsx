import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, UserCheck, DollarSign,
  TrendingUp, ShieldCheck, Clock, Activity
} from 'lucide-react';

const formatMoney = (n) =>
  n === 0 ? '0'
  : new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(n);

const KPI_SKELETON = () => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-3 w-20 rounded bg-slate-100" />
      <div className="w-7 h-7 rounded-lg bg-slate-100" />
    </div>
    <div className="h-6 w-16 rounded bg-slate-100 mb-2" />
    <div className="h-3 w-24 rounded bg-slate-100" />
  </div>
);

export function ExecutiveKpiGrid({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <KPI_SKELETON key={i} />)}
      </div>
    );
  }

  const kpis = [
    { label: 'Umumiy daromad',    value: `$${formatMoney(stats?.revenue || 0)}`,     icon: DollarSign,  trend: "O'tgan oyga nisbatan +12.5%", trendUp: true },
    { label: 'O\'quvchilar',      value: stats?.students || 0,                        icon: Users,       trend: '+5.1% faol o\'quvchilar', trendUp: true },
    { label: 'O\'qituvchilar',    value: stats?.teachers || 0,                        icon: UserCheck,   trend: 'Hozirda faoliyat yurituvchi', trendUp: true },
    { label: 'Faol guruhlar',     value: stats?.groups || 0,                          icon: BookOpen,    trend: 'Davom etayotgan darslar', trendUp: true },
  ];

  return (
    <motion.div
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, staggerChildren: 0.05 }}
    >
      {kpis.map((k, i) => (
        <StatCard
          key={i}
          label={k.label}
          value={k.value}
          icon={k.icon}
          trend={k.trend}
          trendUp={k.trendUp}
        />
      ))}
    </motion.div>
  );
}
