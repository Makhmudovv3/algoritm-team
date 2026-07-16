import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function RoomTable({ rooms, searchQuery, branchFilter, getBranchName, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">#</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Xona nomi</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sig'imi</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tegishli filial</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                {searchQuery || branchFilter !== 'all' ? "Qidiruvingiz bo'yicha xona topilmadi" : "Ma'lumot topilmadi"}
              </td>
            </tr>
          ) : (
            rooms.map((room, index) => (
              <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{room.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200">
                    {room.capacity} kishi
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100">
                    {getBranchName(room.branch_id)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(room)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(room.id)}
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
