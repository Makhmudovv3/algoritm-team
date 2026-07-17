import React from 'react';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function GroupsFilters({ 
  isOpen,
  courseOptions,
  teacherOptions,
  roomOptions,
  courseFilter, setCourseFilter,
  teacherFilter, setTeacherFilter,
  statusFilter, setStatusFilter,
  onReset
}) {
  const statusOptions = [
    { label: "Barcha holatlar", value: "all" },
    { label: "Faol", value: "true" },
    { label: "Nofaol", value: "false" }
  ];

  const hasActiveFilters = courseFilter !== '' || teacherFilter !== '' || statusFilter !== '';

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0, marginBottom: 0, overflow: 'hidden' }}
          animate={{ height: 'auto', opacity: 1, marginBottom: 24, transitionEnd: { overflow: 'visible' } }}
          exit={{ height: 0, opacity: 0, marginBottom: 0, overflow: 'hidden' }}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 p-4 bg-slate-50  border border-slate-200  rounded-lg">
            <div className="w-full sm:w-64">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Kurs</label>
              <Select 
                options={[{ label: "Barcha kurslar", value: "all" }, ...courseOptions]} 
                value={courseFilter || "all"} 
                onChange={(val) => setCourseFilter(val === 'all' ? '' : val)} 
              />
            </div>
            <div className="w-full sm:w-64">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">O'qituvchi</label>
              <Select 
                options={[{ label: "Barcha o'qituvchilar", value: "all" }, ...teacherOptions]} 
                value={teacherFilter || "all"} 
                onChange={(val) => setTeacherFilter(val === 'all' ? '' : val)} 
              />
            </div>
            <div className="w-full sm:w-48">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Holat</label>
              <Select 
                options={statusOptions} 
                value={statusFilter || "all"} 
                onChange={(val) => setStatusFilter(val === 'all' ? '' : val)} 
              />
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-end ml-auto">
                <Button variant="ghost" size="sm" onClick={onReset} className="text-slate-500 hover:text-slate-900 ">
                  <X className="mr-1.5 h-3.5 w-3.5" /> Filtrni tozalash
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
