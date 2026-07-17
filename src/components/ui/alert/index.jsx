import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 flex gap-3 text-[13px] leading-relaxed",
  {
    variants: {
      variant: {
        info: "border-blue-200/50 bg-blue-50/50 text-blue-900   ",
        success: "border-green-200/50 bg-green-50/50 text-green-900   ",
        warning: "border-orange-200/50 bg-orange-50/50 text-orange-900   ",
        error: "border-red-200/50 bg-red-50/50 text-red-900   ",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

const Alert = React.forwardRef(({ className, variant, title, children, ...props }, ref) => {
  const Icon = icons[variant || "info"]
  
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0 opacity-80 mt-0.5" />
      <div className="flex flex-col gap-1">
        {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
        {children && <div className="opacity-90">{children}</div>}
      </div>
    </div>
  )
})
Alert.displayName = "Alert"

export { Alert, alertVariants }
