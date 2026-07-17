import React from 'react';
import { cn } from '@/lib/utils';

const Spinner = React.forwardRef(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
    xl: 'h-12 w-12 border-4',
  };

  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-slate-200 border-t-slate-800  ",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

Spinner.displayName = "Spinner";

export { Spinner };
