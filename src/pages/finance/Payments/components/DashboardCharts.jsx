import React, { useMemo } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';

export default function DashboardCharts({ payments = [] }) {
  const monthlyData = useMemo(() => {
    const data = {};
    payments.forEach(p => {
      const d = new Date(p.date || p.created_at || new Date());
      const month = d.toLocaleString('uz-UZ', { month: 'short' });
      if (!data[month]) data[month] = { name: month, total: 0 };
      data[month].total += Number(p.sum) || 0;
    });
    return Object.values(data);
  }, [payments]);

  const typeData = useMemo(() => {
    const data = { cash: 0, card: 0, bank: 0 };
    payments.forEach(p => {
      if (p.type === 'cash') data.cash += Number(p.sum) || 0;
      else if (p.type === 'card') data.card += Number(p.sum) || 0;
      else if (p.type === 'bank') data.bank += Number(p.sum) || 0;
      else data.cash += Number(p.sum) || 0;
    });
    return [
      { name: 'Naqd pul', value: data.cash, color: '#3b82f6' },
      { name: 'Plastik karta', value: data.card, color: '#10b981' },
      { name: 'Bank orqali', value: data.bank, color: '#f59e0b' }
    ].filter(item => item.value > 0);
  }, [payments]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-[#FFFFFF] rounded-lg border-[#E2E8F0] shadow-sm flex flex-col">
        <CardHeader className="border-b border-[#E2E8F0] pb-3 pt-4 px-4 shrink-0">
          <h3 className="text-[14px] font-medium text-[#0F172A] flex items-center gap-2">
            <BarChart3 className="text-[#64748B]" size={16} />
            Oylik tushum
          </h3>
        </CardHeader>
        <div className="p-6 flex-1 min-h-[250px]">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>

                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tickMargin={12} tick={{ fill: '#64748B', fontWeight: 500 }} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val >= 1000 ? val / 1000 + 'k' : val}`} tickMargin={12} tick={{ fill: '#64748B', fontWeight: 500 }} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => [new Intl.NumberFormat('uz-UZ').format(value) + ' UZS', 'Tushum']} contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }} />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[#64748B] text-[13px]">
              <BarChart3 size={32} className="mb-3 opacity-20 text-[#64748B]" />
              <p>Ma'lumot topilmadi.</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-[#FFFFFF] rounded-lg border-[#E2E8F0] shadow-sm flex flex-col">
        <CardHeader className="border-b border-[#E2E8F0] pb-3 pt-4 px-4 shrink-0">
          <h3 className="text-[14px] font-medium text-[#0F172A] flex items-center gap-2">
            <PieChartIcon className="text-[#64748B]" size={16} />
            To'lov usullari
          </h3>
        </CardHeader>
        <div className="p-6 flex-1 min-h-[250px]">
          {typeData.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [new Intl.NumberFormat('uz-UZ').format(value) + ' UZS', 'Summa']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[#64748B] text-[13px]">
              <PieChartIcon size={32} className="mb-3 opacity-20 text-[#64748B]" />
              <p>Ma'lumot topilmadi.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
