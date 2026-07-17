import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Search, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Select = React.forwardRef(({
  className,
  value,
  onChange,
  options = [],
  placeholder = "Tanlang...",
  disabled = false,
  error = false,
  isLoading = false,
  searchable = false,
  id,
  label,
  required,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  const selectId = id || React.useId();
  const hasError = !!error;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleToggle = () => {
    if (disabled || isLoading) return;
    setIsOpen(!isOpen);
    setSearchQuery("");
  };

  const handleSelect = (optionValue) => {
    onChange && onChange(optionValue);
    setIsOpen(false);
  };

  const filteredOptions = searchable 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const selectedOption = options.find(opt => String(opt.value) === String(value));

  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <label htmlFor={selectId} className="block text-[12px] font-medium text-slate-600">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative w-full" ref={containerRef}>
        <button
          ref={ref}
          type="button"
          id={selectId}
          disabled={disabled || isLoading}
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={hasError}
          className={cn(
            "flex h-8 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50",
            hasError 
              ? "border-red-400 focus-visible:ring-red-400/20 focus:border-red-400" 
              : "hover:border-slate-300"
          )}
          {...props}
        >
          <span className={cn("truncate", !selectedOption && "text-slate-400")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {isLoading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-500" />
        ) : (
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200", isOpen && "rotate-180")} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg  "
          >
            {searchable && (
              <div className="flex items-center border-b border-slate-100 px-3 py-2 ">
                <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex w-full bg-transparent text-sm outline-none placeholder:text-slate-400 "
                  autoFocus
                />
              </div>
            )}
            <ul
              role="listbox"
              className="max-h-[200px] overflow-auto premium-scrollbar p-1"
            >
              {filteredOptions.length === 0 ? (
                <li className="py-6 text-center text-sm text-slate-500">No results found.</li>
              ) : (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={String(value) === String(option.value)}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 ",
                      String(value) === String(option.value) ? "bg-slate-50 font-medium text-blue-600  " : "text-slate-700 "
                    )}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {String(value) === String(option.value) && <Check className="h-4 w-4" />}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {typeof error === 'string' && (
        <p className="text-[13px] font-medium text-red-500 mt-1">{error}</p>
      )}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
