import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function StudentDeleteDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'chirishni tasdiqlaysizmi?" maxWidth="max-w-md">
      <div className="space-y-6 pt-2">
        <div className="flex items-start gap-4 p-4 bg-red-50  rounded-lg border border-red-100 ">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-900  mb-1">Diqqat!</h4>
            <p className="text-sm text-red-700/90  leading-relaxed">
              Siz ushbu o'quvchini butunlay o'chirib tashlamoqchisiz. Uning barcha tarixiy ma'lumotlari, davomati va to'lovlari arxivlanishi mumkin. Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 pt-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button variant="danger" onClick={onConfirm}>Ha, o'chirilsin</Button>
        </div>
      </div>
    </Modal>
  );
}
