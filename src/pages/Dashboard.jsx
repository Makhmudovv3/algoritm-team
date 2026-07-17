import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';

import { DashboardHeader } from './dashboard/components/DashboardHeader';
import { ExecutiveKpiGrid } from './dashboard/components/ExecutiveKpiGrid';
import { AnalyticsCharts } from './dashboard/components/AnalyticsCharts';
import { ReportsPlaceholder } from './dashboard/components/ReportsPlaceholder';
import { exportDashboardToExcel, exportSpecificReport } from '../lib/exportUtils';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    groups: 0,
    teachers: 0,
    revenue: 0,
    finance: 0,
    attendanceRate: '0%',
    growthRate: '0%'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [students, groups, teachers, payments, attendance] = await Promise.all([
          api.Students.getAll(),
          api.Groups.getAll(),
          api.Teachers.getAll(),
          api.Payments.getAll(),
          api.Attendance.getAll()
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
        
        // Mock calculations for missing specific data
        const attendanceRate = attendance.length ? '89%' : '92%'; // Mock
        const growthRate = '+14%'; // Mock
        const financeOutflow = 0; // Mock

        setStats({
          students: students.length,
          groups: groups.length,
          teachers: teachers.length,
          revenue: totalRevenue,
          finance: totalRevenue - financeOutflow,
          attendanceRate,
          growthRate
        });
      } catch (error) {
        console.error("Dashboard yuklashda xato:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleExport = () => {
    exportDashboardToExcel(stats);
  };

  const handleFilterChange = (range) => {
    setIsLoading(true);
    // Simulate API delay for fetching new date range data
    setTimeout(() => {
      // Create slight variations in stats to simulate data changing
      const variance = Math.random() * 0.2 + 0.9; // random between 0.9 and 1.1
      setStats(prev => ({
        ...prev,
        revenue: Math.floor(prev.revenue * variance),
        students: Math.floor(prev.students * variance),
      }));
      setIsLoading(false);
    }, 600);
  };

  const handleReportExport = (type) => {
    exportSpecificReport(type, stats);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1600px] mx-auto pb-12 px-6"
    >
      <DashboardHeader onExport={handleExport} onFilterChange={handleFilterChange} />
      
      <div className="flex flex-col gap-8">
        <ExecutiveKpiGrid stats={stats} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <AnalyticsCharts isLoading={isLoading} />
          </div>
          <div className="xl:col-span-1">
            <ReportsPlaceholder isLoading={isLoading} onExport={handleReportExport} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
