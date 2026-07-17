import React from 'react';
import { Card } from '@/components/ui/card';
import { UserPlus, Users, ClipboardCheck, Wallet, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  { label: 'Yangi O\'quvchi', icon: UserPlus, color: 'text-slate-700 ', bg: 'bg-slate-100 ' },
  { label: 'Guruh Yaratish', icon: Users, color: 'text-slate-700 ', bg: 'bg-slate-100 ' },
  { label: 'Davomat Olish', icon: ClipboardCheck, color: 'text-slate-700 ', bg: 'bg-slate-100 ' },
  { label: 'To\'lov Qabul', icon: Wallet, color: 'text-slate-700 ', bg: 'bg-slate-100 ' },
  { label: 'Hisobotlar', icon: BarChart3, color: 'text-slate-700 ', bg: 'bg-slate-100 ' },
];

export function QuickActionsGrid() {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-slate-900  mb-4">Tezkor Amallar</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action, idx) => (
          <motion.div key={idx} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
            <Card className="p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-slate-300  transition-colors text-center h-full">
              <div className={`p-3 rounded-full ${action.bg}`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span className="text-[13px] font-medium text-slate-700 ">
                {action.label}
              </span>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
