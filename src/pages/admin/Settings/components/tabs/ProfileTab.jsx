import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ConfirmModal from '@/components/ConfirmModal';
import { toast } from 'react-toastify';

export function ProfileTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: "Admin Ma'muriyat",
    phone: "+998 90 999 99 99",
    email: "admin@algoritm.uz",
    telegram: "@admin_algoritm"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
    }, 800);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success("Rasm muvaffaqiyatli yuklandi!");
    }
  };

  const handleDeleteImageClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setProfileImage(null);
    toast.success("Profil rasmi o'chirildi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Mening profilim</h2>
        <p className="text-sm text-slate-500  mt-1">Shaxsiy ma'lumotlaringizni tahrirlash.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-6 pb-6 border-b border-slate-200 ">
            <div className="w-20 h-20 rounded-full bg-indigo-100  text-indigo-600  flex items-center justify-center text-2xl font-bold overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                "AM"
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900 ">{profileData.name}</h3>
              <p className="text-sm text-slate-500 mb-3">Tizim administratori</p>
              <div className="flex gap-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button type="button" variant="outline" size="sm" onClick={handleImageUpload}>Rasm yuklash</Button>
                <Button type="button" variant="ghost" size="sm" onClick={handleDeleteImageClick} className="text-red-600 hover:text-red-700 hover:bg-red-50 ">O'chirish</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Ism-sharif</label>
              <Input 
                name="name"
                value={profileData.name} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Telefon raqami</label>
              <Input 
                name="phone"
                value={profileData.phone} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Email (ixtiyoriy)</label>
              <Input 
                type="email" 
                name="email"
                value={profileData.email} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Telegram Username</label>
              <Input 
                name="telegram"
                value={profileData.telegram} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 ">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saqlanmoqda...' : 'O\'zgarishlarni saqlash'}
            </Button>
          </div>
        </form>
      </Card>

      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={handleConfirmDelete} 
        title="Rasmni o'chirish"
        message="Profil rasmini o'chirishni xohlaysizmi?" 
      />
    </div>
  );
}
