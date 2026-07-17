import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { calculateAttendanceStats } from '../../../../utils/attendance';
import { CalendarDays } from 'lucide-react';
import { Select } from '@/components/ui/select';

export default function AttendanceHeatmap({ attendances, isLoading }) {
  const currentYearNum = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(currentYearNum);

  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push({ label: `${currentYearNum - i}-yil`, value: currentYearNum - i });
    }
    return years;
  }, [currentYearNum]);

  // Aggregate attendances by date: map[dateString] = { total, present, absent }
  const heatMapData = useMemo(() => {
    const map = {};
    attendances.forEach(a => {
      if (!a.date) return;
      const d = a.date.substring(0, 10);
      if (!map[d]) {
        map[d] = { total: 0, present: 0, absent: 0, excused: 0 };
      }
      map[d].total++;
      if (a.status === 'present') map[d].present++;
      else if (a.status === 'absent') map[d].absent++;
      else if (a.status === 'excused') map[d].excused++;
    });
    return map;
  }, [attendances]);

  // Generate 365 days for the current year
  const daysInYear = useMemo(() => {
    const days = [];
    const startDate = new Date(currentYear, 0, 1);
    
    // Find the first Monday of the year to start the grid (optional, but standard for these graphs)
    // For simplicity, we just generate exactly the days of the year, starting from Jan 1.
    // GitHub actually aligns to weeks (Sun-Sat or Mon-Sun). Let's align to Monday-Sunday weeks.
    
    let current = new Date(startDate);
    // Rewind to Monday
    const dayOfWeek = current.getDay();
    const diff = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is sunday
    current.setDate(diff);

    // We generate 52 or 53 weeks
    for (let i = 0; i < 53 * 7; i++) {
      const dateStr = current.toISOString().substring(0, 10);
      
      let colorClass = "bg-slate-100 hover:bg-slate-200"; // default / no data / 0%
      let percentage = 0;
      let text = "0%";
      let countText = "Ma'lumot yo'q";

      if (current.getFullYear() === currentYear) {
        const data = heatMapData[dateStr];
        if (data && data.total > 0) {
          const stats = calculateAttendanceStats([{ status: 'present' }].concat(Array(data.total-1).fill({status:'absent'}))); // Mocking for util, actually we have direct counts
          percentage = Math.round((data.present / (data.present + data.absent + data.excused)) * 100);
          
          if (percentage > 90) colorClass = "bg-emerald-600 hover:bg-emerald-700";
          else if (percentage > 70) colorClass = "bg-emerald-400 hover:bg-emerald-500";
          else if (percentage > 40) colorClass = "bg-yellow-400 hover:bg-yellow-500";
          else colorClass = "bg-red-500 hover:bg-red-600"; // 1-40%
          
          text = `${percentage}%`;
          countText = `${data.present} ta kelgan, ${data.absent} ta kelmagan`;
        }
      } else {
        colorClass = "bg-transparent"; // Out of bounds for the year
      }

      days.push({
        date: new Date(current),
        dateStr,
        colorClass,
        text,
        countText,
        inCurrentYear: current.getFullYear() === currentYear
      });
      current.setDate(current.getDate() + 1);
    }

    // chunk into weeks (arrays of 7 days)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [currentYear, heatMapData]);

  const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm bg-white min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Faollik xaritasi</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Yillik umumiy davomat darajasi</p>
          </div>
        </div>
        <Select 
          options={yearOptions}
          value={currentYear}
          onChange={val => setCurrentYear(Number(val))}
          className="w-36"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto premium-scrollbar pb-6">
          <div className="min-w-[800px]">
            <div className="flex text-xs text-slate-400 mb-2 pl-8">
              {months.map((m, i) => (
                <div key={m} className="flex-1" style={{minWidth: '40px'}}>{m}</div>
              ))}
            </div>
            <div className="flex gap-1.5">
              <div className="flex flex-col gap-1.5 text-xs text-slate-400 pr-2 py-1 justify-between">
                <div>Dush</div>
                <div>Chor</div>
                <div>Juma</div>
              </div>
              <div className="flex gap-1.5 flex-1">
                {daysInYear.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1.5">
                    {week.map((day, dIndex) => (
                      <div 
                        key={dIndex} 
                        className={`w-3.5 h-3.5 rounded-[2px] ${day.colorClass} relative group transition-colors`}
                        title={day.inCurrentYear ? `${day.dateStr}: ${day.text} (${day.countText})` : ''}
                      >
                        {/* Tooltip implementation via title prop for simplicity, but could be custom absolute div */}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 text-xs text-slate-500 mt-4">
          <span>Past</span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-[2px] bg-slate-100"></div>
            <div className="w-3.5 h-3.5 rounded-[2px] bg-red-500"></div>
            <div className="w-3.5 h-3.5 rounded-[2px] bg-yellow-400"></div>
            <div className="w-3.5 h-3.5 rounded-[2px] bg-emerald-400"></div>
            <div className="w-3.5 h-3.5 rounded-[2px] bg-emerald-600"></div>
          </div>
          <span>Yuqori</span>
        </div>
      </CardContent>
    </Card>
  );
}
