import React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }) => {
  return <>{children}</>
}

const Tooltip = ({ children, delayDuration = 200, ...props }) => {
  return (
    <div className="group relative inline-flex" {...props}>
      {children}
    </div>
  )
}

const TooltipTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      ...props,
      className: cn(children.props.className, className),
    })
  }
  return (
    <button type="button" ref={ref} className={className} {...props}>
      {children}
    </button>
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef(({ className, side = "top", children, ...props }, ref) => {
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div
      ref={ref}
      role="tooltip"
      className={cn(
        "pointer-events-none absolute z-50 overflow-hidden rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-50 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100  ",
        sideClasses[side],
        "scale-95 group-hover:scale-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
