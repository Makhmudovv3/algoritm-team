import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/CustomSelect';

export default function TeacherFormModal({ isOpen, onClose, isEditing, formData, setFormData, userOptions, branchOptions, statusOptions, onSave }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Tahrirlash" : "O'qituvchi Qo'shish"}>
      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Xodim (User)</label>
          <CustomSelect options={userOptions} value={formData.user_id} onChange={val => setFormData({...formData, user_id: val})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Filial</label>
          <CustomSelect options={branchOptions} value={formData.branch_id} onChange={val => setFormData({...formData, branch_id: val})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Maosh (Har bir talaba uchun UZS)</label>
          <Input required type="number" min="0" value={formData.salary_per_student} onChange={e => setFormData({...formData, salary_per_student: e.target.value})} placeholder="Masalan: 150000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Status</label>
          <CustomSelect options={statusOptions} value={formData.is_active} onChange={val => setFormData({...formData, is_active: val})} />
        </div>
        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="w-full" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" className="w-full">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
