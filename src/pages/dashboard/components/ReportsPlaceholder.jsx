import React from 'react';
import { SectionCard } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { FileText, TrendingUp, Users, DollarSign, Download, ArrowRight } from 'lucide-react';

const REPORTS = [
  { id: 1, title: 'Moliyaviy xulosa',    desc: '2026 2-chorak daromad va xarajatlari',           icon: DollarSign },
  { id: 2, title: 'O\'quvchilar ketishi',        desc: 'Tark etgan o\'quvchilar tahlili',          icon: Users },
  { id: 3, title: 'O\'sish prognozlari',   desc: '3-chorak uchun kutilayotgan qabullar',         icon: TrendingUp },
  { id: 4, title: 'O\'qituvchilar ko\'rsatkichi',  desc: 'Davomat va reyting asosidagi hisobot',      icon: FileText },
];

export function ReportsPlaceholder({ isLoading, onExport }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm animate-pulse">
        <div className="p-5 border-b border-slate-100">
          <div className="h-4 w-28 rounded bg-slate-100" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 rounded bg-slate-100" />
                <div className="h-2.5 w-40 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SectionCard
      title="Hisobotlar"
      description="Tayyor hisobotlar"
      noPad
    >
      <div className="divide-y divide-slate-100">
        {REPORTS.map(report => (
          <div
            key={report.id}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
              <report.icon className="h-3.5 w-3.5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">{report.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{report.desc}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); onExport(report.id); }}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <div className="px-5 py-3.5 border-t border-slate-100">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-between text-slate-500 border-dashed"
          onClick={() => onExport('custom')}
        >
          Maxsus hisobot yaratish
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </SectionCard>
  );
}
