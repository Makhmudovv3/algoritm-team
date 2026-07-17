import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Mening profilim</h2>
        <p className="text-sm text-slate-500  mt-1">Shaxsiy ma'lumotlaringizni tahrirlash.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-6 pb-6 border-b border-slate-200 ">
            <div className="w-20 h-20 rounded-full bg-indigo-100  text-indigo-600  flex items-center justify-center text-2xl font-bold">
              AM
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900 ">Admin Ma'muriyat</h3>
              <p className="text-sm text-slate-500 mb-3">Tizim administratori</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Rasm yuklash</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 ">O'chirish</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Ism-sharif</label>
              <Input defaultValue="Admin Ma'muriyat" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Telefon raqami</label>
              <Input defaultValue="+998 90 999 99 99" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Email (ixtiyoriy)</label>
              <Input type="email" defaultValue="admin@algoritm.uz" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ">Telegram Username</label>
              <Input defaultValue="@admin_algoritm" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 ">
            <Button>O'zgarishlarni saqlash</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
