import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/CustomSelect';
import CustomDatePicker from '@/components/ui/date-picker';

export default function PaymentModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSave,
  studentOptions,
  accountOptions
}) {
  const typeOptions = [
    { label: 'Naqd', value: 'cash' },
    { label: 'Plastik', value: 'card' },
    { label: 'Bank', value: 'bank' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="To'lov Qabul Qilish">
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">O'quvchi</label>
          <CustomSelect 
            options={studentOptions} 
            value={formData.student_id} 
            onChange={val => setFormData({...formData, student_id: val})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">Summa (UZS)</label>
          <Input 
            required 
            type="number" 
            min="0" 
            value={formData.sum} 
            onChange={e => setFormData({...formData, sum: e.target.value})} 
            placeholder="Masalan: 500000" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">To'lov turi</label>
            <CustomSelect 
              options={typeOptions} 
              value={formData.type} 
              onChange={val => setFormData({...formData, type: val})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Kassa / Hisob</label>
            <CustomSelect 
              options={accountOptions} 
              value={formData.finance_account_id} 
              onChange={val => setFormData({...formData, finance_account_id: val})} 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700  mb-1">To'lov sanasi</label>
          <CustomDatePicker 
            required 
            value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})} 
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
