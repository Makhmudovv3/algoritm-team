import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Users, CheckCircle2, DollarSign, Calendar, BookOpen, Layers, Monitor, Phone, Settings } from 'lucide-react';
import { Modal } from '../ui/modal';

const ACTIONS = [
  { id: 'dash', title: 'Dashboard', route: '/', icon: <Monitor size={16} /> },
  { id: 'users', title: 'Xodimlar', route: '/admin/users', icon: <User size={16} /> },
  { id: 'roles', title: 'Lavozimlar', route: '/admin/roles', icon: <Settings size={16} /> },
  { id: 'branches', title: 'Filiallar', route: '/admin/branches', icon: <Layers size={16} /> },
  { id: 'rooms', title: 'Xonalar', route: '/admin/rooms', icon: <Monitor size={16} /> },
  { id: 'teachers', title: 'O\'qituvchilar', route: '/admin/teachers', icon: <User size={16} /> },
  { id: 'courses', title: 'Kurslar', route: '/academic/courses', icon: <BookOpen size={16} /> },
  { id: 'groups', title: 'Guruhlar', route: '/academic/groups', icon: <Users size={16} /> },
  { id: 'lessons', title: 'Darslar', route: '/academic/lessons', icon: <Calendar size={16} /> },
  { id: 'schedules', title: 'Dars jadvali', route: '/academic/schedules', icon: <Calendar size={16} /> },
  { id: 'calls', title: 'Qo\'ng\'iroqlar', route: '/finance/call-logs', icon: <Phone size={16} /> },
  { id: 'finance', title: 'Moliya hisoblari', route: '/finance/finance-accounts', icon: <DollarSign size={16} /> },
  { id: 'payments', title: 'To\'lovlar', route: '/finance/payments', icon: <DollarSign size={16} /> },
  { id: 'attendance', title: 'Davomat', route: '/students/attendance', icon: <CheckCircle2 size={16} /> },
  { id: 'students', title: 'O\'quvchilar', route: '/students/students', icon: <User size={16} /> },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    const handleOpen = () => setIsOpen(true);

    document.addEventListener('keydown', down);
    window.addEventListener('open-command-palette', handleOpen);
    
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', handleOpen);
    };
  }, []);

  const filteredActions = ACTIONS.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (route) => {
    navigate(route);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm p-4 pt-[20vh] transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="mx-auto max-w-xl bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden ring-1 ring-slate-900/5">
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            className="w-full bg-transparent p-4 outline-none text-slate-900  placeholder:text-slate-400"
            placeholder="Qidirish... (Sahifalar bo'ylab)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block rounded border px-1.5 py-0.5 text-xs font-medium text-slate-500 bg-slate-100  ">
            ESC
          </kbd>
        </div>
        
        {filteredActions.length > 0 ? (
          <ul className="max-h-72 overflow-y-auto p-2">
            {filteredActions.map((action) => (
              <li key={action.id}>
                <button
                  onClick={() => handleSelect(action.route)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <div className="text-slate-400">{action.icon}</div>
                  <span>{action.title}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-sm text-slate-500">
            Hech narsa topilmadi.
          </div>
        )}
      </div>
    </div>
  );
}
