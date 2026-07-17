import React from 'react';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StudentsFilters({ 
  isOpen,
  branchOptions, 
  branchFilter, 
  setBranchFilter,
  statusFilter,
  setStatusFilter,
  groupOptions,
  groupFilter,
  setGroupFilter,
  onReset
}) {
  const statusOptions = [
    { label: "Barcha holatlar", value: "all" },
    { label: "Faol", value: "true" },
    { label: "Nofaol", value: "false" }
  ];

  const hasActiveFilters = branchFilter !== '' || statusFilter !== '' || groupFilter !== '';

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0, marginBottom: 0 }}
          animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
          exit={{ height: 0, opacity: 0, marginBottom: 0 }}
          style={{ overflow: isOpen ? 'visible' : 'hidden' }}
          className="relative z-20"
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 p-4 bg-slate-50  border border-slate-200  rounded-lg">
            <div className="w-full sm:w-64">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Filial</label>
              <Select 
                options={[{ label: "Barcha filiallar", value: "all" }, ...branchOptions]} 
                value={branchFilter || "all"} 
                onChange={(val) => setBranchFilter(val === 'all' ? '' : val)} 
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
            <div className="w-full sm:w-64 hidden md:block">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Guruh</label>
              <Select 
                options={[{ label: "Barcha guruhlar", value: "all" }, ...(groupOptions || [])]} 
                value={groupFilter || "all"}
                onChange={(val) => setGroupFilter(val === 'all' ? '' : val)} 
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
