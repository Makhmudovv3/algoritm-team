import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StudentEmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-300">
      <div className="h-20 w-20 rounded-full bg-slate-50  flex items-center justify-center mb-6">
        <Search className="h-10 w-10 text-slate-300 " />
      </div>
      <h3 className="text-lg font-semibold text-slate-900  mb-2">O'quvchilar topilmadi</h3>
      <p className="text-sm text-slate-500 max-w-[300px] mb-6 leading-relaxed">
        Qidiruv so'ziga mos keluvchi o'quvchilar yo'q yoki filtrlash noto'g'ri. Boshqa so'z bilan urinib ko'ring.
      </p>
      <Button variant="outline" onClick={onClearFilters}>
        Filtrlarni tozalash
      </Button>
    </div>
  );
}
