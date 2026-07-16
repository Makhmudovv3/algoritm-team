import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import ConfirmModal from '../../../components/ConfirmModal';
import CustomSelect from '../../../components/CustomSelect';

const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

const dayOptions = days.map(d => ({ label: d, value: d }));
const timeOptions = times.map(t => ({ label: t, value: t }));
const colorOptions = [
  { label: 'Indigo', value: 'bg-indigo-100 border-indigo-200 text-indigo-800', colorClass: 'bg-indigo-500' },
  { label: "Ko'k", value: 'bg-blue-100 border-blue-200 text-blue-800', colorClass: 'bg-blue-500' },
  { label: 'Yashil', value: 'bg-green-100 border-green-200 text-green-800', colorClass: 'bg-green-500' },
  { label: 'Siyohrang', value: 'bg-purple-100 border-purple-200 text-purple-800', colorClass: 'bg-purple-500' },
  { label: 'Qizil', value: 'bg-rose-100 border-rose-200 text-rose-800', colorClass: 'bg-rose-500' },
  { label: 'Sariq', value: 'bg-amber-100 border-amber-200 text-amber-800', colorClass: 'bg-amber-500' }
];

const initialSchedules = [
  { id: 1, group: 'Frontend-01', room: 'Xona 1 (Lochin)', teacher: 'John Doe', day: 'Dushanba', time: '14:00', color: 'bg-blue-100 border-blue-200 text-blue-800' },
  { id: 2, group: 'Backend-02', room: 'Xona 2 (Burgut)', teacher: 'Jane Smith', day: 'Seshanba', time: '18:00', color: 'bg-green-100 border-green-200 text-green-800' },
  { id: 3, group: 'Python-03', room: 'Xona 3 (Shunqor)', teacher: 'Ali Valiyev', day: 'Chorshanba', time: '10:00', color: 'bg-purple-100 border-purple-200 text-purple-800' },
  { id: 4, group: 'Frontend-01', room: 'Xona 1 (Lochin)', teacher: 'John Doe', day: 'Chorshanba', time: '14:00', color: 'bg-blue-100 border-blue-200 text-blue-800' },
  { id: 5, group: 'Graphic Design', room: 'Xona 4 (Dizayn)', teacher: 'Murod Rahimov', day: 'Juma', time: '16:00', color: 'bg-rose-100 border-rose-200 text-rose-800' },
];

export default function Schedules() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    group: 'Frontend-01', room: 'Xona 1 (Lochin)', teacher: 'John Doe', day: 'Dushanba', time: '10:00', color: 'bg-indigo-100 border-indigo-200 text-indigo-800'
  });

  const getSchedule = (day, time) => {
    return schedules.find(s => s.day === day && s.time === time);
  };

  const handleOpenModal = (day = 'Dushanba', time = '10:00') => {
    setFormData({ ...formData, day, time });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove existing schedule at that slot if any
    const filtered = schedules.filter(s => !(s.day === formData.day && s.time === formData.time));
    setSchedules([...filtered, { ...formData, id: Date.now() }]);
    closeModal();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      setSchedules(schedules.filter(s => s.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dars Jadvallari</h1>
          <p className="text-gray-500 mt-1">Haftalik dars jadvali taqsimoti</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"><ChevronLeft size={20} className="text-gray-600"/></button>
            <span className="px-4 font-semibold text-gray-800">Ushbu hafta</span>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"><ChevronRight size={20} className="text-gray-600"/></button>
          </div>
          <button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center">
             <Plus size={22} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/80 sticky top-0 z-10">
            <div className="p-4 border-r border-gray-200 text-center font-semibold text-gray-500 flex items-center justify-center gap-2">
              <Clock size={18} /> Vaqt
            </div>
            {days.map((day) => (
              <div key={day} className="p-4 border-r border-gray-200 last:border-r-0 text-center">
                <span className="font-bold text-gray-800">{day}</span>
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200">
            {times.map(time => (
              <div key={time} className="grid grid-cols-7 relative group">
                <div className="p-4 border-r border-gray-200 flex items-center justify-center font-medium text-gray-500 bg-gray-50/30">
                  {time}
                </div>
                
                {days.map(day => {
                  const schedule = getSchedule(day, time);
                  return (
                    <div key={`${day}-${time}`} className="border-r border-gray-200 last:border-r-0 p-2 min-h-[120px] hover:bg-gray-50/50 transition-colors relative group/cell">
                      {schedule ? (
                        <div className={`w-full h-full rounded-lg border p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow relative ${schedule.color}`}>
                          <button onClick={(e) => handleDelete(e, schedule.id)} className="absolute top-2 right-2 p-1 bg-white/50 hover:bg-white text-red-500 rounded-md opacity-0 group-hover/cell:opacity-100 transition-opacity cursor-pointer">
                            <Trash2 size={14} />
                          </button>
                          <div className="font-bold text-sm leading-tight flex justify-between items-start pr-5">
                            {schedule.group}
                          </div>
                          <div className="text-xs font-medium opacity-90 flex items-center gap-1">
                             <Users size={12} /> {schedule.teacher}
                          </div>
                          <div className="text-xs font-medium opacity-90 flex items-center gap-1 mt-auto">
                            <MapPin size={12} /> {schedule.room}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenModal(day, time)} className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center cursor-pointer transition-colors">
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Jadvalga dars qo'shish</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                 ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kun</label>
                  <CustomSelect 
                    options={dayOptions} 
                    value={formData.day} 
                    onChange={val => setFormData({...formData, day: val})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaqti</label>
                  <CustomSelect 
                    options={timeOptions} 
                    value={formData.time} 
                    onChange={val => setFormData({...formData, time: val})} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guruh (Mavzu)</label>
                <input required type="text" value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">O'qituvchi</label>
                  <input required type="text" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Xona</label>
                  <input required type="text" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rang</label>
                <CustomSelect 
                  options={colorOptions} 
                  value={formData.color} 
                  onChange={val => setFormData({...formData, color: val})} 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer">Bekor qilish</button>
                <button type="submit" className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors cursor-pointer">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!confirmDeleteId} 
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
        title="Jadvaldan o'chirish"
        message="Bu darsni jadvaldan olib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
}
