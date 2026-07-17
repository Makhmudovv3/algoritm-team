import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'chirishni tasdiqlaysizmi?">
      <div className="space-y-4">
        <p className="text-slate-600 ">
          Rostdan ham ushbu filialni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi va barcha tegishli ma'lumotlar yo'qotilishi mumkin.
        </p>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="w-full" onClick={onClose}>Bekor qilish</Button>
          <Button variant="destructive" className="w-full" onClick={onConfirm}>O'chirish</Button>
        </div>
      </div>
    </Modal>
  );
}
