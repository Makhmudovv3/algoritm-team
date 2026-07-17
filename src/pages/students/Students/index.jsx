import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { StudentsHeader } from './components/StudentsHeader';
import { StudentsStats } from './components/StudentsStats';
import { StudentsToolbar } from './components/StudentsToolbar';
import { StudentsFilters } from './components/StudentsFilters';
import { StudentsTable } from './components/StudentsTable';
import { StudentProfileDrawer } from './components/StudentProfileDrawer';
import { StudentFormModal } from './components/StudentFormModal';
import ConfirmModal from '@/components/ConfirmModal';

export default function Students() {
  // Data State
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  // Additional Data State
  const [groups, setGroups] = useState([]);
  const [studentGroups, setStudentGroups] = useState([]);

  // Selection State
  const [selectedIds, setSelectedIds] = useState([]);

  // UI Flow State
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [totalDebt, setTotalDebt] = useState(0);

  // Form Data
  const initialForm = { fullname: '', phone: '+998 ', branch_id: '', parent_id: '', is_active: 'true', gender: '', birthday: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sData, bData, pData, pendingData, gData, sgData] = await Promise.all([
        api.Students.getAll(), 
        api.Branches.getAll(), 
        api.Parents.getAll(), 
        api.PendingPayments.getAll(),
        api.Groups.getAll(),
        api.StudentGroups.getAll()
      ]);
      setStudents(sData);
      setBranches(bData);
      setParents(pData);
      setGroups(gData);
      setStudentGroups(sgData);
      
      const debt = pendingData.reduce((sum, item) => sum + (Number(item.sum) || 0), 0);
      setTotalDebt(debt);
    } finally {
      setIsLoading(false);
    }
  };

  const branchOptions = branches.map(b => ({ label: b.name, value: b.id }));
  const parentOptions = parents.map(p => ({ label: p.name, value: p.id }));
  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));

  const filteredStudents = students.filter(s => {
    const matchSearch = (s.fullname || '').toLowerCase().includes(searchQuery.toLowerCase()) || (s.phone || '').includes(searchQuery);
    const matchBranch = branchFilter ? String(s.branch_id) === String(branchFilter) : true;
    const matchStatus = statusFilter ? String(s.is_active) === statusFilter : true;
    const matchGroup = groupFilter ? studentGroups.some(sg => sg.group_id === groupFilter && sg.student_id === s.id) : true;
    return matchSearch && matchBranch && matchStatus && matchGroup;
  });

  const handleOpenForm = (student = null) => {
    if (student) {
      setEditingId(student.id);
      setFormData({
        fullname: student.fullname, 
        phone: student.phone,
        branch_id: student.branch_id, 
        parent_id: student.parent_id || '',
        is_active: String(student.is_active),
        gender: student.gender || '',
        birthday: student.birthday || ''
      });
    } else {
      setEditingId(null);
      setFormData({ ...initialForm, branch_id: branchOptions[0]?.value || '' });
    }
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone || !formData.branch_id) return;
    try {
      const payload = { ...formData, is_active: formData.is_active === 'true' };
      if (!payload.parent_id) delete payload.parent_id;

      if (editingId) {
        const updated = await api.Students.update(editingId, payload);
        setStudents(students.map(s => s.id === editingId ? updated : s));
        if (viewingStudent?.id === editingId) setViewingStudent(updated);
      } else {
        const created = await api.Students.create(payload);
        setStudents([...students, created]);
      }
      setIsFormOpen(false);
    } catch(err) { console.error(err); }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Students.delete(deleteConfirmId);
        setStudents(students.filter(s => s.id !== deleteConfirmId));
        setDeleteConfirmId(null);
        setSelectedIds(prev => prev.filter(id => id !== deleteConfirmId));
      } catch (err) { console.error(err); }
    }
  };

  const handleToggleSelect = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedIds(selectedIds.length === filteredStudents.length ? [] : filteredStudents.map(s => s.id));

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('O\'quvchilar');
    
    // Set column widths
    worksheet.columns = [
      { header: 'F.I.SH', key: 'fullname', width: 30 },
      { header: 'Telefon', key: 'phone', width: 22 },
      { header: 'Jinsi', key: 'gender', width: 15 },
      { header: 'Tug\'ilgan sanasi', key: 'birthday', width: 20 },
      { header: 'Status', key: 'is_active', width: 15 }
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' } // Blue-600
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 30;

    // Add data
    filteredStudents.forEach(s => {
      worksheet.addRow({
        fullname: s.fullname,
        phone: s.phone,
        gender: s.gender === 'Male' ? 'Erkak' : s.gender === 'Female' ? 'Ayol' : '-',
        birthday: s.birthday || '-',
        is_active: s.is_active ? 'Faol' : 'Nofaol'
      });
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        // Add borders to all cells
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
        };
        
        // Data rows specific alignment
        if (rowNumber > 1) {
          cell.alignment = { vertical: 'middle', horizontal: colNumber === 1 ? 'left' : 'center' };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Oquvchilar_Royxati_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleImport = async (file) => {
    setIsLoading(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);
      
      const worksheet = workbook.worksheets[0];
      if (!worksheet) throw new Error("Excel faylida varaq topilmadi");

      const newStudents = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        // Assuming format: fullname, phone, gender, birthday, is_active
        const fullname = row.getCell(1).value?.toString();
        const phone = row.getCell(2).value?.toString();
        
        if (fullname && phone) {
          newStudents.push({
            fullname,
            phone,
            branch_id: branchOptions[0]?.value || '', // Default branch
            is_active: true
          });
        }
      });

      // Create all students
      for (const studentData of newStudents) {
        const created = await api.Students.create(studentData);
        setStudents(prev => [...prev, created]);
      }
      
      // Refresh full data just in case
      await fetchData();
    } catch (err) {
      console.error("Import xatosi:", err);
      alert("Faylni o'qishda xatolik yuz berdi. Iltimos, to'g'ri Excel fayl yuklang.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <StudentsHeader onAddStudent={() => handleOpenForm()} onExport={handleExport} onImport={handleImport} />
      <StudentsStats students={students} totalDebt={totalDebt} />
      
      <StudentsToolbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedCount={selectedIds.length} 
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
      />
      
      <StudentsFilters 
        isOpen={isFiltersOpen}
        branchOptions={branchOptions} branchFilter={branchFilter} setBranchFilter={setBranchFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        groupOptions={groupOptions} groupFilter={groupFilter} setGroupFilter={setGroupFilter}
        onReset={() => { setBranchFilter(''); setStatusFilter(''); setGroupFilter(''); }}
      />

      <StudentsTable 
        students={filteredStudents} branches={branches} parents={parents}
        isLoading={isLoading} selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect} onSelectAll={handleSelectAll}
        onView={setViewingStudent} onEdit={handleOpenForm} onDelete={setDeleteConfirmId}
        onClearFilters={() => { setSearchQuery(''); setBranchFilter(''); setStatusFilter(''); setGroupFilter(''); }}
      />

      <StudentProfileDrawer 
        student={viewingStudent} isOpen={!!viewingStudent} 
        onClose={() => setViewingStudent(null)} onEdit={handleOpenForm} 
      />

      <StudentFormModal 
        isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} editingId={editingId}
        formData={formData} setFormData={setFormData} handleSave={handleSave}
        branchOptions={branchOptions} parentOptions={parentOptions}
      />

      <ConfirmModal 
        isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} onConfirm={handleDeleteConfirm} 
      />
    </div>
  );
}
