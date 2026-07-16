import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Clock, CreditCard, Search, Info, Calendar, Users, BarChart, Layers } from 'lucide-react';
import ConfirmModal from '../../../components/ConfirmModal';
import CustomSelect from '../../../components/CustomSelect';

const initialCourses = [
  { 
    id: 1, 
    name: 'Frontend Web Development', 
    duration: '6 months', 
    price: '1 500 000', 
    status: 'Active', 
    color: 'bg-blue-500',
    description: "Zamonaviy veb-saytlar va interfeyslar yaratishni noldan o'rganing. HTML, CSS, JavaScript va React.js texnologiyalarini o'z ichiga oladi.",
    level: "Boshlang'ich",
    schedule: "Haftada 3 kun",
    lessons: "72 ta dars"
  },
  { 
    id: 2, 
    name: 'Backend with Node.js', 
    duration: '5 months', 
    price: '1 600 000', 
    status: 'Active', 
    color: 'bg-green-500',
    description: "Server tomonida ishlovchi mustahkam ilovalar yaratish. Node.js, Express, MongoDB va PostgreSQL bilan ishlashni o'rganasiz.",
    level: "O'rta",
    schedule: "Haftada 3 kun",
    lessons: "60 ta dars"
  },
  { 
    id: 3, 
    name: 'Python Data Science', 
    duration: '8 months', 
    price: '2 000 000', 
    status: 'Inactive', 
    color: 'bg-purple-500',
    description: "Ma'lumotlar tahlili va sun'iy intellekt olamiga kirish. Python, Pandas, NumPy va Machine Learning asoslarini qamrab oladi.",
    level: "Boshlang'ich",
    schedule: "Haftada 2 kun",
    lessons: "64 ta dars"
  },
];

const statusOptions = [
  { label: 'Faol', value: 'Active', colorClass: 'bg-green-500' },
  { label: 'Faol Emas', value: 'Inactive', colorClass: 'bg-gray-400' }
];

