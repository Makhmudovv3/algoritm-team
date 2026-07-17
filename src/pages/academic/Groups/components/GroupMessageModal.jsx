import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export function GroupMessageModal({ isOpen, onClose, group }) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');
  const [isSending, setIsSending] = useState(false);

  const recipientOptions = [
    { label: "Barcha o'quvchilarga", value: 'all' },
    { label: "Faqat ota-onalarga", value: 'parents' },
    { label: "Faqat o'quvchilarga", value: 'students' }
  ];

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Xabar matnini kiriting");
      return;
    }

    setIsSending(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const targetLabel = recipientOptions.find(o => o.value === recipient)?.label || "Barchaga";
    toast.success(`${group?.name || 'Guruh'} guruhidagi ${targetLabel.toLowerCase()} xabar yuborildi!`);
    setMessage('');
    setIsSending(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Guruhga xabar yuborish" 
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSend} className="space-y-5 pt-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Qabul qiluvchilar
          </label>
          <Select 
            options={recipientOptions} 
            value={recipient} 
            onChange={setRecipient} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Xabar matni <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Xabar matnini kiriting..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <p className="text-xs text-slate-500 mt-1.5 text-right">
            {message.length} belgi
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSending}>
            Bekor qilish
          </Button>
          <Button type="submit" disabled={isSending}>
            {isSending ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin mr-2" />
                Yuborilmoqda...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-4 h-4 mr-2" /> Yuborish
              </div>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
