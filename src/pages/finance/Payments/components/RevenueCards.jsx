import React from 'react';
import { StatCard } from '@/components/ui/page-header';
import { DollarSign, TrendingUp, Clock, CreditCard } from 'lucide-react';

export default function RevenueCards({ payments, accounts = [] }) {
  const totalRevenue = payments.reduce((acc, p) => acc + (p.sum || 0), 0);
  const totalCount   = payments.length;
  const accountsCount = accounts.length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
      <StatCard
        label="Jami tushum"
        value={`${new Intl.NumberFormat('uz-UZ').format(totalRevenue)}`}
        suffix="UZS"
        icon={DollarSign}
        trend="+12.5% o'tgan oyga"
        trendUp
      />
      <StatCard
        label="Tranzaksiyalar"
        value={totalCount}
        icon={TrendingUp}
        trend="+5.2% o'tgan oyga"
        trendUp
      />
      <StatCard
        label="Kutilayotgan"
        value="0"
        icon={Clock}
        trend="Hech biri yo'q"
        trendUp
      />
      <StatCard
        label="Hisoblar"
        value={accountsCount}
        icon={CreditCard}
        trend={accountsCount > 0 ? "Faol hisoblar" : "Hisob yo'q"}
        trendUp
      />
    </div>
  );
}
