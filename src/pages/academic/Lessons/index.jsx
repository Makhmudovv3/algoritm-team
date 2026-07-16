import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, AlertCircle, FileText, Search, PlayCircle } from 'lucide-react';
import ConfirmModal from '../../../components/ConfirmModal';
import CustomSelect from '../../../components/CustomSelect';

const initialLessons = [
  { id: 1, group: 'Frontend-01', topic: 'React Hooks (useState, useEffect)', date: '2026-07-16', time: '14:00 - 16:00', status: 'O\'tildi' },
  { id: 2, group: 'Backend-02', topic: 'Express Middleware', date: '2026-07-16', time: '18:00 - 20:00', status: 'Kutilmoqda' },
  { id: 3, group: 'Python-03', topic: 'Pandas Dataframes', date: '2026-07-17', time: '10:00 - 12:00', status: 'Kutilmoqda' },
];

const availableGroups = ['Frontend-01', 'Backend-02', 'Python-03'];
const statuses = ['Kutilmoqda', 'O\'tildi', 'Qoldirildi'];

const groupOptions = availableGroups.map(g => ({ label: g, value: g }));
const statusOptions = statuses.map(s => ({ 
  label: s, 
  value: s, 
  colorClass: s === "O'tildi" ? 'bg-green-500' : s === 'Kutilmoqda' ? 'bg-amber-500' : 'bg-red-500'
}));
const timeOptions = [
  { label: '08:00 - 10:00', value: '08:00 - 10:00' },
  { label: '10:00 - 12:00', value: '10:00 - 12:00' },
  { label: '14:00 - 16:00', value: '14:00 - 16:00' },
  { label: '16:00 - 18:00', value: '16:00 - 18:00' },
  { label: '18:00 - 20:00', value: '18:00 - 20:00' }
];

export default function Lessons() {
  const [lessons, setLessons] = useState(initialLessons);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    group: availableGroups[0], topic: '', date: '', time: timeOptions[0].value, status: 'Kutilmoqda'
  });

  const handleOpenModal = (lesson = null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData(lesson);
    } else {
      setEditingLesson(null);
      setFormData({ group: availableGroups[0], topic: '', date: '', time: timeOptions[0].value, status: 'Kutilmoqda' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLesson) {
      setLessons(lessons.map(l => l.id === editingLesson.id ? { ...l, ...formData } : l));
    } else {
      setLessons([...lessons, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      setLessons(lessons.filter(l => l.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "O'tildi": return <CheckCircle2 className="text-green-500" size={20} />;
      case "Kutilmoqda": return <Clock className="text-amber-500" size={20} />;
      case "Qoldirildi": return <AlertCircle className="text-red-500" size={20} />;
      default: return null;
    }
  };

  const filteredLessons = lessons.filter(lesson => 
    lesson.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lesson.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Darslar jurnali</h1>
          <p className="text-gray-500 mt-1">O'tilgan va rejalashtirilgan darslar hisobi</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus size={20} /> Yangi Dars
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Mavzu yoki guruh bo'yicha qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 block w-full rounded-lg border-gray-300 bg-white border py-2.5 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-colors"
        />
      </div>

      {/* Timeline/List of Lessons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {filteredLessons.map((lesson, idx) => (
            <div key={lesson.id} className="relative pl-8 sm:pl-0">
               {/* Decorative line for desktop timeline */}
              <div className="hidden sm:block absolute left-[120px] top-0 bottom-[-24px] w-px bg-gray-200 last:hidden"></div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start group">
                <div className="hidden sm:flex flex-col items-end min-w-[90px] pt-1">
                  <span className="text-sm font-bold text-gray-900">{lesson.date}</span>
                  <span className="text-xs text-gray-500">{lesson.time}</span>
                </div>
                
                <div className="hidden sm:flex absolute left-[111px] top-2 h-5 w-5 rounded-full bg-white border-2 border-indigo-500 items-center justify-center z-10">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>

                <div className="flex-1 w-full bg-gray-50 group-hover:bg-indigo-50/50 rounded-xl p-5 transition-colors border border-gray-100 group-hover:border-indigo-100">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                         <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                          {lesson.group}
                        </span>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          {getStatusIcon(lesson.status)}
                          <span className={
                            lesson.status === "O'tildi" ? 'text-green-600' : 
                            lesson.status === "Kutilmoqda" ? 'text-amber-600' : 'text-red-600'
                          }>{lesson.status}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FileText size={18} className="text-gray-400" />
                        {lesson.topic}
                      </h3>
                      {/* Mobile date/time */}
                      <div className="flex sm:hidden items-center gap-2 text-sm text-gray-500 pt-1">
                        <Clock size={14} /> {lesson.date} • {lesson.time}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(lesson)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-white transition-colors cursor-pointer shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(lesson.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-white transition-colors cursor-pointer shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredLessons.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <PlayCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-lg font-medium text-gray-900">Darslar topilmadi</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">{editingLesson ? 'Darsni Tahrirlash' : 'Yangi Dars Qo\'shish'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                 ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mavzu</label>
                <input required type="text" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Dars mavzusi..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guruhni Tanlang</label>
                  <CustomSelect 
                    options={groupOptions} 
                    value={formData.group} 
                    onChange={val => setFormData({...formData, group: val})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
                  <CustomSelect 
                    options={statusOptions} 
                    value={formData.status} 
                    onChange={val => setFormData({...formData, status: val})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
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

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer">Bekor qilish</button>
                <button type="submit" className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors cursor-pointer">{editingLesson ? 'Saqlash' : 'Qo\'shish'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!confirmDeleteId} 
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
        title="Darsni o'chirish"
        message="Rostdan ham ushbu darsni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
}
