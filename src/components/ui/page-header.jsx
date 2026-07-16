import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function PageHeader({ title, description, children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4", className)}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </motion.div>
  );
}
