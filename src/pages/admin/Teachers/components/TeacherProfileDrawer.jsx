import React from 'react';
import { Calendar, Users, Wallet, Clock, GraduationCap } from 'lucide-react';
import { Drawer, DrawerHeader, DrawerBody, DrawerTitle } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function TeacherProfileDrawer({ isOpen, onClose, teacher, getUserName, getBranchName }) {
  if (!teacher) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl border-l border-slate-200 shadow-xl bg-white">
      <DrawerHeader className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-100">
            <GraduationCap size={24} />
          </div>
          <div className="flex-1 pt-1">
            <div className="flex justify-between items-start">
              <div>
                <DrawerTitle className="text-lg font-semibold text-slate-900">{getUserName(teacher.user_id)}</DrawerTitle>
                <p className="text-[13px] text-slate-500 mt-0.5">{getBranchName(teacher.branch_id)}</p>
              </div>
              <Badge variant={teacher.is_active ? 'success' : 'secondary'} className="text-[11px] px-2 py-0.5 font-medium">
                {teacher.is_active ? 'Faol' : 'Nofaol'}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-slate-600">
               <div className="flex items-center gap-1.5"><Wallet size={14} className="text-slate-400"/> {new Intl.NumberFormat('uz-UZ').format(teacher.salary_per_student)} UZS/o'q</div>
               <div className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {new Date().toLocaleDateString('uz-UZ')}</div>
            </div>
          </div>
        </div>
      </DrawerHeader>

      <DrawerBody className="p-0 bg-slate-50/30">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 bg-white border-b border-slate-200">
            <TabsList className="bg-transparent border-none p-0 space-x-6 h-auto">
              <TabsTrigger value="overview" className="pb-3 pt-3 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 text-slate-500 text-[13px] font-medium shadow-none">Dars Jadvali</TabsTrigger>
              <TabsTrigger value="groups" className="pb-3 pt-3 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 text-slate-500 text-[13px] font-medium shadow-none">Guruhlar</TabsTrigger>
              <TabsTrigger value="salary" className="pb-3 pt-3 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 text-slate-500 text-[13px] font-medium shadow-none">Maosh</TabsTrigger>
              <TabsTrigger value="timeline" className="pb-3 pt-3 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 text-slate-500 text-[13px] font-medium shadow-none">Tarix</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="overview">
              <div className="text-center py-10 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Calendar className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                <h3 className="text-[14px] font-medium text-slate-900">Dars jadvali yo'q</h3>
                <p className="text-[13px] text-slate-500 mt-1">Bu o'qituvchi uchun darslar belgilanmagan.</p>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="text-center py-10 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Users className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                <h3 className="text-[14px] font-medium text-slate-900">Guruhlar biriktirilmagan</h3>
                <p className="text-[13px] text-slate-500 mt-1">Hozircha guruhlarga dars o'tmaydi.</p>
              </div>
            </TabsContent>

            <TabsContent value="salary">
              <div className="text-center py-10 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Wallet className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                <h3 className="text-[14px] font-medium text-slate-900">Maosh tarixi</h3>
                <p className="text-[13px] text-slate-500 mt-1">To'lovlar bo'yicha ma'lumotlar bu yerda ko'rinadi.</p>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="text-center py-10 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Clock className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                <h3 className="text-[14px] font-medium text-slate-900">Faollik tarixi</h3>
                <p className="text-[13px] text-slate-500 mt-1">Barcha amallar shu yerda saqlanadi.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DrawerBody>
    </Drawer>
  );
}
