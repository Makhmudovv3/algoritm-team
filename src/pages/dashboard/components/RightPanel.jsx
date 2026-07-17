import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Bell, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const schedule = [
  { time: "09:00", title: "Ingliz tili B2", room: "Xona 12", teacher: "Aliyeva N." },
  { time: "11:30", title: "Matematika", room: "Xona 04", teacher: "Murodov J." },
  { time: "14:00", title: "IELTS", room: "Xona 15", teacher: "Karimova O." },
];

const tasks = [
  { id: 1, title: "Oylik hisobotni tayyorlash", completed: false },
  { id: 2, title: "Yangi o'qituvchilarni ro'yxatga olish", completed: true },
  { id: 3, title: "Ota-onalar majlisi", completed: false },
];

export function RightPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* Calendar Placeholder */}
      <Card className="p-6 flex flex-col items-center justify-center text-center bg-slate-50  border-dashed min-h-[280px]">
        <CalendarIcon className="h-8 w-8 text-slate-400 mb-2 opacity-50" />
        <h3 className="text-sm font-medium text-slate-900 ">Kalendar</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Bu yerda interaktiv kalendar bo'ladi. Hozircha UI shaklida.</p>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="pb-4 border-b border-slate-100 ">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Bugungi Darslar</CardTitle>
            <Badge variant="info">3 ta</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative border-l-2 border-slate-100  ml-3 space-y-6">
            {schedule.map((item, idx) => (
              <motion.div key={idx} className="relative pl-6" whileHover={{ x: 2 }}>
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-600 " />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 ">{item.time}</span>
                    <span className="text-xs font-medium text-slate-900 ">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {item.room}</span>
                    <span>•</span>
                    <span>{item.teacher}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card>
        <CardHeader className="pb-4 border-b border-slate-100 ">
          <CardTitle className="text-sm">Topshiriqlar</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3">
                <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${task.completed ? 'text-green-500' : 'text-slate-300 '}`} />
                <span className={`text-[13px] ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 '}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-slate-900 text-white   overflow-hidden relative">
        <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10  rounded-full blur-2xl" />
        <CardContent className="p-6 flex items-start gap-4">
          <div className="p-2 bg-white/10  rounded-lg shrink-0">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Yangi Xabarnoma</h4>
            <p className="text-[12px] opacity-80 leading-relaxed">
              Tizim soat 23:00 da profilaktika sababli 15 daqiqaga o'chiriladi.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
