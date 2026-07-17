import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart3, Users, GraduationCap, CreditCard, Layers, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { month: 'Yan', revenue: 45 },
  { month: 'Fev', revenue: 52 },
  { month: 'Mar', revenue: 68 },
  { month: 'Apr', revenue: 74 },
  { month: 'May', revenue: 85 },
  { month: 'Iyun', revenue: 102 },
];

const mockGroups = [
  { id: 1, name: 'Frontend React 01', teacher: 'Sardor Karimov', students: 18, status: 'Faol' },
  { id: 2, name: 'Backend Node 04', teacher: 'Alisher Otabekov', students: 15, status: 'Faol' },
  { id: 3, name: 'English B2', teacher: 'Malika Rustamova', students: 12, status: 'Yopilgan' },
];

const mockTeachers = [
  { id: 1, name: 'Sardor Karimov', subject: 'Frontend', phone: '+998 90 123 45 67', groups: 3 },
  { id: 2, name: 'Alisher Otabekov', subject: 'Backend', phone: '+998 93 987 65 43', groups: 4 },
];

const mockStudents = [
  { id: 1, name: 'Azizbek Rahmonov', group: 'Frontend React 01', phone: '+998 99 111 22 33', payment: 'To\'langan' },
  { id: 2, name: 'Zarina Aliyeva', group: 'Backend Node 04', phone: '+998 90 555 44 33', payment: 'Qarzdorlik' },
];

const mockTransactions = [
  { id: 1, date: '17 Iyul, 2026', type: 'Kirim', amount: '+ 450,000 UZS', status: 'Muvaffaqiyatli' },
  { id: 2, date: '16 Iyul, 2026', type: 'Xarajat', amount: '- 1,200,000 UZS', status: 'Ijroda' },
];

