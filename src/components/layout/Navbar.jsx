import React, { useEffect, useState } from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ toggleSidebar, isMobile }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'Algoritm CRM';
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-white/80 backdrop-blur-md px-4 sm:px-6 ">
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="mr-2 p-2 rounded-md hover:bg-slate-100  text-slate-500"
        >
          <Menu size={20} />
        </button>
      )}

      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900  hidden sm:block">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-full rounded-full border border-input bg-slate-50/50 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary  "
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 ">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <button onClick={toggleTheme} className="rounded-full p-2 text-slate-500 hover:bg-slate-100   transition-colors">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100   transition-colors">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-semibold text-slate-900 ">Admin User</span>
            <span className="text-xs text-slate-500 ">Superadmin</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors   ">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
