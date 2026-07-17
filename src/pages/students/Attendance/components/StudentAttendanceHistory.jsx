import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { EmptyTableState, AvatarInitials } from '@/components/ui/page-header';
import { History, CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';

export default function StudentAttendanceHistory({ attendances, students, groups, isLoading }) {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const studentOptions = [
    { label: "O'quvchini tanlang", value: '' },
    ...students.map(s => ({ label: s.fullname, value: s.id }))
  ];

  const history = useMemo(() => {
    if (!selectedStudentId) return [];

    let filtered = attendances.filter(a => a.student_id === selectedStudentId);

    if (dateRange.start) {
      filtered = filtered.filter(a => a.date && a.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(a => a.date && a.date <= dateRange.end);
    }

    // Sort newest first
    filtered.sort((a, b) => {
      const dA = new Date(a.date || 0).getTime();
      const dB = new Date(b.date || 0).getTime();
      return dB - dA;
    });

    return filtered.map(a => {
      const groupName = groups.find(g => g.id === a.group_id)?.name || "Noma'lum guruh";
      return { ...a, groupName };
    });
  }, [attendances, selectedStudentId, dateRange, groups]);

  const renderStatus = (status) => {
    switch(status) {
      case 'present': return { icon: CheckCircle2, text: 'Kelgan', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'absent': return { icon: XCircle, text: 'Kelmagan', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
      case 'excused': return { icon: AlertCircle, text: 'Sababli', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      default: return { icon: Calendar, text: "Noma'lum", color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200' };
    }
  };

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden min-h-[500px]">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <History className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Tarix</CardTitle>
              <p className="text-sm text-slate-500 mt-1">O'quvchining batafsil davomat xronologiyasi</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-64">
              <Select
                options={studentOptions}
                value={selectedStudentId}
                onChange={setSelectedStudentId}
              />
            </div>
            <div className="flex gap-2 items-center relative z-[60]">
              <div className="w-36">
                <DatePicker 
                  value={dateRange.start}
                  onChange={val => setDateRange(prev => ({...prev, start: val}))}
                  placeholder="Dan"
                />
              </div>
              <span className="text-slate-400">-</span>
              <div className="w-36">
                <DatePicker 
                  value={dateRange.end}
                  onChange={val => setDateRange(prev => ({...prev, end: val}))}
                  placeholder="Gacha"
                />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !selectedStudentId ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <History className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">O'quvchini tanlang</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Davomat tarixini ko'rish uchun yuqoridagi ro'yxatdan o'quvchini tanlang.
            </p>
          </div>
        ) : history.length === 0 ? (
          <EmptyTableState title="Tarix topilmadi" description="Ushbu o'quvchi uchun belgilangan oraliqda davomat yozuvlari mavjud emas." />
        ) : (
          <div className="p-6">
            <div className="relative border-l border-slate-200 ml-3 md:ml-6 space-y-8 pb-4">
              {history.map((record, index) => {
                const sData = renderStatus(record.status);
                const Icon = sData.icon;
                
                return (
                  <div key={record.id || index} className="relative pl-8 md:pl-10">
                    {/* Timeline dot */}
                    <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-2 bg-white flex items-center justify-center ${sData.border}`}>
                      <Icon className={`w-3.5 h-3.5 ${sData.color}`} />
                    </div>
                    
                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="absolute top-4 right-4 text-xs font-medium text-slate-400">
                        {record.date ? record.date.substring(0, 10) : '-'}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sData.bg} ${sData.color}`}>
                          {sData.text}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {record.groupName}
                        </span>
                      </div>
                      
                      {record.comment && (
                        <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="font-medium text-slate-700">Izoh: </span>
                          {record.comment}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
