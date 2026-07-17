import React from 'react';
import { SectionCard } from '@/components/ui/page-header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Yan', revenue: 12000 },
  { month: 'Fev', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 21000 },
  { month: 'Iyun', revenue: 24000 },
];

const attendanceData = [
  { day: 'Dush', present: 95, absent: 5 },
  { day: 'Sesh', present: 88, absent: 12 },
  { day: 'Chor', present: 92, absent: 8 },
  { day: 'Pay', present: 90, absent: 10 },
  { day: 'Juma', present: 85, absent: 15 },
  { day: 'Shan', present: 70, absent: 30 },
];

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  fontSize: '12px',
  padding: '8px 12px',
};

const SKELETON = ({ height = 260 }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 animate-pulse">
    <div className="h-4 w-32 rounded bg-slate-100 mb-4" />
    <div className={`rounded-lg bg-slate-100`} style={{ height }} />
  </div>
);

export function AnalyticsCharts({ isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <SKELETON height={240} />
        <SKELETON height={240} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Daromad o'sishi" description="Oylik daromad tendensiyasi">
        <div className="h-[240px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} tickFormatter={v => `$${v / 1000}k`} width={45} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={v => [`$${v.toLocaleString()}`, 'Daromad']} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2} fill="url(#rev)" dot={{ r: 3, fill: '#ffffff', stroke: '#0f172a', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#0f172a', stroke: '#ffffff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Haftalik davomat" description="Kelganlar va Kelmaganlar">
        <div className="h-[240px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }} barSize={12} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} tickFormatter={v => `${v}%`} width={45} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="present" name="Kelgan" fill="#3b82f6" radius={[4, 4, 4, 4]} />
              <Bar dataKey="absent"  name="Kelmagan"  fill="#e2e8f0" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
