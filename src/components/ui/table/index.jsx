import React from "react"
import { cn } from "@/lib/utils"

/* ── Table wrapper ── */
const Table = React.forwardRef(({ className, wrapperClassName, ...props }, ref) => (
  <div className={cn("relative w-full overflow-auto", wrapperClassName)}>
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-[13px]", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/* ── Sticky thead ── */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("sticky top-0 z-10 bg-slate-50 border-b border-slate-200", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0 divide-y divide-slate-100", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-slate-100 bg-slate-50 text-[13px] font-medium", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/* ── Row: compact, hover-bg ── */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "group transition-colors duration-100 hover:bg-slate-50 data-[state=selected]:bg-blue-50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/* ── Column headers: 11px uppercase ── */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-8 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/* ── Cells: compact py-2.5 ── */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-3 py-2 align-middle text-slate-700 [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-[13px] text-slate-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
