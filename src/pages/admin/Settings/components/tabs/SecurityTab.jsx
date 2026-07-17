import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

export function SecurityTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      return toast.error("Barcha maydonlarni to'ldiring");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Yangi parollar mos kelmadi");
    }

    if (passwords.newPassword.length < 6) {
      return toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Parol muvaffaqiyatli yangilandi!");
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 800);
  };

  const handleToggle2FA = () => {
    setIs2FALoading(true);
    setTimeout(() => {
      setIs2FAEnabled(!is2FAEnabled);
      setIs2FALoading(false);
      if (!is2FAEnabled) {
        toast.success("Ikki bosqichli tasdiqlash (2FA) yoqildi");
      } else {
        toast.info("Ikki bosqichli tasdiqlash (2FA) o'chirildi");
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Xavfsizlik</h2>
        <p className="text-sm text-slate-500  mt-1">Parolni o'zgartirish va akkaunt xavfsizligini ta'minlash.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-medium text-slate-900  mb-4">Parolni o'zgartirish</h3>
        <form className="space-y-4 max-w-md" onSubmit={handlePasswordSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Joriy parol</label>
            <Input 
              type="password" 
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              placeholder="••••••••" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Yangi parol</label>
            <Input 
              type="password" 
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="••••••••" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Yangi parolni tasdiqlang</label>
            <Input 
              type="password" 
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" 
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Yangilanmoqda...' : 'Parolni yangilash'}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center mb-2">
          <h3 className="text-base font-medium text-slate-900 ">Ikki bosqichli tasdiqlash (2FA)</h3>
          {is2FAEnabled && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Faol
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500  mb-4 max-w-2xl">
          Hisobingiz xavfsizligini oshirish uchun ikki bosqichli tasdiqlashni yoqing. Bu tizimga kirishda parolingizga qo'shimcha ravishda maxsus kod talab qiladi.
        </p>
        <Button 
          type="button" 
          variant={is2FAEnabled ? "destructive" : "outline"}
          onClick={handleToggle2FA}
          disabled={is2FALoading}
        >
          {is2FALoading 
            ? 'Kuting...' 
            : is2FAEnabled ? '2FA ni o\'chirish' : '2FA ni yoqish'}
        </Button>
      </Card>
    </div>
  );
}
