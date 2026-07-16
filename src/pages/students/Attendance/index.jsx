import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Save, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
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

const INITIAL_ATTENDANCE = [
  { id: 1, name: "Azizbek Rahimov", status: "present", reason: "", locked: false },
  { id: 2, name: "Sardor Ibragimov", status: "absent", reason: "Kasal (Ota onasiga telefon qilindi)", locked: true },
  { id: 3, name: "Madina Aliyeva", status: "late", reason: "Tirbandlik", locked: true },
  { id: 4, name: "Javohir Vohidov", status: "present", reason: "", locked: false },
];

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState(INITIAL_ATTENDANCE);
  const [reasonModal, setReasonModal] = useState(null); // { id, name, status, tempReason }

  const handleStatusClick = (student, newStatus) => {
    if (student.locked) return; // Cannot change if locked

    if (newStatus === 'absent' || newStatus === 'late') {
      setReasonModal({
        id: student.id,
        name: student.name,
        status: newStatus,
        tempReason: student.reason || ""
      });
    } else {
      setAttendanceList(prev => prev.map(s => 
        s.id === student.id ? { ...s, status: newStatus, reason: '' } : s
      ));
    }
  };

  const handleSaveReason = () => {
    if (!reasonModal.tempReason.trim()) {
      toast.error("Iltimos, sababni yozing!");
      return;
    }
    setAttendanceList(prev => prev.map(s => 
      s.id === reasonModal.id ? { ...s, status: reasonModal.status, reason: reasonModal.tempReason, locked: true } : s
    ));
    toast.success("Sabab saqlandi va holat qulflangan!");
    setReasonModal(null);
  };

  const handleGlobalSave = () => {
    // Optionally lock everything that has a status
    setAttendanceList(prev => prev.map(s => ({ ...s, locked: true })));
    toast.success("Barcha davomatlar saqlandi va yopildi!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative"
    >
      <PageHeader 
        title="Davomat (Attendance)" 
        description="Guruhlar bo'yicha davomat olish va sabablarni kiritish."
      >
        <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={handleGlobalSave}>
          <Save className="w-4 h-4" />
          Saqlash
        </Button>
      </PageHeader>

      <Card>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
          <div className="font-semibold text-gray-900">
            Frontend React - <span className="text-blue-600">Bugungi davomat (16-Iyul)</span>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>F.I.SH</TableHead>
                <TableHead className="text-center">Keldi</TableHead>
                <TableHead className="text-center">Kelmadi</TableHead>
                <TableHead className="text-center">Kech qoldi</TableHead>
                <TableHead className="w-[30%]">Holat/Sabab</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceList.map((student) => (
                <TableRow key={student.id} className={student.locked ? "bg-gray-50/50" : ""}>
                  <TableCell className="font-medium text-gray-900">
                    {student.name}
                    {student.locked && <Badge variant="outline" className="ml-2 text-[10px]">Saqlangan</Badge>}
                  </TableCell>
                  <TableCell className="text-center">
                    <button 
                      onClick={() => handleStatusClick(student, 'present')}
                      disabled={student.locked}
                      className={`p-2 rounded-full transition-colors ${student.status === 'present' ? 'bg-green-100 text-green-600 shadow-sm' : 'text-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent'}`}>
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button 
                      onClick={() => handleStatusClick(student, 'absent')}
                      disabled={student.locked}
                      className={`p-2 rounded-full transition-colors ${student.status === 'absent' ? 'bg-red-100 text-red-600 shadow-sm' : 'text-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent'}`}>
                      <XCircle className="w-6 h-6" />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button 
                      onClick={() => handleStatusClick(student, 'late')}
                      disabled={student.locked}
                      className={`p-2 rounded-full transition-colors ${student.status === 'late' ? 'bg-amber-100 text-amber-600 shadow-sm' : 'text-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent'}`}>
                      <Clock className="w-6 h-6" />
                    </button>
                  </TableCell>
                  <TableCell>
                    {student.reason ? (
                      <span className="text-sm text-gray-600 italic bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm inline-block">
                        {student.reason}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reason Modal */}
      <AnimatePresence>
        {reasonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setReasonModal(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-5 h-5 ${reasonModal.status === 'absent' ? 'text-red-500' : 'text-amber-500'}`} />
                  <h3 className="font-bold text-gray-900">Sababni kiritish</h3>
                </div>
                <button onClick={() => setReasonModal(null)} className="text-gray-400 hover:text-gray-600 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 p-1.5 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  <span className="font-bold text-gray-900">{reasonModal.name}</span> nima uchun {reasonModal.status === 'absent' ? 'kelmadi' : 'kech qoldi'}?
                </p>
                <textarea 
                  autoFocus
                  value={reasonModal.tempReason}
                  onChange={(e) => setReasonModal({...reasonModal, tempReason: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white resize-none min-h-[100px]"
                  placeholder="Sababni batafsil yozing..."
                ></textarea>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setReasonModal(null)}>
                  Bekor qilish
                </Button>
                <Button className="flex-1" onClick={handleSaveReason}>
                  Saqlash
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
