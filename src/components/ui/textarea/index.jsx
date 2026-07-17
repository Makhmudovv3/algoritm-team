import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Textarea = React.forwardRef(({ 
  className, 
  label,
  error,
  success,
  id,
  ...props 
}, ref) => {
  const textareaId = id || React.useId();
  const errorId = `${textareaId}-error`;
  const hasError = !!error;
  
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="text-[13px] font-medium text-slate-700 "
        >
          {label}
        </label>
      )}
      <div className="relative flex">
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50     premium-scrollbar",
            hasError 
              ? "border-red-500 focus-visible:ring-red-500/50" 
              : success
                ? "border-green-500 focus-visible:ring-green-500/50"
                : "focus-visible:border-blue-600 focus-visible:ring-blue-600/50 hover:border-slate-300 ",
            (hasError || success) ? "pr-10" : "",
            className
          )}
          ref={ref}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
          {...props}
        />

        <div className="absolute right-3 top-3 flex items-center justify-center shrink-0">
          {hasError && <AlertCircle className="h-4 w-4 text-red-500" />}
          {success && !hasError && <CheckCircle2 className="h-4 w-4 text-green-500" />}
        </div>
      </div>
      {typeof error === 'string' && (
        <p id={errorId} className="text-[13px] font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
