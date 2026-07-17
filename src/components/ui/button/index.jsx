import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white",
        secondary:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:text-slate-400",
        link:
          "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
        danger:
          "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 dark:border-red-500/20",
      },
      size: {
        default: "h-8 px-3.5 py-1.5",
        sm:      "h-7 px-2.5 text-[12px]",
        lg:      "h-9 px-5",
        icon:    "h-8 w-8",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {children}
    </Comp>
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