const colorOptions = [
  { label: 'Indigo', value: 'bg-indigo-500', colorClass: 'bg-indigo-500' },
  { label: "Ko'k", value: 'bg-blue-500', colorClass: 'bg-blue-500' },
  { label: 'Yashil', value: 'bg-green-500', colorClass: 'bg-green-500' },
  { label: 'Siyohrang', value: 'bg-purple-500', colorClass: 'bg-purple-500' },
  { label: 'Qizil', value: 'bg-rose-500', colorClass: 'bg-rose-500' },
  { label: 'Sariq', value: 'bg-amber-500', colorClass: 'bg-amber-500' }
];

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', duration: '', price: '', status: 'Active', color: 'bg-indigo-500', description: '', level: '', schedule: '', lessons: ''
  });

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setFormData({...formData, price: formatted});
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({ name: '', duration: '', price: '', status: 'Active', color: 'bg-indigo-500', description: '', level: '', schedule: '', lessons: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      setCourses(courses.filter(c => c.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Courses</h1>
          <p className="text-gray-500 mt-1">O'quv dasturlari va kurslarni boshqarish</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus size={20} /> Yangi Kurs Qo'shish
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Kurslarni qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 block w-full rounded-lg border-gray-300 bg-white border py-2.5 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-colors"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => (
          <div 
            key={course.id} 
            onClick={() => setViewingCourse(course)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group relative cursor-pointer flex flex-col h-full"
          >
            <div className={`h-2 ${course.color || 'bg-indigo-500'} w-full`}></div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${course.color ? course.color.replace('bg-', 'bg-').replace('-500', '-100') : 'bg-indigo-100'} text-${course.color ? course.color.replace('bg-', '') : 'indigo-600'}`}>
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">{course.name}</h3>
                </div>
              </div>
              
              <div className="space-y-2 mt-3 text-sm text-gray-600 flex-grow">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-gray-400"/> <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-gray-400"/> <span className="font-medium">{course.price} UZS</span>
                </div>
                {course.level && (
                  <div className="flex items-center gap-2">
                    <BarChart size={15} className="text-gray-400"/> <span>{course.level}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-3 mt-4 border-t border-gray-50 flex items-center justify-between">
                 <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {course.status === 'Active' ? 'Faol' : 'Faol Emas'}
                </span>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); handleOpenModal(course); }} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(course.id); }} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <BookOpen className="mx-auto h-10 w-10 text-gray-300 mb-3" />
            <h3 className="text-base font-medium text-gray-900">Kurslar topilmadi</h3>
            <p className="text-sm text-gray-500">Qidiruvingiz bo'yicha hech qanday natija yo'q.</p>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">{editingCourse ? 'Kursni Tahrirlash' : 'Yangi Kurs Qo\'shish'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                 ✕
              </button>
            </div>
            <div className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kurs Nomi</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="masalan, Grafik Dizayn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha Ta'rif</label>
                  <textarea rows="2" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none" placeholder="Kurs haqida qisqacha..."></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Davomiyligi</label>
                    <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="masalan, 4 oy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Narxi</label>
                    <div className="relative">
                      <input required type="text" value={formData.price} onChange={handlePriceChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12" placeholder="masalan, 1 000 000" />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 font-medium">
                        UZS
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daraja</label>
                    <input type="text" value={formData.level || ''} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Boshlang'ich" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jadval</label>
                    <input type="text" value={formData.schedule || ''} onChange={e => setFormData({...formData, schedule: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Haftada 3 kun" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Darslar</label>
                    <input type="text" value={formData.lessons || ''} onChange={e => setFormData({...formData, lessons: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="24 ta dars" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
                    <CustomSelect 
                      options={statusOptions} 
                      value={formData.status} 
                      onChange={val => setFormData({...formData, status: val})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rang</label>
                    <CustomSelect 
                      options={colorOptions} 
                      value={formData.color} 
                      onChange={val => setFormData({...formData, color: val})} 
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer">Bekor qilish</button>
                  <button type="submit" className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors cursor-pointer">{editingCourse ? 'Saqlash' : 'Qo\'shish'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Course Modal */}
      {viewingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}} onClick={() => setViewingCourse(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all" onClick={e => e.stopPropagation()}>
            {/* Header Banner */}
            <div className={`h-24 ${viewingCourse.color || 'bg-indigo-500'} w-full relative`}>
              <button onClick={() => setViewingCourse(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-colors cursor-pointer">
                 ✕
              </button>
            </div>
            
            <div className="px-6 pb-6 pt-0 relative">
              {/* Icon Overlay */}
              <div className="flex justify-between items-end mb-4 -mt-10">
                <div className={`p-4 rounded-2xl shadow-lg border-4 border-white ${viewingCourse.color ? viewingCourse.color.replace('bg-', 'bg-').replace('-500', '-100') : 'bg-indigo-100'} text-${viewingCourse.color ? viewingCourse.color.replace('bg-', '') : 'indigo-600'}`}>
                  <BookOpen size={36} />
                </div>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${viewingCourse.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                  {viewingCourse.status === 'Active' ? 'Faol Kurs' : 'Faol Emas'}
                </span>
              </div>
              
              {/* Title & Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{viewingCourse.name}</h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {viewingCourse.description || "Ushbu kurs bo'yicha batafsil ma'lumot kiritilmagan. Ma'muriyat bilan bog'lanib to'liq ma'lumot olishingiz mumkin."}
                </p>
              </div>
              
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                  <Clock size={20} className="text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Davomiyligi</p>
                    <p className="font-semibold text-gray-900">{viewingCourse.duration}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                  <CreditCard size={20} className="text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Narxi</p>
                    <p className="font-semibold text-gray-900">{viewingCourse.price} UZS</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                  <BarChart size={20} className="text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Daraja</p>
                    <p className="font-semibold text-gray-900">{viewingCourse.level || "Barcha uchun"}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                  <Layers size={20} className="text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Darslar soni</p>
                    <p className="font-semibold text-gray-900">{viewingCourse.lessons || "Noma'lum"}</p>
                  </div>
                </div>
              </div>
              
              {viewingCourse.schedule && (
                <div className="bg-indigo-50/50 rounded-xl p-4 flex items-center gap-3 border border-indigo-100 mb-6">
                  <Calendar size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-xs text-indigo-400 font-medium">O'qish jadvali</p>
                    <p className="text-sm font-semibold text-indigo-900">{viewingCourse.schedule}</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button onClick={() => setViewingCourse(null)} className="w-full px-4 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer">
                  Tushunarli, Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!confirmDeleteId} 
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
        title="Kursni o'chirish"
        message="Rostdan ham ushbu kursni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
}
