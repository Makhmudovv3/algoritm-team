import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar as CalendarIcon, Users, Monitor, Wifi, Clock, CheckCircle2 } from 'lucide-react';
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RoomDetailsDrawer({ isOpen, onClose, room, branchName }) {
  const navigate = useNavigate();

  if (!isOpen || !room) return null;

  // Mock schedule data for the empty state UI requested
  const mockSchedule = [
    { time: '09:00 - 10:30', group: 'Frontend G-12', teacher: 'Ali Valiyev', status: 'active' },
    { time: '11:00 - 12:30', group: 'Backend G-05', teacher: 'Hasan H.', status: 'upcoming' },
    { time: '14:00 - 15:30', group: 'Bo\'sh', teacher: '', status: 'empty' },
    { time: '16:00 - 17:30', group: 'Design G-08', teacher: 'Zuhra B.', status: 'upcoming' },
  ];

  const handleEditSchedule = () => {
    onClose();
    setTimeout(() => {
      navigate('/academic/schedules');
    }, 150);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right" className="max-w-md">
      <DrawerHeader className="flex-row items-center justify-between pb-4">
        <div>
          <DrawerTitle className="text-xl font-bold">{room.name}</DrawerTitle>
          <p className="text-sm text-slate-500 mt-1">{branchName}</p>
        </div>
      </DrawerHeader>

      <DrawerBody className="space-y-8 p-6">
          {/* Stats Section */}
          <section className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50  border border-indigo-100 ">
              <div className="flex items-center gap-2 text-indigo-600  mb-2">
                <Users size={18} />
                <span className="font-medium text-sm">Sig'im</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 ">{room.capacity} <span className="text-sm font-normal text-slate-500">o'rin</span></p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50  border border-emerald-100 ">
              <div className="flex items-center gap-2 text-emerald-600  mb-2">
                <CheckCircle2 size={18} />
                <span className="font-medium text-sm">Bandlik</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 ">75% <span className="text-sm font-normal text-slate-500">band</span></p>
            </div>
          </section>


          {/* Schedule Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900  uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon size={16} className="text-slate-400" />
                Bugungi Dars Jadvali
              </h3>
              <Badge variant="outline" className="text-xs">Bugun</Badge>
            </div>
            
            <div className="space-y-3">
              {mockSchedule.map((slot, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border ${
                    slot.status === 'active' 
                      ? 'bg-indigo-50 border-indigo-100  ' 
                      : slot.status === 'empty' 
                        ? 'bg-slate-50 border-dashed border-slate-200  '
                        : 'bg-white border-slate-100  '
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 ">
                      <Clock size={14} className={slot.status === 'active' ? 'text-indigo-600 ' : 'text-slate-400'} />
                      {slot.time}
                    </div>
                    {slot.status === 'active' && (
                      <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-transparent text-[10px] px-1.5 py-0">Hozir</Badge>
                    )}
                    {slot.status === 'empty' && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Bo'sh</Badge>
                    )}
                  </div>
                  
                  {slot.status !== 'empty' ? (
                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="font-semibold text-slate-900 ">{slot.group}</p>
                        <p className="text-xs text-slate-500  mt-0.5">{slot.teacher}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500  mt-2">Bu vaqtda xona bo'sh</p>
                  )}
                </div>
              ))}
            </div>
          </section>
      </DrawerBody>
        
      <DrawerFooter className="p-6 bg-slate-50 border-t border-slate-100 justify-center">
        <Button 
          onClick={handleEditSchedule}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Jadvalni tahrirlash
        </Button>
      </DrawerFooter>
    </Drawer>
  );
}
