import React, { useState } from 'react';
import { ArrowRightLeft, UserCircle2, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import CustomSelect from '../../../components/CustomSelect';

const mockGroups = [
  { id: 1, name: 'Frontend-01' },
  { id: 2, name: 'Backend-02' },
  { id: 3, name: 'Python-03' },
];

const mockStudents = {
  1: [
    { id: 101, name: 'Ali Karimov' },
    { id: 102, name: 'Vali Aliyev' },
    { id: 103, name: 'Olim Rustamov' }
  ],
  2: [
    { id: 201, name: 'Malika To\'rayeva' },
    { id: 202, name: 'Sardor Qosimov' }
  ],
  3: []
};

const groupOptions = mockGroups.map(g => ({ label: g.name, value: g.id }));

export default function StudentTransfer() {
  const [fromGroup, setFromGroup] = useState(mockGroups[0].id);
  const [toGroup, setToGroup] = useState(mockGroups[1].id);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Real loyihada bu state bo'lmasligi mumkin, lekin UI uchun:
  const [studentsData, setStudentsData] = useState(mockStudents);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = () => {
    if (!selectedStudent || fromGroup === toGroup) return;

    // Move student logic
    const student = studentsData[fromGroup].find(s => s.id === selectedStudent);
    if (!student) return;

    setStudentsData(prev => ({
      ...prev,
      [fromGroup]: prev[fromGroup].filter(s => s.id !== selectedStudent),
      [toGroup]: [...(prev[toGroup] || []), student]
    }));

    setSelectedStudent(null);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const fromStudents = studentsData[fromGroup] || [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <ArrowRightLeft className="text-indigo-600" size={32} />
          Talabalarni Ko'chirish
        </h1>
        <p className="text-gray-500 mt-2">Bir guruhdan ikkinchi guruhga talabalarni o'tkazish</p>
      </div>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={24} className="text-green-500" />
          <p className="font-medium">Talaba muvaffaqiyatli ko'chirildi!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start mt-8">
        
        {/* Left Panel (From Group) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 z-20">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Qaysi guruhdan</h2>
          <div className="mb-6">
            <CustomSelect 
              options={groupOptions}
              value={fromGroup} 
              onChange={val => { setFromGroup(val); setSelectedStudent(null); }}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Talabani tanlang:</h3>
            {fromStudents.map(student => (
              <label 
                key={student.id} 
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedStudent === student.id ? 'border-indigo-500 bg-indigo-50/50' : 'border-transparent hover:bg-gray-50'}`}
              >
                <input 
                  type="radio" 
                  name="student" 
                  className="hidden"
                  checked={selectedStudent === student.id}
                  onChange={() => setSelectedStudent(student.id)}
                />
                <UserCircle2 size={24} className={selectedStudent === student.id ? 'text-indigo-600' : 'text-gray-400'} />
                <span className={`font-medium ${selectedStudent === student.id ? 'text-indigo-900' : 'text-gray-700'}`}>
                  {student.name}
                </span>
              </label>
            ))}
            {fromStudents.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                Bu guruhda talabalar yo'q.
              </div>
            )}
          </div>
        </div>

        {/* Action Center */}
        <div className="flex flex-col items-center justify-center pt-8 md:pt-32">
           <button 
            onClick={handleTransfer}
            disabled={!selectedStudent || fromGroup === toGroup}
            className={`flex flex-col items-center justify-center h-16 w-16 rounded-full shadow-lg transition-all ${(!selectedStudent || fromGroup === toGroup) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-110 active:scale-95 cursor-pointer'}`}
           >
              <ArrowRight size={28} />
           </button>
           <span className="text-xs font-medium text-gray-500 mt-3 text-center">Ko'chirish</span>
        </div>

        {/* Right Panel (To Group) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 z-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Qaysi guruhga</h2>
          <div className="mb-6">
            <CustomSelect 
              options={groupOptions.filter(g => g.value !== fromGroup)}
              value={toGroup} 
              onChange={val => setToGroup(val)}
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Shu guruhdagi mavjud talabalar:</h3>
             {(studentsData[toGroup] || []).map(student => (
              <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                <UserCircle2 size={24} className="text-gray-400" />
                <span className="font-medium text-gray-700">
                  {student.name}
                </span>
              </div>
            ))}
            {(studentsData[toGroup] || []).length === 0 && (
               <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Hozircha talabalar yo'q.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
