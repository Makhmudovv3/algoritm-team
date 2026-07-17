import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-slate-200  bg-slate-100  text-slate-600  items-center justify-center font-semibold",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Avatar = React.forwardRef(({ className, size, src, alt, initials, ...props }, ref) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User className={cn(
          size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'
        )} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
