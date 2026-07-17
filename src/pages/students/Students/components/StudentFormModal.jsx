import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { formatPhone } from '@/utils/helpers';

export function StudentFormModal({
  isOpen, onClose, editingId,
  formData, setFormData, handleSave,
  branchOptions, parentOptions, isLoading
}) {
  const statusOptions = [
    { label: 'Faol', value: 'true' },
    { label: 'Nofaol', value: 'false' }
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone || !formData.branch_id || !formData.birthday) {
      return;
    }
    handleSave();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingId ? "O'quvchini Tahrirlash" : "Yangi O'quvchi"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={onSubmit} className="divide-y divide-slate-100">
        {/* General */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Umumiy ma'lumot</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="F.I.SH"
                required
                value={formData.fullname}
                onChange={e => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
                placeholder="Aliyev Vali Sobirovich"
                disabled={isLoading}
              />
            </div>
            <Input
              label="O'quvchi telefon raqami"
              required
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
              placeholder="+998 90 123 45 67"
              disabled={isLoading}
            />
            <DatePicker 
              label="Tug'ilgan sana" 
              required
              value={formData.birthday || ''}
              onChange={val => setFormData(prev => ({ ...prev, birthday: val }))}
            />
            <div className="sm:col-span-2">
              <Select 
                label="Jinsi" 
                placeholder="Tanlang" 
                required
                options={[
                  { label: 'Erkak', value: 'Male' },
                  { label: 'Ayol', value: 'Female' }
                ]} 
                value={formData.gender || ''}
                onChange={val => setFormData(prev => ({ ...prev, gender: val }))}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ota-ona ma'lumotlari</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            <Input
              label="Ota-ona (F.I.SH)"
              placeholder="Ismini yozing (ixtiyoriy)"
              value={formData.parent_name || ''}
              onChange={e => setFormData(prev => ({ ...prev, parent_name: e.target.value }))}
              disabled={isLoading}
            />
            <Input
              label="Ota-ona telefon raqami"
              value={formData.parent_phone || '+998 '}
              onChange={e => setFormData(prev => ({ ...prev, parent_phone: formatPhone(e.target.value) }))}
              placeholder="+998 90 123 45 67"
              disabled={isLoading}
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
              required
              options={branchOptions}
              value={formData.branch_id}
              onChange={val => setFormData(prev => ({ ...prev, branch_id: val }))}
              disabled={isLoading}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={formData.is_active}
              onChange={val => setFormData(prev => ({ ...prev, is_active: val }))}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>Bekor qilish</Button>
          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {editingId ? 'Saqlash' : "Qo'shish"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
