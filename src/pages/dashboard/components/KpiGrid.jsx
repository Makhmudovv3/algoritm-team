import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardSkeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Clock, DollarSign, 
  UserCheck, CreditCard, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export function KpiGrid({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[1, 2, 3, 4].map(i => <CardSkeleton key={i} className="h-[140px]" />)}
      </div>
    );
  }

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('uz-UZ', { notation: "compact", compactDisplay: "short" }).format(amount);
  };

  const kpis = [
    {
      title: "Jami O'quvchilar",
      value: stats?.students || 0,
      trend: "+12%",
      isPositive: true,
      icon: Users,
      desc: "Faol o'quvchilar",
      sparkline: "70%",
    },
    {
      title: "O'qituvchilar",
      value: stats?.teachers || 0,
      trend: "+2 ta",
      isPositive: true,
      icon: UserCheck,
      desc: "Tizimdagi ustozlar",
      sparkline: "45%",
    },
    {
      title: "Faol Guruhlar",
      value: stats?.groups || 0,
      trend: "+4 ta",
      isPositive: true,
      icon: BookOpen,
      desc: "O'quv guruhlari",
      sparkline: "85%",
    },
    {
      title: "Oylik Tushum",
      value: `${formatMoney(stats?.revenue || 0)} UZS`,
      trend: "+8.2%",
      isPositive: true,
      icon: DollarSign,
      desc: "Umumiy tushum",
      sparkline: "60%",
    },
    {
      title: "Bugungi Darslar",
      value: stats?.activeLessons || 0,
      trend: "4 ta",
      isPositive: true,
      icon: Clock,
      desc: "Jarayondagi darslar",
      sparkline: "90%",
    },
    {
      title: "Kutilayotgan To'lovlar",
      value: "4.2M UZS",
      trend: "-12%",
      isPositive: false,
      icon: CreditCard,
      desc: "Qarzdorliklar",
      sparkline: "30%",
    }
  ];

  return (
    <motion.div 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpis.map((kpi, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="group relative overflow-hidden p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 ">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 ">{kpi.title}</span>
              <div className="p-1.5 rounded-md bg-slate-50 text-slate-500 transition-colors group-hover:bg-slate-100 group-hover:text-slate-900    ">
                <kpi.icon className="h-4 w-4" />
              </div>
            </div>
            
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900  mb-1">
                {kpi.value}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={kpi.isPositive ? "success" : "danger"} className="px-1.5 py-0 text-[10px] h-4">
                  {kpi.isPositive ? <ArrowUpRight className="h-2.5 w-2.5 mr-0.5" /> : <ArrowDownRight className="h-2.5 w-2.5 mr-0.5" />}
                  {kpi.trend}
                </Badge>
                <span className="text-[11px] text-slate-400 truncate">{kpi.desc}</span>
              </div>
            </div>

            {/* Sparkline Placeholder */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50 ">
              <div 
                className={cn("h-full transition-all duration-500 ease-out", kpi.isPositive ? "bg-green-500" : "bg-red-500")} 
                style={{ width: kpi.sparkline }} 
              />
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
