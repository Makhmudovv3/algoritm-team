import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Calendar, Clock, BookOpen, Search } from 'lucide-react';
import ConfirmModal from '../../../components/ConfirmModal';
import CustomSelect from '../../../components/CustomSelect';

const initialGroups = [
  { id: 1, name: 'Frontend-01', course: 'Frontend Web Development', teacher: 'John Doe', days: 'Du, Chor, Juma', time: '14:00 - 16:00', studentsCount: 15 },
  { id: 2, name: 'Backend-02', course: 'Backend with Node.js', teacher: 'Jane Smith', days: 'Sesh, Pay, Shanba', time: '18:00 - 20:00', studentsCount: 12 },
  { id: 3, name: 'Python-03', course: 'Python Data Science', teacher: 'Ali Valiyev', days: 'Du, Chor, Juma', time: '10:00 - 12:00', studentsCount: 18 },
];

const availableCourses = ['Frontend Web Development', 'Backend with Node.js', 'Python Data Science', 'Graphic Design'];
const availableTeachers = ['John Doe', 'Jane Smith', 'Ali Valiyev', 'Murod Rahimov'];

const courseOptions = availableCourses.map(c => ({ label: c, value: c }));
const teacherOptions = availableTeachers.map(t => ({ label: t, value: t }));
const daysOptions = [
  { label: 'Du, Chor, Juma', value: 'Du, Chor, Juma' },
  { label: 'Sesh, Pay, Shanba', value: 'Sesh, Pay, Shanba' },
  { label: 'Har kuni', value: 'Har kuni' }
];
const timeOptions = [
  { label: '08:00 - 10:00', value: '08:00 - 10:00' },
  { label: '10:00 - 12:00', value: '10:00 - 12:00' },
  { label: '14:00 - 16:00', value: '14:00 - 16:00' },
  { label: '16:00 - 18:00', value: '16:00 - 18:00' },
  { label: '18:00 - 20:00', value: '18:00 - 20:00' }
];

export default function Groups() {
  const [groups, setGroups] = useState(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', course: availableCourses[0], teacher: availableTeachers[0], days: daysOptions[0].value, time: timeOptions[0].value, studentsCount: 0
  });

  const handleOpenModal = (group = null) => {
    if (group) {
      setEditingGroup(group);
      setFormData(group);
    } else {
      setEditingGroup(null);
      setFormData({ name: '', course: availableCourses[0], teacher: availableTeachers[0], days: daysOptions[0].value, time: timeOptions[0].value, studentsCount: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...g, ...formData } : g));
    } else {
      setGroups([...groups, { ...formData, id: Date.now(), studentsCount: formData.studentsCount || 0 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      setGroups(groups.filter(g => g.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    group.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Guruhlar</h1>
          <p className="text-gray-500 mt-1">O'quv guruhlari va jadvallarni boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus size={20} /> Yangi Guruh Qo'shish
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Guruh nomi yoki kurs nomi bo'yicha qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 block w-full rounded-lg border-gray-300 bg-white border py-2.5 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-colors"
        />
      </div>

      {/* Groups List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium border-b border-gray-100">Guruh Nomi</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Kurs</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">O'qituvchi</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Jadval</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100 text-center">Talabalar</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGroups.map(group => (
                <tr key={group.id} className="hover:bg-gray-50/50 transition-colors group/row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <Users size={20} />
                      </div>
                      <span className="font-bold text-gray-900">{group.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen size={16} className="text-gray-400" />
                      {group.course}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {group.teacher}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm text-gray-600 gap-1">
                      <div className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400"/> {group.days}</div>
                      <div className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400"/> {group.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-full text-xs">
                      {group.studentsCount} ta
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(group)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(group.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGroups.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <Users className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">Guruhlar topilmadi</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">{editingGroup ? 'Guruhni Tahrirlash' : 'Yangi Guruh Qo\'shish'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                 ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guruh Nomi</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="masalan, Frontend-01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Talabalar Soni</label>
                  <input required type="number" min="0" value={formData.studentsCount} onChange={e => setFormData({...formData, studentsCount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="0" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kursni Tanlang</label>
                  <CustomSelect 
                    options={courseOptions} 
                    value={formData.course} 
                    onChange={val => setFormData({...formData, course: val})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">O'qituvchi</label>
                  <CustomSelect 
                    options={teacherOptions} 
                    value={formData.teacher} 
                    onChange={val => setFormData({...formData, teacher: val})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dars Kunlari</label>
                  <CustomSelect 
                    options={daysOptions} 
                    value={formData.days} 
                    onChange={val => setFormData({...formData, days: val})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dars Vaqti</label>
                  <CustomSelect 
                    options={timeOptions} 
                    value={formData.time} 
                    onChange={val => setFormData({...formData, time: val})} 
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer">Bekor qilish</button>
                <button type="submit" className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors cursor-pointer">{editingGroup ? 'Saqlash' : 'Qo\'shish'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!confirmDeleteId} 
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
        title="Guruhni o'chirish"
        message="Rostdan ham ushbu guruhni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
}
