import React, { useState, useRef, useEffect, useId } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
];

const DAYS = ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan", "Yak"];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert to Monday-start (0 = Mon, 6 = Sun)
};

const CustomSelect = ({ value, options, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const selectedOption = options.find(o => String(o.value) === String(value));

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button 
        type="button"
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex w-full items-center justify-between text-[13px] font-medium bg-transparent hover:bg-slate-100 px-2 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="truncate mr-1">{selectedOption?.label}</span>
        <ChevronDown className={cn("h-3 w-3 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-[120px] max-h-[200px] overflow-auto premium-scrollbar bg-white border border-slate-200 rounded-md shadow-lg z-[60]"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map(opt => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={cn(
                  "px-3 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50 transition-colors text-left",
                  String(value) === String(opt.value) && "bg-blue-50 text-blue-600 font-medium"
                )}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function DatePicker({
  value,
  onChange,
  label,
  error,
  required,
  minDate,
  maxDate = new Date(), // Default max date is today
  className,
  id
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  // Internal state for the calendar view
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      return isNaN(d) ? new Date() : d;
    }
    return new Date();
  });

  const pickerId = id || useId();
  const hasError = !!error;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Sync viewDate when opening with existing value
  useEffect(() => {
    if (isOpen && value) {
      const d = new Date(value);
      if (!isNaN(d)) setViewDate(d);
    }
  }, [isOpen, value]);

  const handleSelectDate = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    // Format to YYYY-MM-DD
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleMonthChange = (e) => {
    setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value, 10), 1));
  };

  const handleYearChange = (e) => {
    setViewDate(new Date(parseInt(e.target.value, 10), viewDate.getMonth(), 1));
  };

  // Generate calendar grid
  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  // Years array (last 100 years up to maxDate year)
  const currentYear = maxDate.getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Format display value
  const displayValue = React.useMemo(() => {
    if (!value) return "Sana tanlang...";
    const d = new Date(value);
    if (isNaN(d)) return "Noto'g'ri sana";
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}.${d.getFullYear()}`;
  }, [value]);

  const isDateDisabled = (day) => {
    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    checkDate.setHours(0,0,0,0);
    
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(0,0,0,0);
      if (checkDate > max) return true;
    }
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0,0,0,0);
      if (checkDate < min) return true;
    }
    return false;
  };

  const isSelected = (day) => {
    if (!value) return false;
    const valDate = new Date(value);
    return !isNaN(valDate) && 
           valDate.getDate() === day && 
           valDate.getMonth() === viewDate.getMonth() && 
           valDate.getFullYear() === viewDate.getFullYear();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full space-y-1" ref={containerRef}>
      {label && (
        <label htmlFor={pickerId} className="block text-[12px] font-medium text-slate-600">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={pickerId}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={cn(
            "flex h-8 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
            hasError ? "border-red-400 focus-visible:ring-red-400/20" : "hover:border-slate-300",
            className
          )}
        >
          <span className={cn("truncate", !value && "text-slate-400")}>{displayValue}</span>
          <CalendarIcon className="h-4 w-4 text-slate-400 shrink-0" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1 p-3 w-[280px] rounded-lg border border-slate-200 bg-white shadow-xl outline-none"
              role="dialog"
              aria-label="Sanani tanlang"
            >
              <div className="flex items-center justify-between mb-4 gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
                  aria-label="Oldingi oy"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-1 flex-1">
                  <CustomSelect
                    value={viewDate.getMonth()}
                    onChange={(val) => handleMonthChange({ target: { value: val } })}
                    options={MONTHS.map((m, i) => ({ label: m, value: i }))}
                    className="flex-1"
                  />
                  <CustomSelect
                    value={viewDate.getFullYear()}
                    onChange={(val) => handleYearChange({ target: { value: val } })}
                    options={years.map(y => ({ label: y, value: y }))}
                    className="w-[84px]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
                  aria-label="Keyingi oy"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                {DAYS.map(d => (
                  <div key={d} className="text-[11px] font-medium text-slate-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {blanks.map(b => (
                  <div key={`blank-${b}`} className="h-7" />
                ))}
                {days.map(day => {
                  const disabled = isDateDisabled(day);
                  const selected = isSelected(day);
                  const today = new Date();
                  const isToday = day === today.getDate() && 
                                  viewDate.getMonth() === today.getMonth() && 
                                  viewDate.getFullYear() === today.getFullYear();

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelectDate(day)}
                      aria-label={`${day}-${MONTHS[viewDate.getMonth()]}-${viewDate.getFullYear()}`}
                      aria-selected={selected}
                      className={cn(
                        "h-7 w-full flex items-center justify-center text-[13px] rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        disabled ? "text-slate-300 cursor-not-allowed" : "hover:bg-slate-100 text-slate-700 cursor-pointer",
                        isToday && !selected && "font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-100",
                        selected && "bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {typeof error === 'string' && (
        <p className="text-[11px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
