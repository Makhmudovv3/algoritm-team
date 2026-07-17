import React from 'react';

export default function LessonsTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'list', label: "Ro'yxat" },
    { id: 'schedule', label: 'Jadval' },
    { id: 'calendar', label: 'Taqvim' },
    { id: 'homework', label: 'Vazifalar' },
  ];

  return (
    <div className="flex border-b border-slate-200  overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-700  '
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
