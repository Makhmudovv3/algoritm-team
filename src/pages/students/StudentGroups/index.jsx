import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, Calendar, ChevronRight, X, User } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader } from "../../../components/ui/page-header";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

const MOCK_GROUPS = [
  { id: 1, name: "Frontend React", teacher: "Firdavs (Siz)", studentsCount: 12, maxStudents: 15, schedule: "14:00 - 16:00", days: "Dush, Chor, Juma", status: "Active", students: ["Azizbek Rahimov", "Javohir Vohidov", "Sanjar Karimov", "Alisher Qodirov", "Botir Zokirov", "Nodir Bekov", "Umid Rahmonov", "Sardor Ibragimov", "Kamron Bekov", "Davron Muminov"] },
  { id: 2, name: "Python Backend", teacher: "Ali Valiyev", studentsCount: 15, maxStudents: 15, schedule: "16:00 - 18:00", days: "Sesh, Pay, Shan", status: "Full", students: ["Sardor Ibragimov", "Kamron Bekov", "Davron Muminov", "Akmal Rustamov", "Temur Malik", "Olim Hakimov"] },
  { id: 3, name: "English B2", teacher: "Malika opa", studentsCount: 8, maxStudents: 15, schedule: "10:00 - 12:00", days: "Dush, Chor, Juma", status: "Active", students: ["Madina Aliyeva", "Zarina Umarova", "Malika Rustamova", "Shahzoda Karimova"] },
];

export default function StudentGroups() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleOpenDetails = (group) => {
    setSelectedGroup(group);
    toast.success(`${group.name} ma'lumotlari ochildi!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <PageHeader 
        title="O'quvchi Guruhlari" 
        description="Guruhlar, o'qituvchilar va dars jadvallarini boshqarish."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_GROUPS.map((group, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            key={group.id}
          >
            <Card className="group hover:border-blue-200 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                    <p className="text-sm font-medium text-gray-500">O'qituvchi: <span className="text-gray-900">{group.teacher}</span></p>
                  </div>
                  <Badge variant={group.status === 'Active' ? 'default' : 'secondary'}>
                    {group.status === 'Full' ? 'To\'lgan' : 'Faol'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Vaqti</p>
                      <p className="text-sm font-semibold text-gray-900">{group.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Kunlar</p>
                      <p className="text-sm font-semibold text-gray-900">{group.days}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      O'quvchilar: <span className={group.studentsCount >= group.maxStudents ? "text-red-500" : ""}>{group.studentsCount} / {group.maxStudents}</span>
                    </span>
                  </div>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mr-4 pr-2" onClick={() => handleOpenDetails(group)}>
                    Batafsil
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSelectedGroup(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{selectedGroup.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">O'qituvchi: {selectedGroup.teacher}</p>
                </div>
                <button onClick={() => setSelectedGroup(null)} className="text-gray-400 hover:text-gray-600 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> 
                  Guruh o'quvchilari ({selectedGroup.studentsCount}/{selectedGroup.maxStudents})
                </h4>
                <div className="space-y-3">
                  {selectedGroup.students.map((student, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-900">{student}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>
                  Yopish
                </Button>
                <Button onClick={() => toast.info("Guruh sozlamalariga o'tilmoqda...")}>
                  Sozlamalar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
