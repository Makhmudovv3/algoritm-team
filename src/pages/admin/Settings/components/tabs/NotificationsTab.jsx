import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Xabarnomalar</h2>
        <p className="text-sm text-slate-500  mt-1">Tizimdan keladigan bildirishnomalarni sozlash.</p>
      </div>

      <Card className="p-0 overflow-hidden divide-y divide-slate-200 ">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-900 ">Yangi o'quvchilar ro'yxatdan o'tganda</h3>
            <p className="text-sm text-slate-500 mt-1">Yangi o'quvchi qo'shilganida telegram bot orqali xabar olish.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-900 ">To'lovlar amalga oshirilganda</h3>
            <p className="text-sm text-slate-500 mt-1">Har bir yangi to'lov haqida xabar olish.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-900 ">Guruhlar darsi boshlanishiga 30 daqiqa qolganda</h3>
            <p className="text-sm text-slate-500 mt-1">O'qituvchilarga va administratorlarga eslatma jo'natish.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button>Saqlash</Button>
      </div>
    </div>
  );
}
