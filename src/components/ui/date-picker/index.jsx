import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

registerLocale('uz', uz);

export default function CustomDatePicker({ 
  value, 
  onChange, 
  placeholder = "Sana tanlang", 
  required = false,
  className,
  ...props 
}) {
  // Convert string (YYYY-MM-DD) to Date object for DatePicker
  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date) => {
    // Convert Date object back to string (YYYY-MM-DD)
    if (date) {
      const formatted = format(date, 'yyyy-MM-dd');
      onChange({ target: { value: formatted } });
    } else {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder}
        required={required}
        locale="uz"
        className={cn(
          "flex h-[36px] w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        wrapperClassName="w-full"
        showPopperArrow={false}
        {...props}
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
