import React from 'react';
import { Edit2, Trash2, GraduationCap, MapPin, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TeachersGrid({ teachers, getUserName, getBranchName, onEdit, onDelete, onViewProfile }) {
  if (teachers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <GraduationCap className="mx-auto h-8 w-8 text-slate-300 mb-2" />
        <p className="text-[13px]">Ma'lumot topilmadi</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50/50">
      {teachers.map((t) => (
        <div key={t.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer relative group flex flex-col h-full shadow-sm" onClick={() => onViewProfile(t)}>
          <div className="absolute top-3 right-3 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1" onClick={e => e.stopPropagation()}>
             <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-900 hover:bg-slate-100" onClick={() => onEdit(t)}>
               <Edit2 size={14} />
             </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(t.id)}>
               <Trash2 size={14} />
             </Button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 border border-slate-100">
              <GraduationCap size={18} />
            </div>
            <div className="flex-1 min-w-0 pr-12">
              <h3 className="text-[14px] font-medium text-slate-900 truncate leading-tight">{getUserName(t.user_id)}</h3>
              <Badge variant={t.is_active ? 'success' : 'secondary'} className="mt-1.5 text-[10px] px-1.5 py-0 font-medium">
                {t.is_active ? 'Faol' : 'Nofaol'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-auto pt-5 space-y-2">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin size={14} className="text-slate-400" />
              <span className="truncate">{getBranchName(t.branch_id)}</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Wallet size={14} className="text-slate-400" />
              <span>{new Intl.NumberFormat('uz-UZ').format(t.salary_per_student)} UZS</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
