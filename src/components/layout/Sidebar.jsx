import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, GitBranch, DoorOpen, GraduationCap, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/admin/roles', label: 'Roles', icon: Shield },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/branches', label: 'Branches', icon: GitBranch },
    { path: '/admin/rooms', label: 'Rooms', icon: DoorOpen },
    { path: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600">
          <LayoutDashboard size={24} />
          <span className="text-xl font-bold tracking-tight">Algoritm</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">
          Management
        </div>
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2026 Algoritm CRM
        </div>
      </div>
    </aside>
  );
}
