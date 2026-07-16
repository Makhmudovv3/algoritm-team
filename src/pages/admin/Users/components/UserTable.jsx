import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function UserTable({ users, searchQuery, roleFilter, getRoleName, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">#</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Xodim</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefon</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roli</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                {searchQuery || roleFilter !== 'all' ? "Qidiruvingiz bo'yicha xodim topilmadi" : "Ma'lumot topilmadi"}
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{user.fullname}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200">
                    {getRoleName(user.role_id)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    user.is_active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {user.is_active ? 'Faol' : 'Nofaol'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(user)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(user.id)}
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
