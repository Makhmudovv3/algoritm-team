import React from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Users, BookOpen, Clock, MapPin, Edit2, MessageSquare, 
  MoreHorizontal, Wallet, CalendarDays, BarChart3, LayoutGrid
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem 
} from '@/components/ui/dropdown';

export function GroupProfileDrawer({ group, teacherName, courseName, roomName, isOpen, onClose, onEdit }) {
  if (!group) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="xl">
      <div className="flex flex-col h-full bg-slate-50 ">
        
        {/* Header - Premium CRM Style */}
        <div className="px-8 py-6 bg-white  border-b border-slate-100  shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-2xl bg-blue-50  text-blue-600 flex items-center justify-center text-3xl font-bold ring-1 ring-slate-200  shadow-sm shrink-0">
                {group.name.substring(0,2)}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 ">{group.name}</h2>
                  <Badge variant={group.is_active ? 'success' : 'danger'} className="h-6">
                    {group.is_active ? 'Faol' : 'Nofaol'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="font-mono text-xs">ID: GRP-{group.id.toString().padStart(4, '0')}</span>
                  <span>•</span>
                  <span className="flex items-center"><BookOpen className="h-3.5 w-3.5 mr-1" /> {courseName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(group)} className="bg-white ">
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
                  <DropdownMenuItem>Jadvalni o'zgartirish</DropdownMenuItem>
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
                  <TabsTrigger value="students" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">O'quvchilar</TabsTrigger>
                  <TabsTrigger value="schedule" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Jadval</TabsTrigger>
                  <TabsTrigger value="attendance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Davomat</TabsTrigger>
                  <TabsTrigger value="finance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Moliya</TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Tarix</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8 flex-1">
                <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Users className="h-4 w-4" /> <span className="text-xs font-medium">O'quvchilar</span>
                        </div>
                        <div className="text-xl font-bold">12 / 15</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <BarChart3 className="h-4 w-4" /> <span className="text-xs font-medium">Davomat</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">88%</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Wallet className="h-4 w-4" /> <span className="text-xs font-medium">Oylik Tushum</span>
                        </div>
                        <div className="text-xl font-bold">{new Intl.NumberFormat('uz-UZ').format(group.price * 12)}</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <CalendarDays className="h-4 w-4" /> <span className="text-xs font-medium">Darslar</span>
                        </div>
                        <div className="text-xl font-bold">24 / 36</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="students" className="mt-0 h-full animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 ">O'quvchilar ro'yxati (Tez orada)</h3>
                    <Button size="sm"><Users className="h-4 w-4 mr-2"/> O'quvchi qo'shish</Button>
                  </div>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Hali o'quvchilar qo'shilmagan</h3>
                    <p className="text-sm text-slate-500 max-w-[250px]">Bu guruhga o'quvchilarni biriktiring.</p>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="mt-0 h-full animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 ">Dars jadvali (Tez orada)</h3>
                  </div>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <CalendarDays className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Jadval tuzilmagan</h3>
                  </div>
                </TabsContent>

                <TabsContent value="attendance" className="mt-0 h-full animate-in fade-in duration-300">
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Davomat jurnali bo'sh</h3>
                  </div>
                </TabsContent>

                <TabsContent value="finance" className="mt-0 h-full animate-in fade-in duration-300">
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Moliya ma'lumotlari yo'q</h3>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 h-full animate-in fade-in duration-300">
                  <h3 className="text-sm font-semibold text-slate-900  mb-6">Tarix</h3>
                  <div className="relative pl-6 border-l border-slate-200  ml-3 space-y-8 pb-8">
                    <div className="relative">
                      <div className="absolute -left-[31px] h-4 w-4 rounded-full bg-slate-100  border-4 border-white " />
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-slate-900 ">Guruh yaratildi</span>
                        <span className="text-[11px] text-slate-500">{group.start_date ? group.start_date.substring(0,10) : 'Noma\'lum'}</span>
                      </div>
                    </div>
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
                <span className="text-xs text-slate-500 block mb-1">O'qituvchi</span>
                <span className="text-sm font-medium text-slate-900 ">{teacherName}</span>
              </div>
              <div className="h-px bg-slate-200  w-full" />
              <div>
                <span className="text-xs text-slate-500 block mb-1">Xona</span>
                <span className="text-sm font-medium text-slate-900 ">{roomName}</span>
              </div>
              <div className="h-px bg-slate-200  w-full" />
              <div>
                <span className="text-xs text-slate-500 block mb-1">Boshlanish sanasi</span>
                <span className="text-sm font-medium text-slate-900 ">{group.start_date ? group.start_date.substring(0,10) : '-'}</span>
              </div>
              <div className="h-px bg-slate-200  w-full" />
              <div>
                <span className="text-xs text-slate-500 block mb-1">Tugash sanasi</span>
                <span className="text-sm font-medium text-slate-900 ">{group.end_date ? group.end_date.substring(0,10) : '-'}</span>
              </div>
              <div className="h-px bg-slate-200  w-full" />
              <div>
                <span className="text-xs text-slate-500 block mb-1">Kurs narxi (Oylik)</span>
                <span className="text-sm font-medium text-emerald-600 ">{new Intl.NumberFormat('uz-UZ').format(group.price)} UZS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Drawer>
  );
}
