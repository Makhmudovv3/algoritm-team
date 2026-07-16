import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, MoreHorizontal, MessageSquare, Phone, X, Edit, Trash, Check, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import { PageHeader } from "../../../components/ui/page-header";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const INITIAL_STUDENTS = [
  { id: 1, name: "Azizbek Rahimov", phone: "+998 (90) 123 45 67", group: "Frontend React (Mon, Wed, Fri)", status: "Active", financial: "Standard", balance: 150000 },
  { id: 2, name: "Sardor Ibragimov", phone: "+998 (91) 234 56 78", group: "Python Backend (Tue, Thu, Sat)", status: "Active", financial: "Debtor", balance: -200000 },
  { id: 3, name: "Madina Aliyeva", phone: "+998 (93) 345 67 89", group: "English B2 (Mon, Wed, Fri)", status: "Transferred", financial: "Grant", balance: 0 },
  { id: 4, name: "Javohir Vohidov", phone: "+998 (94) 456 78 90", group: "Frontend React (Mon, Wed, Fri)", status: "Dropped", financial: "Standard", balance: -50000 },
];

export default function Students() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('algoritm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem('algoritm_students', JSON.stringify(students));
  }, [students]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: "", phone: "", group: "Frontend React (Mon, Wed, Fri)", balance: 0, status: "Active", financial: "Standard" });
  const [openActionId, setOpenActionId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  // Filters state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFinancial, setFilterFinancial] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone.includes(searchQuery) ||
        student.group.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "All" || student.status === filterStatus;
      const matchesFinancial = filterFinancial === "All" || student.financial === filterFinancial;

      return matchesSearch && matchesStatus && matchesFinancial;
    });
  }, [searchQuery, students, filterStatus, filterFinancial]);

  const handleAddOrEditStudent = () => {
    if (editingStudent) {
      if (!editingStudent.name || !editingStudent.phone || editingStudent.phone.includes("_")) {
        toast.error("Iltimos, ism va telefonni to'g'ri to'ldiring!");
        return;
      }
      setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
      setEditingStudent(null);
      toast.success("O'quvchi ma'lumotlari yangilandi!");
    } else {
      if (!newStudent.name || !newStudent.phone || newStudent.phone.includes("_")) {
        toast.error("Iltimos, ism va telefonni to'g'ri to'ldiring!");
        return;
      }
      const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
      setStudents([{ id: newId, ...newStudent }, ...students]);
      setNewStudent({ name: "", phone: "", group: "Frontend React (Mon, Wed, Fri)", balance: 0, status: "Active", financial: "Standard" });
      setIsModalOpen(false);
      toast.success("O'quvchi muvaffaqiyatli qo'shildi!");
    }
  };

  const confirmDelete = () => {
    setStudents(students.filter(s => s.id !== deleteConfirmId));
    toast.success("O'quvchi o'chirildi!");
    setDeleteConfirmId(null);
    setOpenActionId(null);
  };

  const activeFiltersCount = (filterStatus !== "All" ? 1 : 0) + (filterFinancial !== "All" ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative"
      onClick={() => { setOpenActionId(null); setIsFilterOpen(false); }}
    >
      <PageHeader 
        title="O'quvchilar" 
        description="Barcha o'quvchilarni boshqarish va moliyaviy holatini kuzatish."
      >
        <div className="relative">
          <Button 
            variant={activeFiltersCount > 0 ? "default" : "outline"} 
            className="gap-2 relative" 
            onClick={(e) => { e.stopPropagation(); setIsFilterOpen(!isFilterOpen); setOpenActionId(null); }}
          >
            <Filter className="w-4 h-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                  <h4 className="font-semibold text-gray-900">Filtrlar</h4>
                  <button onClick={() => { setFilterStatus("All"); setFilterFinancial("All"); }} className="text-xs text-blue-600 hover:underline">
                    Tozalash
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Holat</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Active", "Transferred", "Dropped"].map(status => (
                        <button 
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors flex items-center gap-1
                            ${filterStatus === status ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {filterStatus === status && <Check className="w-3 h-3" />}
                          {status === "All" ? "Barchasi" : status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Moliya</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Standard", "Debtor", "Grant"].map(fin => (
                        <button 
                          key={fin}
                          onClick={() => setFilterFinancial(fin)}
                          className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors flex items-center gap-1
                            ${filterFinancial === fin ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {filterFinancial === fin && <Check className="w-3 h-3" />}
                          {fin === "All" ? "Barchasi" : fin === "Debtor" ? "Qarzdor" : fin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button className="gap-2" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); setEditingStudent(null); }}>
          <Plus className="w-4 h-4" />
          Yangi o'quvchi
        </Button>
      </PageHeader>

      <Card>
        <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50 rounded-t-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Ism, telefon yoki guruh bo'yicha qidiruv..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>F.I.SH</TableHead>
                <TableHead>Guruh</TableHead>
                <TableHead>Aloqa</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Moliya</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span className="text-xs">{student.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Active' ? 'success' : student.status === 'Transferred' ? 'secondary' : 'destructive'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={student.financial === 'Debtor' || student.balance < 0 ? 'destructive' : student.financial === 'Grant' ? 'secondary' : 'default'} className="w-fit">
                        {student.financial === 'Debtor' || student.balance < 0 ? 'Qarzdor' : student.financial}
                      </Badge>
                      <span className={`text-xs font-medium ${student.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {student.balance.toLocaleString()} UZS
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 relative">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toast.success(`${student.name} ga xabar yuborish ochildi!`); }}>
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === student.id ? null : student.id); setIsFilterOpen(false); }}>
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </Button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {openActionId === student.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                            className="absolute right-0 top-10 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10"
                          >
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setEditingStudent(student); 
                                setOpenActionId(null); 
                              }}
                            >
                              <Edit className="w-3.5 h-3.5" /> Tahrirlash
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setDeleteConfirmId(student.id); 
                                setOpenActionId(null); 
                              }}
                            >
                              <Trash className="w-3.5 h-3.5" /> O'chirish
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    O'quvchi topilmadi.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal overlay for Add/Edit Student */}
      <AnimatePresence>
        {(isModalOpen || editingStudent) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg">{editingStudent ? "O'quvchini tahrirlash" : "Yangi o'quvchi qo'shish"}</h3>
                <button onClick={() => { setIsModalOpen(false); setEditingStudent(null); }} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ism va Familiya</label>
                  <input 
                    type="text" 
                    value={editingStudent ? editingStudent.name : newStudent.name}
                    onChange={(e) => editingStudent ? setEditingStudent({...editingStudent, name: e.target.value}) : setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white" 
                    placeholder="Masalan: Alisher Valiyev" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon raqam</label>
                  <PatternFormat 
                    format="+998 (##) ### ## ##" 
                    allowEmptyFormatting 
                    mask="_" 
                    value={editingStudent ? editingStudent.phone : newStudent.phone}
                    onValueChange={(values) => {
                      const { formattedValue } = values;
                      if (editingStudent) setEditingStudent({...editingStudent, phone: formattedValue});
                      else setNewStudent({...newStudent, phone: formattedValue});
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Holat</label>
                  <select 
                    value={editingStudent ? editingStudent.status : newStudent.status}
                    onChange={(e) => editingStudent ? setEditingStudent({...editingStudent, status: e.target.value}) : setNewStudent({...newStudent, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white"
                  >
                    <option value="Active">Faol (Active)</option>
                    <option value="Transferred">O'tkazilgan (Transferred)</option>
                    <option value="Dropped">Tark etgan (Dropped)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Moliya</label>
                  <select 
                    value={editingStudent ? editingStudent.financial : newStudent.financial}
                    onChange={(e) => editingStudent ? setEditingStudent({...editingStudent, financial: e.target.value}) : setNewStudent({...newStudent, financial: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white"
                  >
                    <option value="Standard">Oddiy to'lov (Standard)</option>
                    <option value="Debtor">Qarzdor (Debtor)</option>
                    <option value="Grant">Grant (Grant)</option>
                  </select>
                </div>
                <div className="pt-2">
                  <Button className="w-full" onClick={handleAddOrEditStudent}>
                    {editingStudent ? "Saqlash" : "Qo'shish"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Haqiqatan ham o'chirmoqchimisiz?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Bu o'quvchining barcha ma'lumotlari tizimdan o'chib ketadi. Bu amalni ortga qaytarib bo'lmaydi.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirmId(null)}>
                  Bekor qilish
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>
                  O'chirish
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
