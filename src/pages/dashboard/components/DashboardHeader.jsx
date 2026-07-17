import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Calendar, ChevronDown, Check } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardHeader({ onExport, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Shu oy');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const date = new Date();
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
  const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const today = `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}-yil, ${days[date.getDay()]}`;

  const ranges = ['Bugun', 'Shu hafta', 'Shu oy', 'Shu yil', 'Barcha muddat'];

  const handleSelect = (range) => {
    setSelectedRange(range);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(range);
    }
  };

  return (
    <PageHeader
      title="Umumiy ko'rinish"
      description={today}
      actions={
        <>
          <div className="relative" ref={dropdownRef}>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-slate-600 hidden sm:flex gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{selectedRange}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-50 ml-1" />
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 origin-top-right"
                >
                  {ranges.map((range) => (
                    <button
                      key={range}
                      onClick={() => handleSelect(range)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className={selectedRange === range ? 'font-medium text-blue-600' : ''}>
                        {range}
                      </span>
                      {selectedRange === range && (
                        <Check className="h-3.5 w-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Eksport
          </Button>
        </>
      }
    />
  );
}
