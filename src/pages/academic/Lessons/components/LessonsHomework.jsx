import React from 'react';
import { BookOpen, Clock, Users, FileText, CheckCircle2, ChevronRight, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function LessonsHomework({ lessons = [], getGroupName, getLessonTime }) {
  if (lessons.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-blue-400" />
        </div>
        <h3 className="text-[15px] font-semibold text-slate-900 mb-1">Vazifalar topilmadi</h3>
        <p className="text-slate-500 text-[13px] max-w-sm mx-auto">
          Ushbu guruh yoki tanlangan sana oralig'ida vazifalar yo'q.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {lessons.map((l, index) => {
        // Mock data for submission stats to make it look premium
        const totalStudents = 15;
        const submitted = l.status === 'completed' ? 15 : Math.floor(Math.random() * 10);
        const progressPct = Math.round((submitted / totalStudents) * 100);
        
        return (
          <div key={l.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group relative overflow-hidden flex flex-col">
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex gap-3 items-center">
                <div className={`p-2.5 rounded-lg ${l.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {l.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {l.topic ? `${l.topic} yuzasidan vazifa` : 'Vazifa kiritilmagan'}
                  </h3>
                  <div className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <span className="font-medium text-slate-700">{getGroupName(l.group_id)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 mb-4 space-y-2 relative z-10">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Muddat</span>
                <span className="font-medium text-slate-800 flex items-center gap-1">
                  {l.date ? l.date.substring(0, 10) : '—'} <span className="text-slate-400 font-normal">23:59</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500 flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Topshirganlar</span>
                <span className="font-medium text-slate-800">
                  {submitted} / {totalStudents}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${l.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progressPct}%` }}></div>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between relative z-10">
              <Badge variant={l.status === 'completed' ? 'success' : 'neutral'} className="h-6 px-2.5">
                {l.status === 'completed' ? 'Tekshirildi' : 'Kutilmoqda'}
              </Badge>
              <Button size="sm" variant={l.status === 'completed' ? 'outline' : 'default'} className="h-8 text-[12px] px-3">
                {l.status === 'completed' ? "Natijalar" : "Tekshirish"}
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
}
