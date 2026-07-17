import React from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Phone, Mail, MapPin, Edit2, Users, CreditCard, Calendar, History, Wallet, UserCheck, MessageSquare, BookOpen, MoreHorizontal } from 'lucide-react';

export function ParentProfileDrawer({ isOpen, onClose, parent }) {
  if (!parent) return null;

  const initials = parent.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'O';

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
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 ">{parent.name}</h2>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="font-mono text-xs">ID: PAR-{parent.id?.toString().padStart(4, '0') || '0000'}</span>
                  <span>•</span>
                  <span className="flex items-center"><Phone className="h-3.5 w-3.5 mr-1" /> {parent.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white ">
                <MessageSquare className="h-4 w-4 mr-2" /> Xabar
              </Button>
            </div>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Main Content Area (Left) */}
          <div className="flex-1 overflow-y-auto bg-white  lg:border-r border-slate-100 ">
            <Tabs defaultValue="children" className="w-full h-full flex flex-col">
              <div className="px-8 border-b border-slate-100  sticky top-0 bg-white/95  backdrop-blur-md z-10 shrink-0">
                <TabsList className="bg-transparent h-14 p-0 space-x-8">
                  <TabsTrigger value="children" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Farzandlar</TabsTrigger>
                  <TabsTrigger value="payments" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">To'lovlar</TabsTrigger>
                  <TabsTrigger value="attendance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Davomat</TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 =active]:border-white data-[state=active]:text-slate-900 =active]:text-white text-slate-500 rounded-none h-14 px-0 transition-none">Tarix</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8 flex-1">
                <TabsContent value="children" className="mt-0 space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Users className="h-4 w-4" /> <span className="text-xs font-medium">Farzandlar</span>
                        </div>
                        <div className="text-xl font-bold">0 ta</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-none border-slate-200 ">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Wallet className="h-4 w-4" /> <span className="text-xs font-medium">Balans</span>
                        </div>
                        <div className="text-xl font-bold text-slate-900 ">0 UZS</div>
                      </CardContent>
                    </Card>
                  </div>

                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-900 ">Biriktirilgan Farzandlar</h3>
                    </div>
                    <div className="border border-slate-100  rounded-xl overflow-hidden">
                      <div className="p-8 text-center bg-slate-50/50 ">
                        <div className="h-12 w-12 rounded-full bg-slate-100  flex items-center justify-center mx-auto mb-3">
                          <Users className="h-6 w-6 text-slate-400" />
                        </div>
                        <h4 className="text-sm font-medium text-slate-900  mb-1">Farzandlar topilmadi</h4>
                        <p className="text-xs text-slate-500">O'quvchilar bo'limidan ushbu ota-onaga farzand biriktiring.</p>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="payments" className="mt-0 h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-in fade-in duration-300">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">To'lovlar yo'q</h3>
                    <p className="text-sm text-slate-500 max-w-[250px]">Ota-ona hali hech qanday to'lov amalga oshirmagan.</p>
                  </div>
                </TabsContent>

                <TabsContent value="attendance" className="mt-0 h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-in fade-in duration-300">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50  flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-slate-300 " />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900  mb-1">Davomat ma'lumoti yo'q</h3>
                    <p className="text-sm text-slate-500 max-w-[250px]">Farzandlarning davomat tarixi shu yerda ko'rsatiladi.</p>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 h-full animate-in fade-in duration-300">
                  <h3 className="text-sm font-semibold text-slate-900  mb-6">Tarix</h3>
                  <div className="relative pl-6 border-l border-slate-200  ml-3 space-y-8 pb-8">
                    <div className="relative">
                      <div className="absolute -left-[31px] h-4 w-4 rounded-full bg-slate-100  border-4 border-white " />
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-slate-900 ">Ota-ona profili yaratildi</span>
                        <span className="text-[11px] text-slate-500">Yaqinda</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Side Summary */}
          <div className="w-full lg:w-80 bg-slate-50  p-8 overflow-y-auto hidden md:block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Aloqa Ma'lumotlari</h3>
            
            <div className="space-y-6">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Telefon</span>
                <span className="text-sm font-medium text-slate-900 ">{parent.phone}</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Email pochta</span>
                <span className="text-sm font-medium text-slate-900 ">{parent.email || "Ko'rsatilmagan"}</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Manzil</span>
                <span className="text-sm font-medium text-slate-900 ">{parent.address || "Ko'rsatilmagan"}</span>
              </div>
              
              <div className="h-px bg-slate-200  w-full" />
              
              <div>
                <span className="text-xs text-slate-500 block mb-1">Parol</span>
                <span className="text-sm font-mono text-slate-900 ">{parent.password || "Ko'rsatilmagan"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Drawer>
  );
}
