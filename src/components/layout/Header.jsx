import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, Plus, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';

export default function Header({ toggleSidebar, isMobile }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await api.Users.getById('user-1');
      setUser(u);
    };
    fetchUser();
    window.addEventListener('profileUpdated', fetchUser);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (!event.target.closest('.notif-container')) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('profileUpdated', fetchUser);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const titleMap = {
    'users': 'Xodimlar',
    'roles': 'Rollar',
    'branches': 'Filiallar',
    'teachers': "O'qituvchilar",
    'rooms': 'Xonalar',
    'students': "O'quvchilar",
    'parents': 'Ota-onalar',
    'studentgroups': "Guruhlar (O'quvchilar)",
    'attendance': 'Davomat',
    'ratings': 'Reyting',
    'courses': 'Kurslar',
    'groups': 'Guruhlar',
    'lessons': 'Darslar',
    'schedules': 'Dars jadvallari',
    'studenttransfer': "O'quvchini o'tkazish",
    'payments': "To'lovlar",
    'financeaccounts': 'Moliya hisoblari',
    'discounts': 'Chegirmalar',
    'grants': 'Grantlar',
    'calllogs': "Qo'ng'iroqlar",
    'profile': 'Profil',
    'settings': 'Sozlamalar'
  };

  const rawTitle = pathnames.length > 0 ? pathnames[pathnames.length - 1] : '';
  const pageTitle = titleMap[rawTitle] || rawTitle.replace(/-/g, ' ');

  return (
    <header className="sticky top-0 z-30 flex h-[60px] w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-slate-500 hover:text-slate-900 transition-colors p-1"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="hidden md:flex flex-col">
          <div className="flex items-center text-[13px] text-slate-500 font-medium">
            <Link to="/" className="hover:text-slate-900 transition-colors">Bosh sahifa</Link>
            {pathnames.length > 0 && (
              <>
                <ChevronRight size={14} className="mx-1.5 text-slate-400" />
                <span className="capitalize text-slate-900">{pageTitle}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Premium Search Input */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-[13px] text-slate-500 transition-colors border border-slate-200 w-64"
        >
          <Search size={14} className="opacity-70" />
          <span className="flex-1 text-left">Qidiruv...</span>
        </button>

        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="sm:hidden p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Search size={16} />
        </button>
        
        {/* Notifications */}
        <div className="relative notif-container">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden z-50 origin-top-right"
              >
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <p className="text-[13px] font-medium text-slate-900">Bildirishnomalar</p>
                  <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">Barchasini o'qish</span>
                </div>
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                    <Bell size={16} className="text-slate-400" />
                  </div>
                  <p className="text-[13px] font-medium text-slate-700">Yangi xabarlar yo'q</p>
                  <p className="text-[12px] text-slate-500 mt-0.5">Sizda o'qilmagan bildirishnomalar mavjud emas.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-colors focus:outline-none overflow-hidden"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[11px] font-medium">{getInitials(user?.fullname)}</span>
            )}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden z-50 origin-top-right"
              >
                <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-[13px] font-medium text-slate-900">{user?.fullname || "Admin User"}</p>
                  <p className="text-[12px] text-slate-500 truncate mt-0.5">{user?.email || "admin@algoritm.uz"}</p>
                </div>
                <div className="p-1">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={14} />
                    <span>Mening profilim</span>
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings size={14} />
                    <span>Sozlamalar</span>
                  </Link>
                </div>
                <div className="p-1 border-t border-slate-100">
                  <button 
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LogOut size={14} />
                    <span>Chiqish</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
