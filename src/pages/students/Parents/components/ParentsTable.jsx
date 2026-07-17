import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/ui/search-input';

export function ParentsTable({ 
  parents, 
  students = [], 
  isLoading, 
  searchQuery, 
  setSearchQuery, 
  onEdit, 
  onDelete, 
  onRowClick 
}) {
  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        Yuklanmoqda...
      </div>
    );
  }

  if (parents.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
        Ota-onalar topilmadi.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <SearchInput 
          placeholder="Ism yoki telefon orqali qidiring..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          shortcut={false}
        />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">F.I.SH</th>
                <th className="px-6 py-4">Asosiy Raqam</th>
                <th className="px-6 py-4">Qo'shimcha Raqam</th>
                <th className="px-6 py-4">Parol</th>
                <th className="px-6 py-4">Qarindoshlik</th>
                <th className="px-6 py-4">Farzandlar</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parents.map((parent) => {
                const children = students.filter(s => String(s.parent_id) === String(parent.id));
                
                return (
                  <tr 
                    key={parent.id}
                    onClick={() => onRowClick && onRowClick(parent)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">{parent.name}</td>
                    <td className="px-6 py-4 text-slate-600">{parent.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{parent.phone2 || '-'}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{parent.phone?.replace(/\D/g, '').slice(-4) || '1234'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        parent.relation === 'Ota' ? 'info' :
                        parent.relation === 'Ona' ? 'purple' : 'outline'
                      }>
                        {parent.relation || 'Noma\'lum'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {children.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {children.map(child => (
                            <Badge key={child.id} variant="neutral" className="text-[11px] font-medium border border-slate-200 shadow-sm bg-white text-slate-700">
                              {child.fullname}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Yo'q</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => onEdit(parent)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onDelete(parent.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
