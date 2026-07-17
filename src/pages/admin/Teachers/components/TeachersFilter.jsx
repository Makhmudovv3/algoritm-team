import React from 'react';
import { Search } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect';

export default function TeachersFilter({ searchQuery, setSearchQuery, branchFilter, setBranchFilter, branchOptions }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full p-3 border-b border-slate-200 bg-white rounded-t-lg">
      <div className="w-full sm:max-w-xs flex items-center gap-2">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            className="flex h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 pl-8 pr-3 transition-all shadow-sm"
            placeholder="O'qituvchi izlash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full sm:w-[200px]">
        <CustomSelect 
          options={[{label: "Barcha filiallar", value: ""}, ...branchOptions]} 
          value={branchFilter} 
          onChange={setBranchFilter}
          className="h-8 shadow-sm"
        />
      </div>
    </div>
  );
}
