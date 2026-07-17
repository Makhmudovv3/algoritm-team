import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

export function StudentFormModal({
  isOpen, onClose, editingId,
  formData, setFormData, handleSave,
  branchOptions, parentOptions
}) {
  const statusOptions = [
    { label: 'Faol', value: 'true' },
    { label: 'Nofaol', value: 'false' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingId ? "O'quvchini Tahrirlash" : "Yangi O'quvchi"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSave} className="divide-y divide-slate-100">
        {/* General */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Umumiy ma'lumot</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="F.I.SH"
                required
                value={formData.fullname}
                onChange={e => setFormData({ ...formData, fullname: e.target.value })}
                placeholder="Aliyev Vali Sobirovich"
              />
            </div>
            <Input 
              label="Tug'ilgan sana" 
              type="date" 
              value={formData.birthday || ''}
              onChange={e => setFormData({ ...formData, birthday: e.target.value })}
            />
            <Select 
              label="Jinsi" 
              placeholder="Tanlang" 
              options={[
                { label: 'Erkak', value: 'Male' },
                { label: 'Ayol', value: 'Female' }
              ]} 
              value={formData.gender || ''}
              onChange={val => setFormData({ ...formData, gender: val })}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aloqa</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            <Input
              label="Telefon raqam"
              required
              value={formData.phone}
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d+]/g, '');
                if (!val.startsWith('+998')) val = '+998';
                
                let digits = val.replace(/\D/g, '').substring(3);
                let formatted = '+998';
                if (digits.length > 0) formatted += ' ' + digits.substring(0, 2);
                if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
                if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
                if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
                
                setFormData({ ...formData, phone: formatted });
              }}
              placeholder="+998 90 123 45 67"
            />
            <Select
              label="Ota-ona"
              placeholder="Tanlang (ixtiyoriy)"
              options={[{ label: 'Tanlanmagan', value: '' }, ...parentOptions]}
              value={formData.parent_id}
              onChange={val => setFormData({ ...formData, parent_id: val })}
            />
          </div>
        </div>

        {/* Academic */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">O'quv jarayoni</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Filial"
              placeholder="Filialni tanlang"
              options={branchOptions}
              value={formData.branch_id}
              onChange={val => setFormData({ ...formData, branch_id: val })}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={formData.is_active}
              onChange={val => setFormData({ ...formData, is_active: val })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            {editingId ? 'Saqlash' : "Qo'shish"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
