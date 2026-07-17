import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Xavfsizlik</h2>
        <p className="text-sm text-slate-500  mt-1">Parolni o'zgartirish va akkaunt xavfsizligini ta'minlash.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-medium text-slate-900  mb-4">Parolni o'zgartirish</h3>
        <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Joriy parol</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Yangi parol</label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ">Yangi parolni tasdiqlang</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          
          <div className="pt-2">
            <Button>Parolni yangilash</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-medium text-slate-900  mb-2">Ikki bosqichli tasdiqlash (2FA)</h3>
        <p className="text-sm text-slate-500  mb-4 max-w-2xl">
          Hisobingiz xavfsizligini oshirish uchun ikki bosqichli tasdiqlashni yoqing. Bu tizimga kirishda parolingizga qo'shimcha ravishda maxsus kod talab qiladi.
        </p>
        <Button variant="outline">2FA ni yoqish</Button>
      </Card>
    </div>
  );
}
