import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

export function PermissionsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [permissions, setPermissions] = useState({
    viewUsers: true,
    manageUsers: true,
    viewFinances: false,
    manageFinances: false,
    viewSettings: true,
    manageSettings: true,
    exportData: false
  });

  const handleToggle = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Ruxsatnomalar muvaffaqiyatli yangilandi!");
    }, 800);
  };

  const permItems = [
    { key: 'viewUsers', label: "Foydalanuvchilarni ko'rish", desc: "Xodimlar va o'quvchilarni ko'rish huquqi" },
    { key: 'manageUsers', label: "Foydalanuvchilarni boshqarish", desc: "Foydalanuvchilarni qo'shish, o'chirish va tahrirlash" },
    { key: 'viewFinances', label: "Moliya bo'limini ko'rish", desc: "To'lovlar va hisobotlarni ko'rish" },
    { key: 'manageFinances', label: "Moliyani boshqarish", desc: "To'lovlarni tasdiqlash va xarajatlarni boshqarish" },
    { key: 'viewSettings', label: "Sozlamalarni ko'rish", desc: "Tizim sozlamalarini faqat ko'rish" },
    { key: 'manageSettings', label: "Sozlamalarni tahrirlash", desc: "Tizim sozlamalarini o'zgartirish huquqi" },
    { key: 'exportData', label: "Ma'lumotlarni yuklab olish", desc: "Barcha ro'yxatlarni Excel formatida yuklab olish" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Huquqlar</h2>
        <p className="text-sm text-slate-500  mt-1">Tizim bo'limlariga kirish huquqlarini batafsil sozlash.</p>
      </div>

      <Card className="p-0 overflow-hidden divide-y divide-slate-200 ">
        {permItems.map((item) => (
          <div key={item.key} className="p-5 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 ">{item.label}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={permissions[item.key]}
                onChange={() => handleToggle(item.key)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        ))}
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => toast.info("O'zgarishlar bekor qilindi")} disabled={isLoading}>Bekor qilish</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
        </Button>
      </div>
    </div>
  );
}
