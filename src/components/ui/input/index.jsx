import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

const Input = React.forwardRef(({
  className,
  type,
  label,
  error,
  prefix,
  suffix,
  id,
  required,
  ...props
}, ref) => {
  const inputId = id || React.useId();
  const hasError = !!error;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-[12px] font-medium text-slate-600">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-2.5 flex items-center text-slate-400 pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            "hover:border-slate-300",
            hasError ? "border-red-400 focus:ring-red-400/20 focus:border-red-400" : "",
            prefix ? "pl-8" : "",
            suffix ? "pr-8" : "",
            className
          )}
          ref={ref}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {suffix && (
          <div className="absolute right-2.5 flex items-center text-slate-400 pointer-events-none">
            {suffix}
          </div>
        )}
        {hasError && !suffix && (
          <div className="absolute right-2.5 flex items-center">
            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
          </div>
        )}
      </div>
      {typeof error === 'string' && (
        <p id={`${inputId}-error`} className="text-[11px] text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
