import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
import { generateInitialPassword } from '@/utils/helpers';
import { StudentsHeader } from './components/StudentsHeader';
import { StudentsStats } from './components/StudentsStats';
import { StudentsToolbar } from './components/StudentsToolbar';
import { StudentsFilters } from './components/StudentsFilters';
import { StudentsTable } from './components/StudentsTable';
import { StudentProfileDrawer } from './components/StudentProfileDrawer';
import { StudentFormModal } from './components/StudentFormModal';
import { StudentDeleteDialog } from './components/StudentDeleteDialog';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const [groups, setGroups] = useState([]);
  const [studentGroups, setStudentGroups] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);

  const initialForm = { fullname: '', phone: '+998 ', branch_id: '', parent_id: '', parent_name: '', parent_phone: '+998 ', is_active: 'true', gender: '', birthday: '' };
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
      const existingParent = student.parent_id ? parents.find(p => String(p.id) === String(student.parent_id)) : null;
      setEditingId(student.id);
      setFormData({
        fullname: student.fullname, 
        phone: student.phone,
        branch_id: student.branch_id, 
        parent_id: student.parent_id || '',
        parent_name: existingParent ? existingParent.name : '',
        parent_phone: existingParent ? existingParent.phone : '+998 ',
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

  const handleSave = async () => {
    if (!formData.fullname || !formData.phone || !formData.branch_id || !formData.birthday) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }
    
    try {
      const existingStudent = await api.Students.findBy('phone', formData.phone);
      if (existingStudent && existingStudent.id !== editingId) {
        toast.error("Ushbu telefon raqami allaqachon ro'yxatdan o'tgan");
        return;
      }
    } catch (err) {}

    setIsFormLoading(true);
    let createdParentId = null;

    try {
      const payload = { ...formData, is_active: formData.is_active === 'true' };
      delete payload.parent_name;
      delete payload.parent_phone;
      
      if (formData.parent_name && formData.parent_name.trim()) {
        const pName = formData.parent_name.trim();
        let parentObj = parents.find(p => p.name.toLowerCase() === pName.toLowerCase());
        
        if (!parentObj) {
          const pPhone = formData.parent_phone && formData.parent_phone.length > 6 ? formData.parent_phone : payload.phone;
          const newParent = await api.Parents.create({
            name: pName,
            phone: pPhone, 
            relation: 'Noma\'lum',
            password_hash: generateInitialPassword(pPhone)
          });
          parentObj = newParent;
          createdParentId = newParent.id;
          setParents(prev => [...prev, newParent]);
        }
        payload.parent_id = parentObj.id;
      } else {
        delete payload.parent_id;
      }

      if (!editingId) {
        payload.password_hash = generateInitialPassword(payload.phone);
      }

      if (editingId) {
        const updated = await api.Students.update(editingId, payload);
        setStudents(students.map(s => s.id === editingId ? updated : s));
        if (viewingStudent?.id === editingId) setViewingStudent(updated);
        toast.success("O'quvchi ma'lumotlari yangilandi");
      } else {
        const created = await api.Students.create(payload);
        setStudents([...students, created]);
        toast.success("Yangi o'quvchi muvaffaqiyatli qo'shildi");
      }
      setIsFormOpen(false);
    } catch(err) { 
      console.error(err);
      toast.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      
      if (createdParentId) {
        try {
          await api.Parents.delete(createdParentId);
          setParents(prev => prev.filter(p => p.id !== createdParentId));
        } catch (rollbackErr) {
          console.error("Rollback failed", rollbackErr);
        }
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await api.Students.delete(deleteConfirmId);
        setStudents(students.filter(s => s.id !== deleteConfirmId));
        setDeleteConfirmId(null);
        setSelectedIds(prev => prev.filter(id => id !== deleteConfirmId));
        toast.success("O'quvchi muvaffaqiyatli o'chirildi");
      } catch (err) { 
        console.error(err); 
        toast.error("O'chirishda xatolik yuz berdi");
      }
    }
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      for (const id of selectedIds) {
        await api.Students.delete(id);
      }
      setStudents(students.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      setIsBulkDeleteOpen(false);
      toast.success(`${selectedIds.length} ta o'quvchi muvaffaqiyatli o'chirildi`);
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const handleToggleSelect = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedIds(selectedIds.length === filteredStudents.length ? [] : filteredStudents.map(s => s.id));

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('O\'quvchilar');
    
    worksheet.columns = [
      { header: 'F.I.SH', key: 'fullname', width: 30 },
      { header: 'Telefon', key: 'phone', width: 22 },
      { header: 'Jinsi', key: 'gender', width: 15 },
      { header: 'Tug\'ilgan sanasi', key: 'birthday', width: 20 },
      { header: 'Status', key: 'is_active', width: 15 }
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 30;

    filteredStudents.forEach(s => {
      worksheet.addRow({
        fullname: s.fullname,
        phone: s.phone,
        gender: s.gender === 'Male' ? 'Erkak' : s.gender === 'Female' ? 'Ayol' : '-',
        birthday: s.birthday || '-',
        is_active: s.is_active ? 'Faol' : 'Nofaol'
      });
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
        };
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
        if (rowNumber === 1) return;

        const fullname = row.getCell(1).value?.toString();
        const phone = row.getCell(2).value?.toString();
        
        if (fullname && phone) {
          newStudents.push({
            fullname,
            phone,
            branch_id: branchOptions[0]?.value || '',
            is_active: true
          });
        }
      });

      for (const studentData of newStudents) {
        const created = await api.Students.create(studentData);
        setStudents(prev => [...prev, created]);
      }
      
      await fetchData();
    } catch (err) {
      console.error("Import xatosi:", err);
      toast.error("Faylni o'qishda xatolik yuz berdi. Iltimos, to'g'ri Excel fayl yuklang.");
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
        onDeleteSelected={() => setIsBulkDeleteOpen(true)}
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

      {isFormOpen && (
        <StudentFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
          branchOptions={branchOptions}
          isLoading={isFormLoading}
        />
      )}

      <StudentDeleteDialog 
        isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} onConfirm={handleDeleteConfirm} 
      />

      <StudentDeleteDialog 
        isOpen={isBulkDeleteOpen} onClose={() => setIsBulkDeleteOpen(false)} onConfirm={handleBulkDeleteConfirm}
        isMultiple={true} count={selectedIds.length}
      />
    </div>
  );
}
