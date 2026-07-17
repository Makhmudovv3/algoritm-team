import React from 'react';
import { FileText, Clock, FileCheck2 } from 'lucide-react';

export default function PaymentsTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'transactions', label: 'Barcha to\'lovlar', icon: FileCheck2 },
    { id: 'pending', label: 'Kutilayotgan to\'lovlar', icon: Clock },
    { id: 'invoices', label: 'Invoyslar', icon: FileText },
  ];

  return (
    <div className="flex items-center gap-4 overflow-x-auto border-b border-[#E2E8F0] mb-6">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-1 py-2.5 text-[13px] font-medium transition-colors border-b-2 ${
              isActive 
                ? 'border-[#2563EB] text-[#2563EB]' 
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Icon size={14} className={isActive ? 'text-[#2563EB]' : 'text-[#64748B]'} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
