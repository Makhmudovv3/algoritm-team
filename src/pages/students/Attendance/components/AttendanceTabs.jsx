import React from 'react';

export default function AttendanceTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'daily', label: 'Kunlik davomat' },
    { id: 'monthly', label: 'Oylik davomat' },
    { id: 'heatmap', label: 'Faollik xaritasi' },
    { id: 'groups', label: 'Guruhlar bo\'yicha' },
    { id: 'teachers', label: 'O\'qituvchilar' },
    { id: 'history', label: 'Tarix' },
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 ">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
            activeTab === tab.id
              ? 'border-slate-900 text-slate-900  '
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300   '
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
