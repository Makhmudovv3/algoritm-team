import React from 'react';
import { GitBranch, MapPin, Edit2, Trash2, Search, ChevronRight } from 'lucide-react';

export default function BranchesGrid({ 
  branches, 
  searchQuery, 
  setSearchQuery, 
  isLoading, 
  onEdit, 
  onDelete,
  onViewDetails
}) {
  const filtered = branches.filter(b => 
    (b.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-slate-200">
        <div className="relative w-full sm:max-w-[300px]">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </div>
          <input 
            type="text"
            placeholder="Filial nomi orqali qidiring..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <GitBranch size={18} className="text-slate-400" />
          </div>
          <h3 className="text-[14px] font-medium text-slate-900 mb-1">Filiallar topilmadi</h3>
          <p className="text-[13px] text-slate-500">Qidiruv so'rovingizga mos keladigan filial mavjud emas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
          {filtered.map(branch => (
            <div 
              key={branch.id} 
              className="group flex flex-col justify-between bg-white border border-slate-200 rounded-lg p-3 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => onViewDetails(branch)}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                      <GitBranch size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[13px] text-slate-900 leading-tight">{branch.name}</h3>
                      <span className="text-[11px] font-medium text-emerald-600 px-1.5 py-0.5 rounded bg-emerald-50 mt-0.5 inline-block">Faol</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                    <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" onClick={() => onEdit(branch)}>
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded" onClick={() => onDelete(branch)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[12px] text-slate-500 mb-4">
                  <MapPin size={14} className="mt-[2px] shrink-0 text-slate-400" />
                  <span className="line-clamp-2">{branch.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-auto">
                <div className="flex -space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-slate-200 border border-white" />
                  ))}
                  <div className="w-5 h-5 rounded-full bg-slate-50 border border-white flex items-center justify-center text-[9px] text-slate-500 font-medium">
                    +42
                  </div>
                </div>
                <span className="text-[12px] font-medium text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Batafsil <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
