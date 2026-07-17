import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm w-full h-full min-h-screen"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[100] p-4 sm:p-6 pointer-events-none overflow-y-auto">
            <div className="min-h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, type: "spring", bounce: 0.25 }}
                className={`bg-card text-card-foreground w-full ${maxWidth} rounded-[var(--radius-lg)] shadow-[var(--shadow-premium-dark)] border flex flex-col pointer-events-auto m-auto relative`}
              >
                <div className="flex justify-between items-center px-6 py-4 border-b border-border/50">
                  <h2 className="text-lg font-semibold text-slate-900 tracking-tight">{title}</h2>
                  <button 
                    type="button"
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-6">
                  {children}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
