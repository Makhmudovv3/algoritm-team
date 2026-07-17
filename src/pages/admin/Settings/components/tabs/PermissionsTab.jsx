import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';

export function PermissionsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 ">Huquqlar</h2>
        <p className="text-sm text-slate-500  mt-1">Tizim bo'limlariga kirish huquqlarini batafsil sozlash.</p>
      </div>

      <Card className="p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-amber-100  text-amber-600  rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-lg font-medium text-slate-900  mb-2">
          Tez orada ishga tushadi
        </h3>
        <p className="text-slate-500  max-w-md mb-6">
          Huquqlarni batafsil sozlash moduli ustida ish olib borilmoqda. Hozircha rollar bo'limi orqali foydalanuvchilarning huquqlarini boshqarishingiz mumkin.
        </p>
        <Button variant="outline">
          Rollar bo'limiga o'tish
        </Button>
      </Card>
    </div>
  );
}
