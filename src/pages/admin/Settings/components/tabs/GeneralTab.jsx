import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

export function GeneralTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Algoritm ta'lim markazi",
    phone: "+998 90 123 45 67",
    address: "Toshkent shahri, Chilonzor tumani, 1-mavze",
    email: "info@algoritm.uz",
    website: "https://algoritm.uz"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Umumiy sozlamalar muvaffaqiyatli saqlandi!");
    }, 800);
  };

  const handleCancel = () => {
    toast.info("O'zgarishlar bekor qilindi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Umumiy sozlamalar</h2>
        <p className="text-sm text-slate-500  mt-1">O'quv markazining asosiy ma'lumotlarini tahrirlash.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Markaz nomi</label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Markaz nomini kiriting" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Asosiy telefon raqami</label>
              <Input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+998" 
                required 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 ">Manzil</label>
              <Input 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="To'liq manzilni kiriting" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Aloqa email manzili</label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="misol@domain.com" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Veb-sayt</label>
              <Input 
                name="website" 
                value={formData.website} 
                onChange={handleChange} 
                placeholder="https://" 
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 ">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
