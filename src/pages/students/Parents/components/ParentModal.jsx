import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

export function ParentModal({ isOpen, onClose, onSave, formData, setFormData, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('998')) {
      val = val.substring(3);
    }
    
    let formatted = '+998 ';
    if (val.length > 0) formatted += val.substring(0, 2);
    if (val.length > 2) formatted += ' ' + val.substring(2, 5);
    if (val.length > 5) formatted += ' ' + val.substring(5, 7);
    if (val.length > 7) formatted += ' ' + val.substring(7, 9);
    
    setFormData({ ...formData, phone: formatted });
  };

  const handlePhone2Change = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('998')) {
      val = val.substring(3);
    }
    
    let formatted = '+998 ';
    if (val.length > 0) formatted += val.substring(0, 2);
    if (val.length > 2) formatted += ' ' + val.substring(2, 5);
    if (val.length > 5) formatted += ' ' + val.substring(5, 7);
    if (val.length > 7) formatted += ' ' + val.substring(7, 9);
    
    setFormData({ ...formData, phone2: formatted });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? 'Ota-onani Tahrirlash' : "Yangi Ota-ona Qo'shish"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* General Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900 ">Umumiy ma'lumotlar</h4>
            <p className="text-xs text-slate-500 mt-1">Ota-onaning shaxsiy va aloqa ma'lumotlari.</p>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Ism va Familiya <span className="text-red-500">*</span></label>
              <Input 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Masalan: Valiyev Ali" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Telefon Raqami <span className="text-red-500">*</span></label>
              <Input 
                required 
                value={formData.phone} 
                onChange={handlePhoneChange} 
                placeholder="+998" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qo'shimcha Telefon Raqami (ixtiyoriy)</label>
              <Input 
                value={formData.phone2 || ''} 
                onChange={handlePhone2Change} 
                placeholder="+998" 
              />
            </div>
            <div>
              <Select 
                label="Qarindoshlik darajasi" 
                placeholder="Tanlang" 
                options={[
                  { label: 'Ota', value: 'Ota' },
                  { label: 'Ona', value: 'Ona' },
                  { label: 'Aka/Uka', value: 'Aka/Uka' },
                  { label: 'Opa/Singil', value: 'Opa/Singil' },
                  { label: 'Boshqa', value: 'Boshqa' }
                ]} 
                value={formData.relation || 'Ota'}
                onChange={val => setFormData({ ...formData, relation: val })}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100  flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
