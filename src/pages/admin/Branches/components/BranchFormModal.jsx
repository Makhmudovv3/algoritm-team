import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BranchFormModal({ isOpen, onClose, formData, setFormData, onSave, editingId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingId ? 'Filialni Tahrirlash' : "Yangi Filial Qo'shish"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Filial nomi</label>
          <Input 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="Masalan: Chilonzor filiali" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Manzil</label>
          <Input 
            required 
            value={formData.address} 
            onChange={e => setFormData({...formData, address: e.target.value})} 
            placeholder="Masalan: Qatortol ko'chasi" 
          />
        </div>
        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="w-full" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" className="w-full">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
