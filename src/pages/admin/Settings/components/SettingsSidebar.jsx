import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Settings, Users, Shield, Key, GitBranch, 
  User, Bell, Palette, Lock
} from 'lucide-react';

const tabs = [
  { id: 'general', label: 'Umumiy sozlamalar', icon: Settings },
  { id: 'users', label: 'Xodimlar', icon: Users },
  { id: 'roles', label: 'Rollar', icon: Shield },
  { id: 'permissions', label: 'Huquqlar', icon: Key },
  { id: 'branches', label: 'Filiallar', icon: GitBranch },
  { id: 'profile', label: 'Mening profilim', icon: User },
  { id: 'notifications', label: 'Xabarnomalar', icon: Bell },
  { id: 'appearance', label: 'Ko\'rinish', icon: Palette },
  { id: 'security', label: 'Xavfsizlik', icon: Lock },
];

export function SettingsSidebar({ activeTab, onChange }) {
  return (
    <nav className="flex flex-col space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
              isActive 
                ? "bg-slate-100 text-slate-900  " 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900   "
            )}
          >
            <Icon size={18} className={cn(
              isActive ? "text-indigo-600 " : "text-slate-400"
            )} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
