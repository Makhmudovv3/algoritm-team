import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/CustomSelect';

export default function RoomFormModal({ 
  isOpen, 
  onClose, 
  editingId, 
  formData, 
  setFormData, 
  branchOptions, 
  handleSave 
}) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={editingId ? 'Xonani Tahrirlash' : "Yangi Xona Qo'shish"}
    >
      <form onSubmit={handleSave} className="space-y-4 mt-2">
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1.5">Xona nomi</label>
          <Input 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="Masalan: Frontend xonasi" 
            className="rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1.5">Filial</label>
          <CustomSelect 
            options={branchOptions} 
            value={formData.branch_id} 
            onChange={val => setFormData({...formData, branch_id: val})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1.5">Sig'imi (O'quvchilar soni)</label>
          <Input 
            required 
            type="number" 
            min="1" 
            value={formData.capacity} 
            onChange={e => setFormData({...formData, capacity: e.target.value})} 
            placeholder="20" 
            className="rounded-xl"
          />
        </div>
        <div className="pt-5 flex gap-3">
          <Button type="button" variant="outline" className="w-full rounded-xl" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
