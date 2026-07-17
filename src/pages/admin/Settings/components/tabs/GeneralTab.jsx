import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GeneralTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Umumiy sozlamalar</h2>
        <p className="text-sm text-slate-500  mt-1">O'quv markazining asosiy ma'lumotlarini tahrirlash.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Markaz nomi</label>
              <Input defaultValue="Algoritm ta'lim markazi" placeholder="Markaz nomini kiriting" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Asosiy telefon raqami</label>
              <Input defaultValue="+998 90 123 45 67" placeholder="+998" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 ">Manzil</label>
              <Input defaultValue="Toshkent shahri, Chilonzor tumani, 1-mavze" placeholder="To'liq manzilni kiriting" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Aloqa email manzili</label>
              <Input type="email" defaultValue="info@algoritm.uz" placeholder="misol@domain.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Veb-sayt</label>
              <Input defaultValue="https://algoritm.uz" placeholder="https://" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 ">
            <Button variant="outline">Bekor qilish</Button>
            <Button>Saqlash</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
