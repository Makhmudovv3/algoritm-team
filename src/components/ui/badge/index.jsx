import React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 text-slate-600 border border-slate-200",
        neutral:
          "bg-slate-100 text-slate-600 border border-slate-200",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200",
        danger:
          "bg-red-50 text-red-600 border border-red-200",
        info:
          "bg-blue-50 text-blue-700 border border-blue-200",
        outline:
          "bg-transparent text-slate-600 border border-slate-200",
        purple:
          "bg-violet-50 text-violet-700 border border-violet-200",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }
