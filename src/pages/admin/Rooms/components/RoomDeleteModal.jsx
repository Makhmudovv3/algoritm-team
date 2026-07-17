import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

export default function RoomDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'chirishni tasdiqlaysizmi?">
      <div className="space-y-4 mt-2">
        <p className="text-sm text-slate-600 ">
          Rostdan ham ushbu xonani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi va xonaga biriktirilgan barcha dars jadvallari ham o'chib ketishi mumkin.
        </p>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="w-full rounded-xl" onClick={onClose}>Bekor qilish</Button>
          <Button variant="destructive" className="w-full rounded-xl" onClick={onConfirm}>O'chirish</Button>
        </div>
      </div>
    </Modal>
  );
}
