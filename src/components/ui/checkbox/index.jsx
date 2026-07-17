import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef(({ className, id, label, description, ...props }, ref) => {
  const checkboxId = id || React.useId();

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            "peer h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-slate-300 bg-white transition-colors",
            "checked:border-blue-600 checked:bg-blue-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "    ",
            className
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
      </div>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-[13px] font-medium leading-none text-slate-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[13px] text-slate-500 ">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
