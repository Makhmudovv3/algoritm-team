import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

export function GroupFormModal({ 
  isOpen, 
  onClose, 
  editingId, 
  formData, 
  setFormData, 
  handleSave, 
  courseOptions, 
  teacherOptions,
  roomOptions
}) {
  const statusOptions = [
    { label: 'Faol', value: 'true' },
    { label: 'Nofaol', value: 'false' }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={editingId ? 'Guruhni Tahrirlash' : "Yangi Guruh Qo'shish"} 
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSave} className="space-y-8 pt-2">
        
        {/* General Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900 ">Umumiy ma'lumotlar</h4>
            <p className="text-xs text-slate-500 mt-1">Guruhning asosiy sozlamalari.</p>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">Guruh nomi <span className="text-red-500">*</span></label>
              <Input 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Masalan: F-101" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-1">Kurs <span className="text-red-500">*</span></label>
                <Select 
                  options={courseOptions} 
                  value={formData.course_id} 
                  onChange={val => setFormData({...formData, course_id: val})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-1">Status</label>
                <Select 
                  options={statusOptions} 
                  value={formData.is_active} 
                  onChange={val => setFormData({...formData, is_active: val})} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-100 " />

        {/* Schedule & Location */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900 ">Vaqt va Joylashuv</h4>
            <p className="text-xs text-slate-500 mt-1">Darslar qachon va qayerda bo'ladi.</p>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-1">O'qituvchi <span className="text-red-500">*</span></label>
                <Select 
                  options={teacherOptions} 
                  value={formData.teacher_id} 
                  onChange={val => setFormData({...formData, teacher_id: val})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-1">Xona <span className="text-red-500">*</span></label>
                <Select 
                  options={roomOptions} 
                  value={formData.room_id} 
                  onChange={val => setFormData({...formData, room_id: val})} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700  mb-1">Kunlar <span className="text-red-500">*</span></label>
                <Select 
                  required 
                  options={[
                    { label: "Dushanba, Chorshanba, Juma", value: '1-3-5' },
                    { label: "Seshanba, Payshanba, Shanba", value: '2-4-6' },
                    { label: "Har kuni", value: 'everyday' }
                  ]} 
                  value={formData.days || '1-3-5'} 
                  onChange={val => setFormData({...formData, days: val})} 
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700  mb-1">Boshlanish sanasi</label>
                <DatePicker value={formData.start_date} onChange={val => setFormData({...formData, start_date: val})} />
              </div>
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