export default function BranchDetailsDrawer({ isOpen, onClose, branch }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  const handleDownloadReport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Moliya Hisoboti');

      // Title
      worksheet.addRow([`${branch.name} - Moliya va Daromad Hisoboti`]);
      worksheet.mergeCells('A1:D1');
      worksheet.getCell('A1').font = { size: 14, bold: true };
      worksheet.getCell('A1').alignment = { horizontal: 'center' };
      worksheet.addRow([]); 

      // Headers
      const headerRow = worksheet.addRow(['Sana', 'Tranzaksiya Turi', 'Miqdor', 'Holat']);
      headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        cell.font = { bold: true, color: { argb: 'FF334155' } };
        cell.border = {
          top: {style:'thin', color: {argb:'FFE2E8F0'}},
          left: {style:'thin', color: {argb:'FFE2E8F0'}},
          bottom: {style:'thin', color: {argb:'FFE2E8F0'}},
          right: {style:'thin', color: {argb:'FFE2E8F0'}}
        };
      });

      // Data
      mockTransactions.forEach(tx => {
        const row = worksheet.addRow([tx.date, tx.type, tx.amount, tx.status]);
        row.eachCell((cell) => {
          cell.border = {
            top: {style:'thin', color: {argb:'FFE2E8F0'}},
            left: {style:'thin', color: {argb:'FFE2E8F0'}},
            bottom: {style:'thin', color: {argb:'FFE2E8F0'}},
            right: {style:'thin', color: {argb:'FFE2E8F0'}}
          };
        });
        
        if (tx.type === 'Kirim') {
          row.getCell(2).font = { color: { argb: 'FF059669' } };
          row.getCell(3).font = { color: { argb: 'FF059669' }, bold: true };
        } else {
          row.getCell(2).font = { color: { argb: 'FFDC2626' } };
          row.getCell(3).font = { color: { argb: 'FFDC2626' }, bold: true };
        }
      });

      worksheet.getColumn(1).width = 20;
      worksheet.getColumn(2).width = 20;
      worksheet.getColumn(3).width = 25;
      worksheet.getColumn(4).width = 20;

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${branch.name.replace(/\s+/g, '_')}_Moliya.xlsx`);
      toast.success('Hisobot muvaffaqiyatli yuklab olindi!');
    } catch (error) {
      console.error(error);
      toast.error('Hisobot yuklashda xatolik yuz berdi');
    }
  };

  if (!branch) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right" className="max-w-2xl sm:max-w-[600px]">
      <DrawerHeader className="pb-0 bg-slate-50/50 ">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <DrawerTitle className="text-xl">{branch.name}</DrawerTitle>
              <Badge variant="success" className="font-normal">Faol</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 ">
              <MapPin size={14} />
              <span>{branch.address}</span>
            </div>
          </div>
        </div>
      </DrawerHeader>

      <DrawerBody className="p-0">
        <Tabs defaultValue="statistics" className="w-full h-full flex flex-col">
          <div className="px-6 border-b border-slate-200  bg-slate-50/50  pt-2">
            <TabsList className="bg-transparent space-x-2 h-auto p-0 mb-[-1px]">
              <TabsTrigger value="statistics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                <BarChart3 size={16} className="mr-2" /> Statistika
              </TabsTrigger>
              <TabsTrigger value="groups" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                <Layers size={16} className="mr-2" /> Guruhlar
              </TabsTrigger>
              <TabsTrigger value="teachers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                <Users size={16} className="mr-2" /> O'qituvchilar
              </TabsTrigger>
              <TabsTrigger value="students" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                <GraduationCap size={16} className="mr-2" /> O'quvchilar
              </TabsTrigger>
              <TabsTrigger value="revenue" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                <CreditCard size={16} className="mr-2" /> Daromad
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <TabsContent value="statistics" className="mt-0 outline-none">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-slate-200  bg-white ">
                  <p className="text-sm text-slate-500 mb-1">Jami O'quvchilar</p>
                  <h4 className="text-2xl font-bold text-slate-900 ">1,245</h4>
                </div>
                <div className="p-4 rounded-xl border border-slate-200  bg-white ">
                  <p className="text-sm text-slate-500 mb-1">Jami Guruhlar</p>
                  <h4 className="text-2xl font-bold text-slate-900 ">42</h4>
                </div>
                <div className="p-4 rounded-xl border border-slate-200  bg-white ">
                  <p className="text-sm text-slate-500 mb-1">O'qituvchilar</p>
                  <h4 className="text-2xl font-bold text-slate-900 ">18</h4>
                </div>
                <div className="p-4 rounded-xl border border-slate-200  bg-white ">
                  <p className="text-sm text-slate-500 mb-1">O'rtacha davomat</p>
                  <h4 className="text-2xl font-bold text-slate-900 ">94%</h4>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white h-64 flex flex-col">
                <h4 className="text-[13px] font-medium text-slate-700 mb-4">Oylik o'sish grafigi</h4>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="branchRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} tickFormatter={v => `${v}M`} width={45} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)', fontSize: '12px', padding: '8px 12px' }} 
                        formatter={v => [`${v}M UZS`, 'Daromad']} 
                        cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} 
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#branchRev)" dot={{ r: 3, fill: '#ffffff', stroke: '#2563eb', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="mt-0 outline-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Guruhlar ro'yxati</h3>
                <button 
                  onClick={() => handleNavigate('/academic/groups')}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-[12px] font-medium hover:bg-blue-100 transition-colors"
                >
                  + Yangi guruh
                </button>
              </div>
              <div className="space-y-3">
                {mockGroups.map(g => (
                  <div key={g.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900">{g.name}</p>
                        <p className="text-[12px] text-slate-500">{g.teacher} • {g.students} o'quvchi</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[11px] h-5 px-1.5 font-medium border-0 ${g.status === 'Faol' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {g.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teachers" className="mt-0 outline-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-900">O'qituvchilar bazasi</h3>
                <button 
                  onClick={() => handleNavigate('/admin/teachers')}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-[12px] font-medium hover:bg-blue-100 transition-colors"
                >
                  + O'qituvchi qo'shish
                </button>
              </div>
              <div className="space-y-3">
                {mockTeachers.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-medium text-[13px]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900">{t.name}</p>
                        <p className="text-[12px] text-slate-500">{t.subject} • {t.phone}</p>
                      </div>
                    </div>
                    <div className="text-[12px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
                      {t.groups} guruh
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-0 outline-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-900">O'quvchilar hisobi</h3>
                <button 
                  onClick={() => handleNavigate('/students/students')}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-[12px] font-medium hover:bg-blue-100 transition-colors"
                >
                  O'quvchilarni ko'rish
                </button>
              </div>
              <div className="space-y-3">
                {mockStudents.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900">{s.name}</p>
                        <p className="text-[12px] text-slate-500">{s.group} • {s.phone}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[11px] h-5 px-1.5 font-medium border-0 ${s.payment === 'To\'langan' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {s.payment}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="mt-0 outline-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Moliya va Daromad</h3>
                <button 
                  onClick={handleDownloadReport}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-md text-[12px] font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Hisobot yuklash
                </button>
              </div>
              <div className="space-y-3">
                {mockTransactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Kirim' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900">{tx.type}</p>
                        <p className="text-[12px] text-slate-500">{tx.date} • <span className={tx.status === 'Muvaffaqiyatli' ? 'text-emerald-600' : 'text-amber-600'}>{tx.status}</span></p>
                      </div>
                    </div>
                    <div className={`text-[13px] font-semibold ${tx.type === 'Kirim' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DrawerBody>
    </Drawer>
  );
}
