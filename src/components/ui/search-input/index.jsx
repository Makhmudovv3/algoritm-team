import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

const SearchInput = React.forwardRef(({ 
  className, 
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  shortcut = "⌘K",
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Combine refs
  const handleRef = (e) => {
    inputRef.current = e;
    if (typeof ref === 'function') {
      ref(e);
    } else if (ref) {
      ref.current = e;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    if (onClear) onClear();
    else if (onChange) onChange({ target: { value: '' } });
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative flex items-center w-full max-w-sm", className)}>
      <Search className="absolute left-3 h-4 w-4 text-slate-400 shrink-0 pointer-events-none" />
      
      <input
        ref={handleRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "flex h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-14 py-1 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 hover:border-slate-300     "
        )}
        {...props}
      />

      <div className="absolute right-2 flex items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md p-1 hover:bg-slate-100 text-slate-500  focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {shortcut && !value && !isFocused && (
          <div className="pointer-events-none hidden sm:flex h-5 select-none items-center gap-1 rounded border bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500   ">
            {shortcut}
          </div>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
