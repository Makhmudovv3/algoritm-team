import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/CustomSelect';

export default function LessonsFilter({ searchQuery, setSearchQuery, groupFilter, setGroupFilter, groupOptions }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full pb-4 mb-4 border-b border-slate-200">
      <div className="w-full sm:max-w-xs relative">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input 
          type="text"
          className="w-full h-8 pl-9 pr-3 py-1 bg-white border border-slate-200 rounded-md text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors shadow-sm"
          placeholder="Mavzu bo'yicha qidiring..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <CustomSelect 
          options={[{label: "Barcha guruhlar", value: ""}, ...groupOptions]} 
          value={groupFilter} 
          onChange={setGroupFilter} 
          className="h-8 text-[13px] border-slate-200 shadow-sm"
        />
      </div>
    </div>
  );
}
