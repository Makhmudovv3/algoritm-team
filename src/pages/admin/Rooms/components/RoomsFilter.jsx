import React from 'react';
import { Search } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect';

export default function RoomsFilter({ searchQuery, setSearchQuery, branchFilter, setBranchFilter, branchOptions }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 py-2 border-b border-slate-200">
      <div className="relative w-full sm:max-w-[240px]">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
          <Search size={14} className="text-slate-400" />
        </div>
        <input 
          type="text"
          placeholder="Xona nomi orqali qidiring..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
        />
      </div>
      <div className="w-full sm:w-[200px]">
        <CustomSelect 
          options={[{label: "Barcha filiallar", value: ""}, ...branchOptions]} 
          value={branchFilter} 
          onChange={setBranchFilter}
        />
      </div>
    </div>
  );
}
