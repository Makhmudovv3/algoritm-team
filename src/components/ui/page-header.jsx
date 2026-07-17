/**
 * ATTIO DESIGN SYSTEM — Shared Page Components
 *
 * Every module must use these components. Never create one-off headers.
 *
 * Usage:
 *   <PageHeader title="Students" description="..." actions={<Button>...</Button>} />
 *   <SearchBar value={q} onChange={setQ} placeholder="Search..." />
 *   <SectionCard title="Overview">...</SectionCard>
 *   <StatCard label="Total" value={42} icon={Users} />
 *   <EmptyTableState onReset={fn} />
 *   <TableLoadingSkeleton cols={5} rows={6} />
 */

import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/* ── PAGE HEADER ── used at top of every module page */
export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6", className)}>
      <div>
        <h1 className="text-[17px] font-semibold text-slate-900 leading-tight">{title}</h1>
        {description && (
          <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

/* ── SEARCH BAR ── standard search input for all toolbars */
export function SearchBar({ value, onChange, placeholder = 'Search...', className }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-8 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-150 hover:border-slate-300"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* ── SECTION CARD ── white card with title + optional action */
export function SectionCard({ title, description, action, children, className, noPad }) {
  return (
    <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div>
            <p className="text-[13px] font-semibold text-slate-900">{title}</p>
            {description && <p className="text-[12px] text-slate-400 mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={noPad ? '' : 'p-5'}>{children}</div>
    </div>
  );
}

/* ── STAT CARD ── compact KPI / metric card */
export function StatCard({ label, value, icon: Icon, trend, trendUp, suffix, className }) {
  return (
    <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-slate-400" />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-[22px] font-semibold text-slate-900 leading-none">{value}</span>
        {suffix && <span className="text-[12px] text-slate-400 mb-0.5">{suffix}</span>}
      </div>
      {trend && (
        <p className={cn("text-[11px] mt-1.5 font-medium", trendUp ? 'text-emerald-600' : 'text-red-500')}>
          {trend}
        </p>
      )}
    </div>
  );
}

/* ── TABLE WRAPPER ── standard bordered table container */
export function TableContainer({ children, className }) {
  return (
    <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
}

/* ── EMPTY TABLE STATE ── standard empty state for all tables */
export function EmptyTableState({ title = "Ma'lumot topilmadi", description = "Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring.", onReset, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon ? (
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
      )}
      <p className="text-[13px] font-medium text-slate-600">{title}</p>
      <p className="text-[12px] text-slate-400 mt-1 max-w-[260px]">{description}</p>
      {onReset && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
          Filtrlarni tozalash
        </Button>
      )}
    </div>
  );
}

/* ── TABLE LOADING SKELETON ── standard loading state for all tables */
export function TableLoadingSkeleton({ cols = 5, rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-slate-100">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-3 py-2.5">
              <div
                className="h-4 rounded bg-slate-100 animate-pulse"
                style={{ width: c === 0 ? '80%' : c === 1 ? '60%' : '70%' }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* ── TOOLBAR ── standard toolbar with search + actions */
export function Toolbar({ left, right, className }) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-4", className)}>
      <div className="flex items-center gap-2 w-full sm:w-auto">{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}

/* ── DRAWER HEADER ── standard header for all drawers */
export function DrawerHeader({ title, subtitle, onClose, actions }) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-slate-100 shrink-0">
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-[12px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-1.5 ml-4">
        {actions}
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-150"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ── AVATAR INITIALS ── consistent avatar across all modules */
export function AvatarInitials({ name = '', size = 'md', className }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-violet-100 text-violet-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-sky-100 text-sky-700',
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-8 h-8 text-[12px]',
    lg: 'w-10 h-10 text-[14px]',
    xl: 'w-14 h-14 text-[18px]',
  };

  return (
    <div className={cn("rounded-full flex items-center justify-center font-medium flex-shrink-0", sizes[size] || sizes.md, colors[colorIdx], className)}>
      {initials || '?'}
    </div>
  );
}
