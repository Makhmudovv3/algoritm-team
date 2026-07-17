import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    telegram: '',
    avatar: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // We simulate logging in as 'user-1'
      const data = await api.Users.getById('user-1');
      setUser(data);
      if (data) {
        setFormData({
          fullname: data.fullname || '',
          phone: data.phone || '',
          email: data.email || '',
          telegram: data.telegram || '',
          avatar: data.avatar || ''
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await api.Users.update(user.id, {
        fullname: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        telegram: formData.telegram,
        avatar: formData.avatar
      });
      // Simulate success delay
      await new Promise(r => setTimeout(r, 600));
      window.dispatchEvent(new Event('profileUpdated'));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    setDeleteConfirmOpen(false);
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
    
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto pb-12 animate-in fade-in duration-300 space-y-6">
      <PageHeader 
        title="Mening profilim" 
        description="Shaxsiy ma'lumotlaringizni boshqarish va tahrirlash"
      />

      <Card className="p-6 md:p-8 rounded-2xl shadow-sm border-slate-200">
        <form className="space-y-8" onSubmit={handleSave}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-100">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shrink-0 shadow-inner overflow-hidden relative">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials(formData.fullname)
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-slate-900">{formData.fullname || "Foydalanuvchi"}</h3>
              <p className="text-slate-500 mb-4 mt-1">Tizim administratori</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="font-medium"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Rasm yuklash
                </Button>
                {formData.avatar && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                    onClick={() => setDeleteConfirmOpen(true)}
                  >
                    O'chirish
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Ism-sharif</label>
              <Input 
                value={formData.fullname} 
                onChange={e => setFormData(prev => ({...prev, fullname: e.target.value}))}
                className="bg-slate-50/50" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Telefon raqami</label>
              <Input 
                value={formData.phone} 
                onChange={handlePhoneChange}
                className="bg-slate-50/50" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email (ixtiyoriy)</label>
              <Input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                className="bg-slate-50/50" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Telegram Username</label>
              <Input 
                value={formData.telegram} 
                onChange={e => setFormData(prev => ({...prev, telegram: e.target.value}))}
                className="bg-slate-50/50" 
              />
            </div>
          </div>
          
          <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100">
            {showSuccess && (
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-4 h-4" /> Muvaffaqiyatli saqlandi
              </span>
            )}
            <Button type="submit" disabled={isSaving} className="px-8 shadow-sm">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saqlanmoqda...
                </>
              ) : (
                "O'zgarishlarni saqlash"
              )}
            </Button>
          </div>
        </form>
      </Card>

      <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Rasmni o'chirish" maxWidth="max-w-md">
        <div className="space-y-6">
          <p className="text-sm text-slate-600">Haqiqatan ham profil rasmingizni o'chirib tashlamoqchimisiz?</p>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setDeleteConfirmOpen(false)}>Bekor qilish</Button>
            <Button variant="destructive" onClick={handleDeleteImage}>Ha, o'chirish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
