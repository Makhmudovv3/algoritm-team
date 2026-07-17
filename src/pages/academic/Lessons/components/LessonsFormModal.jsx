import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/CustomSelect';

export default function LessonsFormModal({ isOpen, onClose, onSave, formData, setFormData, groupOptions, statusOptions, editingId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingId ? 'Darsni Tahrirlash' : "Yangi Dars Qo'shish"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Guruh</label>
          <CustomSelect 
            options={groupOptions} 
            value={formData.group_id} 
            onChange={val => setFormData({...formData, group_id: val})} 
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Dars sanasi</label>
          <Input 
            required 
            type="date" 
            value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})} 
            className="h-8 text-[13px] shadow-sm"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Mavzu</label>
          <Input 
            required 
            value={formData.topic} 
            onChange={e => setFormData({...formData, topic: e.target.value})} 
            placeholder="Masalan: React Hooks" 
            className="h-8 text-[13px] shadow-sm"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Status</label>
          <CustomSelect 
            options={statusOptions} 
            value={formData.status} 
            onChange={val => setFormData({...formData, status: val})} 
          />
        </div>
        <div className="pt-2 flex gap-2">
          <Button type="button" variant="outline" className="w-full h-8 text-[13px] bg-white border-slate-200" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" className="w-full h-8 text-[13px] bg-blue-600 hover:bg-blue-700 text-white">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
