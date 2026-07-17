import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CardSkeleton } from '@/components/ui/skeleton';

const revenueData = [
  { name: 'Yan', total: 12000000 },
  { name: 'Fev', total: 15000000 },
  { name: 'Mar', total: 18000000 },
  { name: 'Apr', total: 16000000 },
  { name: 'May', total: 21000000 },
  { name: 'Iyun', total: 24000000 },
];

const attendanceData = [
  { name: 'Dush', present: 120, absent: 12 },
  { name: 'Sesh', present: 132, absent: 8 },
  { name: 'Chor', present: 118, absent: 15 },
  { name: 'Pay', present: 140, absent: 5 },
  { name: 'Juma', present: 135, absent: 10 },
  { name: 'Shan', present: 110, absent: 20 },
];

export function AnalyticsSection({ isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
        <CardSkeleton className="col-span-4 h-[350px]" />
        <CardSkeleton className="col-span-3 h-[350px]" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
      {/* Revenue Chart */}
      <Card className="col-span-4 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle>Moliya Dinamikasi</CardTitle>
          <CardDescription>Oylik to'lovlar va tushumlar grafigi</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 mt-auto">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--slate-200))" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#ffffff', color: '#0f172a', fontSize: '13px', padding: '8px 12px' }}
                  formatter={(value) => [`${value / 1000000} mln UZS`, "Tushum"]}
                />
                <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Chart */}
      <Card className="col-span-3 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle>Davomat Ko'rsatkichi</CardTitle>
          <CardDescription>Haftalik davomat statistikasi</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 mt-auto">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--slate-200))" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#ffffff', color: '#0f172a', fontSize: '13px', padding: '8px 12px' }}
                />
                <Bar dataKey="present" name="Kelgan" fill="#0f172a" radius={[4, 4, 0, 0]} className="" />
                <Bar dataKey="absent" name="Kelmagan" fill="#e2e8f0" radius={[4, 4, 0, 0]} className="" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
