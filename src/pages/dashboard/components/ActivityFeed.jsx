import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, User, DollarSign, Settings } from 'lucide-react';

const activities = [
  { id: 1, text: "O'qituvchi Aliyev Vali yangi dars jadvalini qo'shdi", time: "10 daqiqa oldin", icon: Calendar },
  { id: 2, text: "Yangi o'quvchi ro'yxatdan o'tdi: Murodov Jamshid", time: "1 soat oldin", icon: User },
  { id: 3, text: "Fizika guruhi uchun to'lov amalga oshirildi (450,000 UZS)", time: "2 soat oldin", icon: DollarSign },
  { id: 4, text: "Tizim sozlamalari yangilandi", time: "Kecha, 15:30", icon: Settings },
];

export function ActivityFeed() {
  return (
    <Card className="flex flex-col mb-8 h-full">
      <CardHeader className="border-b border-slate-100  pb-4">
        <CardTitle className="text-base">So'nggi Harakatlar</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative border-l border-slate-200  ml-4 space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-6">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-slate-100  border-4 border-white ">
                <activity.icon className="h-3.5 w-3.5 text-slate-600 " />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-slate-900  leading-snug">
                  {activity.text}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
