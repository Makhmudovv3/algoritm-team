import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function BranchTable({ branches, searchQuery, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">#</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Filial nomi</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Manzili</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {branches.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                {searchQuery ? "Qidiruvingiz bo'yicha filial topilmadi" : "Ma'lumot topilmadi"}
              </td>
            </tr>
          ) : (
            branches.map((branch, index) => (
              <tr key={branch.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{branch.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{branch.address}</td>
                <td className="px-6 py-4 text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(branch)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(branch.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
