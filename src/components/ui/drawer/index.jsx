import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Drawer = ({
  isOpen,
  onClose,
  children,
  side = "right",
  className,
  closeOnOutsideClick = true,
}) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const variants = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-black/40"
          onClick={handleBackdropClick}
          style={{ justifyContent: side === 'right' ? 'flex-end' : 'flex-start' }}
        >
          <motion.div
            initial={variants[side].initial}
            animate={variants[side].animate}
            exit={variants[side].exit}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative flex h-full w-full max-w-sm flex-col bg-white shadow-xl  ",
              side === 'right' ? "border-l" : "border-r",
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-md p-1 text-slate-400 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2 "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const DrawerHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 border-b border-slate-100 ", className)} {...props}>
    {children}
  </div>
);

const DrawerTitle = ({ className, children, ...props }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight text-slate-900", className)} {...props}>
    {children}
  </h2>
);

const DrawerDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-slate-500  mt-1", className)} {...props}>
    {children}
  </p>
);

const DrawerBody = ({ className, children, ...props }) => (
  <div className={cn("flex-1 overflow-y-auto p-6 premium-scrollbar", className)} {...props}>
    {children}
  </div>
);

const DrawerFooter = ({ className, children, ...props }) => (
  <div className={cn("flex items-center justify-end space-x-2 p-6 border-t border-slate-100 ", className)} {...props}>
    {children}
  </div>
);

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter };
