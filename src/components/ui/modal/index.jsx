import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className,
  closeOnOutsideClick = true,
  isLoading = false
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isLoading]);

  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && !isLoading && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg  ",
              className
            )}
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm ">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}
            {children}
            
            {!isLoading && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-md p-1 text-slate-400 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2 "
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ModalHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} {...props}>
    {children}
  </div>
);

const ModalTitle = ({ className, children, ...props }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h2>
);

const ModalDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-slate-500 ", className)} {...props}>
    {children}
  </p>
);

const ModalBody = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-2", className)} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div className={cn("flex items-center justify-end space-x-2 p-6 pt-4", className)} {...props}>
    {children}
  </div>
);

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter };
