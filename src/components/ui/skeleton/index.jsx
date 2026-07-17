import React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-100 ", className)}
      {...props}
    />
  )
}

function CardSkeleton({ className }) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm  ", className)}>
      <Skeleton className="h-5 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  )
}

function TableRowSkeleton({ className }) {
  return (
    <div className={cn("flex items-center space-x-4 border-b border-slate-100 p-4 ", className)}>
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-[30%]" />
      <Skeleton className="h-4 w-[20%]" />
      <Skeleton className="h-4 w-[20%]" />
      <div className="flex-1 flex justify-end">
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

function ProfileSkeleton({ className }) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  )
}

export { Skeleton, CardSkeleton, TableRowSkeleton, ProfileSkeleton }
