import React from "react"
import { cn } from "@/lib/utils"

const EmptyState = React.forwardRef(({ 
  className, 
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center  ",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500  ">
          <Icon className="h-6 w-6" />
        </div>
      )}
      
      {title && (
        <h3 className="mb-1.5 text-base font-semibold text-slate-900 ">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="mb-6 max-w-sm text-sm text-slate-500 ">
          {description}
        </p>
      )}
      
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  )
})
EmptyState.displayName = "EmptyState"

export { EmptyState }
