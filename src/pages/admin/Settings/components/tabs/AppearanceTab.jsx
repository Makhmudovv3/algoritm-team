import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';

export function AppearanceTab() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    
    let themeName = '';
    if (newTheme === 'light') themeName = "Yorug' mavzu";
    if (newTheme === 'dark') themeName = "Qorong'u mavzu";
    if (newTheme === 'system') themeName = "Tizim sozlamasi";
    
    toast.success(`${themeName} faollashtirildi`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Ko'rinish</h2>
        <p className="text-sm text-slate-500  mt-1">Tizimning ranglari va interfeys mavzusini o'zgartirish.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-medium text-slate-900  mb-4">Mavzu (Theme)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => handleThemeChange('light')}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
              theme === 'light' ? "border-indigo-600 bg-indigo-50/50 " : "border-slate-200  hover:border-slate-300 "
            )}
          >
            <Sun className={theme === 'light' ? "text-indigo-600" : "text-slate-500"} size={24} />
            <span className={cn("text-sm font-medium", theme === 'light' ? "text-indigo-700 " : "text-slate-700 ")}>Yorug' mavzu</span>
          </button>

          <button 
            onClick={() => handleThemeChange('dark')}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
              theme === 'dark' ? "border-indigo-600 bg-indigo-50/50 " : "border-slate-200  hover:border-slate-300 "
            )}
          >
            <Moon className={theme === 'dark' ? "text-indigo-600" : "text-slate-500"} size={24} />
            <span className={cn("text-sm font-medium", theme === 'dark' ? "text-indigo-700 " : "text-slate-700 ")}>Qorong'u mavzu</span>
          </button>

          <button 
            onClick={() => handleThemeChange('system')}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
              theme === 'system' ? "border-indigo-600 bg-indigo-50/50 " : "border-slate-200  hover:border-slate-300 "
            )}
          >
            <Monitor className={theme === 'system' ? "text-indigo-600" : "text-slate-500"} size={24} />
            <span className={cn("text-sm font-medium", theme === 'system' ? "text-indigo-700 " : "text-slate-700 ")}>Tizim sozlamasi</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
