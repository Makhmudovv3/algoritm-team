import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Ha, o'chirish", confirmColor = "bg-red-600 hover:bg-red-700" }) {
  if (!isOpen) return null;

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-[20px] shadow-2xl w-full max-w-[360px] overflow-hidden relative z-10"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} />
              onClick={() => {
                onConfirm();
                onClose();
              }} 
              className={`flex-1 px-4 py-2.5 text-white ${confirmColor} rounded-xl font-semibold transition-colors shadow-sm cursor-pointer`}
            >
              {confirmText}
            </button>
            
            <div className="flex flex-col items-center text-center p-6 pt-8">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50/50">
                <Trash2 size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-[19px] font-bold text-slate-900 mb-2">{title || "O'chirishni tasdiqlaysizmi?"}</h3>
              <p className="text-[14px] text-slate-500 mb-8 px-2 leading-relaxed">
                {message || "Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."}
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={onClose} 
                  className="flex-1 h-11 text-[14px] text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }} 
                  className="flex-1 h-11 text-[14px] text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl font-semibold transition-all shadow-sm shadow-red-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {confirmText || "Ha o'chirish"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
