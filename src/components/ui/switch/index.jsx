import React from 'react';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef(({ className, id, label, description, ...props }, ref) => {
  const switchId = id || React.useId();

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={switchId}
          ref={ref}
          role="switch"
          className={cn(
            "peer h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out",
            "checked:bg-blue-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "  ",
            className
          )}
          {...props}
        />
        <div className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
      </div>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={switchId}
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
Switch.displayName = "Switch";

export { Switch };
