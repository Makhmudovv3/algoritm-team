import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import CustomSelect from '@/components/CustomSelect';

import AttendanceHeader from './components/AttendanceHeader';
import AttendanceStats from './components/AttendanceStats';
import AttendanceTabs from './components/AttendanceTabs';
import DailyAttendance from './components/DailyAttendance';
import MonthlyAttendance from './components/MonthlyAttendance';
import AttendanceHeatmap from './components/AttendanceHeatmap';
import GroupAttendance from './components/GroupAttendance';
import TeacherAttendance from './components/TeacherAttendance';
import StudentAttendanceHistory from './components/StudentAttendanceHistory';

export default function Attendance() {
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    group_id: '',
    date: new Date().toISOString().substring(0, 10),
    status: 'present'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aData, sData, gData, tData] = await Promise.all([
        api.Attendance.getAll(),
        api.Students.getAll(),
        api.Groups.getAll(),
        api.Teachers.getAll()
      ]);
      setAttendances(aData);
      setStudents(sData);
      setGroups(gData);
      setTeachers(tData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Davomat');
    
    // Set column widths
    worksheet.columns = [
      { header: "O'quvchi", key: 'student', width: 25 },
      { header: 'Guruh', key: 'group', width: 15 },
      { header: 'Sana', key: 'date', width: 15 },
      { header: 'Holat', key: 'status', width: 15 },
    ];

    // Style headers
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;

    // Add data rows
    attendances.forEach(a => {
      const sName = students.find(s => s.id === a.student_id)?.fullname || "Noma'lum";
      const gName = groups.find(g => g.id === a.group_id)?.name || "Noma'lum";
      worksheet.addRow({
        student: sName,
        group: gName,
        date: a.date ? a.date.substring(0, 10) : '-',
        status: a.status === 'present' ? 'Kelgan' : 'Kelmagan'
      });
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = { vertical: 'middle', horizontal: 'left' };
        row.getCell('status').font = { 
          color: { argb: row.getCell('status').value === 'Kelgan' ? 'FF16A34A' : 'FFDC2626' },
          bold: true
        };
        // Add borders
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: {style:'thin', color: {argb:'FFE2E8F0'}},
            left: {style:'thin', color: {argb:'FFE2E8F0'}},
            bottom: {style:'thin', color: {argb:'FFE2E8F0'}},
            right: {style:'thin', color: {argb:'FFE2E8F0'}}
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'davomat.xlsx');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.group_id) return;
    
    try {
      const created = await api.Attendance.create(formData);
      setAttendances([created, ...attendances]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const studentOptions = students.map(s => ({ label: s.fullname, value: s.id }));
  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <div className="mb-6">
        <AttendanceHeader 
          onExport={handleExport} 
          onAdd={() => {
            setFormData({
              student_id: studentOptions[0]?.value || '',
              group_id: groupOptions[0]?.value || '',
              date: new Date().toISOString().substring(0, 10),
              status: 'present'
            });
            setIsModalOpen(true);
          }} 
        />
      </div>
      
      <AttendanceStats attendances={attendances} />
      
      <div className="mb-6">
        <AttendanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div>
        {activeTab === 'daily' && (
          <DailyAttendance 
            attendances={attendances} 
            students={students} 
            groups={groups} 
            isLoading={isLoading} 
          />
        )}
        {activeTab === 'monthly' && (
          <MonthlyAttendance 
            attendances={attendances} 
            students={students} 
            groups={groups}
            teachers={teachers}
            isLoading={isLoading} 
          />
        )}
        {activeTab === 'heatmap' && (
          <AttendanceHeatmap 
            attendances={attendances} 
            isLoading={isLoading} 
          />
        )}
        {activeTab === 'groups' && (
          <GroupAttendance 
            attendances={attendances} 
            groups={groups}
            students={students}
            teachers={teachers}
            isLoading={isLoading} 
          />
        )}
        {activeTab === 'teachers' && (
          <TeacherAttendance 
            attendances={attendances} 
            groups={groups}
            teachers={teachers}
            isLoading={isLoading} 
          />
        )}
        {activeTab === 'history' && (
          <StudentAttendanceHistory 
            attendances={attendances} 
            students={students}
            groups={groups}
            isLoading={isLoading} 
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Davomat qo'shish">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">O'quvchi</label>
            <CustomSelect options={studentOptions} value={formData.student_id} onChange={val => setFormData({...formData, student_id: val})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Guruh</label>
            <CustomSelect options={groupOptions} value={formData.group_id} onChange={val => setFormData({...formData, group_id: val})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sana</label>
              <DatePicker required value={formData.date} onChange={val => setFormData({...formData, date: val})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Holat</label>
              <CustomSelect 
                options={[
                  { label: 'Kelgan', value: 'present' },
                  { label: 'Kelmagan', value: 'absent' }
                ]} 
                value={formData.status} 
                onChange={val => setFormData({...formData, status: val})} 
              />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="w-full">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
