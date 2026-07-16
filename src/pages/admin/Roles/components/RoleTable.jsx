import React from 'react';
import { Edit2, Trash2, ShieldCheck, Shield, UserCircle, Calendar } from 'lucide-react';

export default function RoleTable({ roles, onEdit, onDelete }) {
  const getRoleIcon = (level) => {
    switch (level) {
      case 1: return <ShieldCheck size={14} className="text-indigo-600" />;
      case 2: return <Shield size={14} className="text-blue-600" />;
      default: return <UserCircle size={14} className="text-sky-600" />;
    }
  };

  const getLevelStyle = (level) => {
    switch (level) {
      case 1: return "from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200";
      case 2: return "from-blue-100 to-cyan-100 text-blue-800 border-blue-200";
      default: return "from-sky-100 to-teal-100 text-sky-800 border-sky-200";
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-16">#</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Rol nomi</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Darajasi (Level)</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Yaratilgan sana</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {roles.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Shield size={48} className="mb-4 opacity-20" />
                  <p className="text-base font-medium text-gray-500">Hech qanday rol topilmadi</p>
                  <p className="text-sm mt-1">Yangi rol qo'shish uchun yuqoridagi tugmani bosing</p>
                </div>
              </td>
            </tr>
          ) : (
            roles.map((role, index) => (
              <tr key={role.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-400 group-hover:text-blue-500 transition-colors">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                      {getRoleIcon(role.level)}
                    </div>
                    <span className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {role.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r border shadow-sm ${getLevelStyle(role.level)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${role.level === 1 ? 'animate-pulse' : ''}`} />
                    Level {role.level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    <Calendar size={14} className="text-gray-400" />
                    {role.created_at ? new Date(role.created_at).toLocaleDateString('uz-UZ') : '-'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(role)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 bg-white border border-gray-200 rounded-lg hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                      title="Tahrirlash"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(role.id)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 bg-white border border-gray-200 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                      title="O'chirish"
                    >
                      <Trash2 size={16} />
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
