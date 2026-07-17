import React from 'react';
import { Info } from 'lucide-react';

export default function AlertModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all p-6" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Info size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title || "Diqqat"}</h3>
          <p className="text-gray-500 mb-6">{message}</p>
          
          <div className="flex w-full">
            <button 
              onClick={onClose} 
              className="w-full px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Tushundim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
