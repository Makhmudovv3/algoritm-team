import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all p-6" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title || "Tasdiqlang"}</h3>
          <p className="text-gray-500 mb-6">{message || "Haqiqatan ham bu amalni bajarmoxchimisiz?"}</p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Bekor qilish
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }} 
              className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Ha, o'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
