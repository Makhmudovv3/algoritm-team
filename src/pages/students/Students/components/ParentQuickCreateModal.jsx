import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { formatPhone } from '@/utils/helpers';

export function ParentQuickCreateModal({
  isOpen,
  onClose,
  initialName = '',
  onSuccess
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    relation: 'Ota'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, name: initialName }));
    }
  }, [isOpen, initialName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || formData.phone.replace(/\D/g, '').length < 12) {
      return; // Handled by HTML required/pattern ideally, but simple check here
    }
    onSuccess(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi ota-ona qo'shish"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Input
          label="F.I.SH"
          required
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Ism sharifi"
        />
        
        <Input
          label="Telefon raqam"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
          placeholder="+998 90 123 45 67"
        />
        
        <Select
          label="Qarindoshlik turi"
          options={[
            { label: 'Ota', value: 'Ota' },
            { label: 'Ona', value: 'Ona' },
            { label: 'Vasiy', value: 'Vasiy' }
          ]}
          value={formData.relation}
          onChange={val => setFormData(prev => ({ ...prev, relation: val }))}
        />

        <div className="pt-4 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Tasdiqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
