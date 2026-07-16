import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title = "Tasdiqlaysizmi?", description = "Haqiqatan ham bu amalni bajarmoqchimisiz?", confirmText = "Tasdiqlash" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4">
            <HelpCircle className="text-blue-600" size={24} />
          </div>
          
          <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            {description}
          </p>

          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
