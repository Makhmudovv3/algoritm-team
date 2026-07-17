import React from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem 
} from '@/components/ui/dropdown';
import { 
  Phone, Mail, MapPin, Edit2, BookOpen, Clock, Activity, 
  FolderOpen, MessageSquare, MoreHorizontal, Wallet, CalendarDays, 
  UserCheck, AlertCircle, FileText, Download
} from 'lucide-react';
import { motion } from 'framer-motion';

export function StudentProfileDrawer({ student, isOpen, onClose, onEdit }) {
  if (!student) return null;

  const initials = student.fullname.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="xl">
      <div className="flex flex-col h-full bg-slate-50 ">
        
        {/* Header - Premium CRM Style */}
        <div className="px-8 py-6 bg-white  border-b border-slate-100  shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <Avatar initials={initials} size="xl" className="h-20 w-20 text-xl ring-1 ring-slate-200  shadow-sm" />
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 ">{student.fullname}</h2>
                  <Badge variant={student.is_active ? 'success' : 'danger'} className="h-6">
                    {student.is_active ? 'Faol' : 'Nofaol'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="font-mono text-xs">ID: STU-{student.id.toString().padStart(4, '0')}</span>
                  <span>•</span>
                  <span className="flex items-center"><Phone className="h-3.5 w-3.5 mr-1" /> {student.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(student)} className="bg-white ">
                <Edit2 className="h-4 w-4 mr-2" /> Tahrirlash
              </Button>
              <Button variant="outline" size="sm" className="bg-white ">
                <MessageSquare className="h-4 w-4 mr-2" /> Xabar
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 bg-white ">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="right" className="w-48">
                  <DropdownMenuItem>Guruhga o'tkazish</DropdownMenuItem>
                  <DropdownMenuItem>To'lov qo'shish</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 ">O'chirish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Main Content Area (Left) */}
          <div className="flex-1 overflow-y-auto bg-white  lg:border-r border-slate-100 ">
            <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
              <div className="px-8 border-b border-slate-100  sticky top-0 bg-white/95  backdrop-blur-md z-10 shrink-0">
                <TabsList className="bg-transparent h-14 p-0 space-x-8">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Umumiy</TabsTrigger>
                  <TabsTrigger value="attendance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Davomat</TabsTrigger>
                  <TabsTrigger value="payments" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">To'lovlar</TabsTrigger>
                  <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Qaydlar</TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Tarix</TabsTrigger>
                  <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Hujjatlar</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8 flex-1">
                <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in duration-300">
                  
                  {/* Overview Compact Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <UserCheck className="h-4 w-4" /> <span className="text-xs font-medium">Davomat</span>
                        </div>
                        <div className="text-xl font-bold">92%</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Wallet className="h-4 w-4" /> <span className="text-xs font-medium">Balans</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">To'langan</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <BookOpen className="h-4 w-4" /> <span className="text-xs font-medium">Guruhlar</span>
                        </div>
                        <div className="text-xl font-bold">1 ta</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <CalendarDays className="h-4 w-4" /> <span className="text-xs font-medium">Qo'shilgan</span>
                        </div>
                        <div className="text-xl font-bold">12 May</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Current Groups */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-900 ">Faol Guruhlar</h3>
                      <Button variant="ghost" size="sm" className="text-slate-500 h-8">Barchasini ko'rish</Button>
                    </div>
                    <div className="border border-slate-100  rounded-xl overflow-hidden">
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50  transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-slate-100  flex items-center justify-center text-slate-600  group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900  text-sm">Ingliz tili B2 (Mock)</div>
                            <div className="text-xs text-slate-500 mt-0.5">Dush-Chor-Juma • 14:00</div>
                          </div>
                        </div>
                        <Badge variant="info">Jarayonda</Badge>
                      </div>
                    </div>
                  </section>

                </TabsContent>

                <TabsContent value="attendance" className="mt-0 h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-in fade-in duration-300">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Davomat jurnali bo'sh</h3>
                    <p className="text-sm text-slate-500 max-w-[250px]">O'quvchi hali darslarga qatnashishni boshlamagan yoki jurnal to'ldirilmagan.</p>
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="mt-0 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 ">To'lovlar tarixi</h3>
                    <Button size="sm"><Wallet className="h-4 w-4 mr-2"/> To'lov qo'shish</Button>
                  </div>
                  <Card className="shadow-none border-slate-200 ">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50/50  hover:bg-slate-50/50 border-b border-slate-200 ">
                          <TableHead className="h-10 text-xs">Sana</TableHead>
                          <TableHead className="h-10 text-xs">Miqdor</TableHead>
                          <TableHead className="h-10 text-xs">Turi</TableHead>
                          <TableHead className="h-10 text-xs">Status</TableHead>
                          <TableHead className="h-10 text-xs text-right">Chek</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-[13px]">12 May, 2026</TableCell>
                          <TableCell className="text-[13px] font-medium">450,000 UZS</TableCell>
                          <TableCell className="text-[13px] text-slate-500">Naqd pul</TableCell>
                          <TableCell><Badge variant="success">To'langan</Badge></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900"><Download className="h-4 w-4"/></Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-0 h-full animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 ">Qaydlar</h3>
                    <Button size="sm" variant="outline"><FileText className="h-4 w-4 mr-2"/> Yangi qayd</Button>
                  </div>
                  <Card className="shadow-none border-slate-200  p-5 bg-yellow-50/50 ">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar initials="AD" size="xs" className="h-6 w-6" />
                        <span className="text-xs font-medium text-slate-700 ">Admin</span>
                        <span className="text-xs text-slate-400">• 14 May, 15:30</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-3 w-3"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="right">
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">O'chirish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-slate-700  leading-relaxed mt-1">
                      O'quvchining ota-onasi bilan gaplashildi. Keyingi oydan Matematika kursiga ham qo'shilmoqchi. Joy ajratib qo'yish kerak.
                    </p>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 h-full animate-in fade-in duration-300">
                  <h3 className="text-sm font-semibold text-slate-900  mb-6">Tarix</h3>
                  <div className="relative pl-6 border-l border-slate-200  ml-3 space-y-8 pb-8">
                    <div className="relative">
                      <div className="absolute -left-[31px] h-4 w-4 rounded-full bg-slate-100  border-4 border-white " />
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-slate-900 ">Profil yaratildi</span>
                        <span className="text-[11px] text-slate-500">12 May 2026, 10:00</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] h-4 w-4 rounded-full bg-slate-100  border-4 border-white " />
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-slate-900 ">Guruhga qo'shildi: Ingliz tili B2</span>
                        <span className="text-[11px] text-slate-500">12 May 2026, 10:05</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] h-4 w-4 rounded-full bg-slate-100  border-4 border-white " />
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-slate-900 ">To'lov qabul qilindi (450,000 UZS)</span>
                        <span className="text-[11px] text-slate-500">12 May 2026, 10:15</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="mt-0 h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-in fade-in duration-300">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <FolderOpen className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Hujjatlar yo'q</h3>
                    <p className="text-sm text-slate-500 max-w-[250px]">Shartnoma, pasport nushasi yoki boshqa fayllarni yuklang.</p>
                    <Button variant="outline" className="mt-6">Fayl yuklash</Button>
                  </div>
                </TabsContent>

              </div>
            </Tabs>
          </div>

          {/* Right Side Summary */}
          <div className="w-full lg:w-80 bg-slate-50  p-8 overflow-y-auto hidden md:block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Xulosa</h3>
            
            <div className="space-y-6">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Telefon</span>
                <span className="text-sm font-medium text-slate-900 ">{student.phone}</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Ota-ona / Vasiy</span>
                <span className="text-sm font-medium text-slate-900 ">Ma'lumot yo'q</span>
                <span className="text-xs text-blue-600 block mt-1 cursor-pointer hover:underline">Qo'shish</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Filial</span>
                <span className="text-sm font-medium text-slate-900 ">Chilonzor Filiali</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Qo'shilgan sana</span>
                <span className="text-sm font-medium text-slate-900 ">12 May 2026</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Drawer>
  );
}
