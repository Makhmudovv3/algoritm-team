import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Shield, BookOpen, LayoutDashboard,
  DollarSign, GraduationCap, ChevronLeft, ChevronRight,
  Settings, LogOut, User, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';

const NAVIGATION = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  {
    name: 'Admin',
    icon: Shield,
    children: [
      { name: 'Lavozimlar', path: '/admin/roles' },
      { name: 'Xodimlar', path: '/admin/users' },
      { name: 'Filiallar', path: '/admin/branches' },
      { name: 'Xonalar', path: '/admin/rooms' },
      { name: "O'qituvchilar", path: '/admin/teachers' },
    ]
  },
  {
    name: "O'quv",
    icon: BookOpen,
    children: [
      { name: 'Kurslar', path: '/academic/courses' },
      { name: 'Guruhlar', path: '/academic/groups' },
      { name: 'Darslar', path: '/academic/lessons' },
      { name: 'Dars jadvali', path: '/academic/schedules' },
      { name: "O'quvchi ko'chirish", path: '/academic/student-transfer' },
    ]
  },
  {
    name: 'Moliya',
    icon: DollarSign,
    children: [
      { name: 'Moliya hisoblari', path: '/finance/finance-accounts' },
      { name: "To'lovlar", path: '/finance/payments' },
      { name: 'Chegirmalar', path: '/finance/discounts' },
      { name: 'Grantlar', path: '/finance/grants' },
      { name: "Qo'ng'iroqlar", path: '/finance/call-logs' },
    ]
  },
  {
    name: "O'quvchilar",
    icon: GraduationCap,
    children: [
      { name: "O'quvchilar", path: '/students/students' },
      { name: 'Guruhga biriktirish', path: '/students/student-groups' },
      { name: 'Davomat', path: '/students/attendance' },
      { name: 'Ota-onalar', path: '/students/parents' },
      { name: 'Reyting', path: '/students/ratings' },
    ]
  }
];

export default function Sidebar({ isOpen, isMobile, isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [expandedSections, setExpandedSections] = useState(() => {
    const active = NAVIGATION.find(item =>
      item.children?.some(c => location.pathname.startsWith(c.path))
    );
    return active ? [active.name] : [];
  });

  useEffect(() => {
    const fetchUser = async () => {
      const u = await api.Users.getById('user-1');
      setUser(u);
    };
    fetchUser();
    window.addEventListener('profileUpdated', fetchUser);
    return () => window.removeEventListener('profileUpdated', fetchUser);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleSection = (name) => {
    if (isCollapsed) { setIsCollapsed(false); return; }
    setExpandedSections(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const collapsed = !isMobile && isCollapsed;

  return (
    <motion.aside
      className="fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-100 flex flex-col"
      initial={false}
      animate={{
        width: isMobile ? (isOpen ? 248 : 0) : (collapsed ? 56 : 220),
        x: isMobile ? (isOpen ? 0 : -248) : 0
      }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-[30px] -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-sm z-50 transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      )}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col" style={{ scrollbarWidth: 'none' }}>
        {/* Logo */}
        <div className="flex h-[60px] items-center px-4 shrink-0 relative border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs shrink-0">
              A
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="text-[13px] font-semibold text-slate-900 tracking-tight whitespace-nowrap"
                >
                  Algoritm CRM
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAVIGATION.map((item) => {
            const hasChildren = !!item.children;
            const Icon = item.icon;
            const isChildActive = hasChildren && item.children.some(c => isActive(c.path));
            const isExpanded = expandedSections.includes(item.name) || isChildActive;
            const active = !hasChildren && isActive(item.path);

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-md px-2 py-2 text-[14px] transition-all duration-150',
                    active
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon size={15} className={cn('shrink-0', active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600')} />
                  {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </NavLink>
              );
            }

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleSection(item.name)}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-md px-2 py-2 text-[14px] transition-all duration-150',
                    isChildActive
                      ? 'text-slate-900 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  )}
                >
                  <Icon size={15} className={cn('shrink-0', isChildActive ? 'text-slate-600' : 'text-slate-400')} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>
                      <ChevronDown
                        size={13}
                        className={cn('text-slate-400 transition-transform duration-150', isExpanded && 'rotate-180')}
                      />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {!collapsed && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 pl-2 border-l border-slate-100 mt-0.5 space-y-0.5 mb-1">
                        {item.children.map((child) => {
                          const childActive = isActive(child.path);
                          return (
                            <NavLink
                              key={child.name}
                              to={child.path}
                              className={cn(
                                'block rounded-md px-2 py-1.5 text-[13px] transition-all duration-150',
                                childActive
                                  ? 'text-blue-700 font-medium bg-blue-50'
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                              )}
                            >
                              {child.name}
                            </NavLink>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-slate-100 shrink-0 space-y-0.5">
        {[
          { name: 'Profile', icon: User, path: '/profile' },
          { name: 'Settings', icon: Settings, path: '/admin/settings' },
        ].map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            title={collapsed ? item.name : undefined}
            className={({ isActive: a }) => cn(
              'flex items-center gap-3 rounded-md px-2 py-2 text-[14px] transition-all duration-150',
              a ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            )}
          >
            <item.icon size={15} className="shrink-0 text-slate-400" />
            {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
        <button
          className="w-full flex items-center gap-3 rounded-md px-2 py-2 text-[14px] text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={15} className="shrink-0 text-slate-400" />
          {!collapsed && <span className="whitespace-nowrap">Chiqish</span>}
        </button>

        {/* User profile pill */}
        {!collapsed && (
          <div className="mt-2 px-2 py-2.5 rounded-lg bg-slate-50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-semibold shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                getInitials(user?.fullname)
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-slate-800 truncate">{user?.fullname || "Admin User"}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@algoritm.uz"}</p>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
