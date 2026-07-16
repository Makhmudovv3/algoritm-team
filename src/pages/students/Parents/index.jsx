import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Phone, Mail, MoreVertical, Edit, Trash, X } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader } from "../../../components/ui/page-header";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const INITIAL_PARENTS = [
  { id: 1, name: "Rustam Rahimov", phone: "+998 90 987 65 43", students: ["Azizbek Rahimov"], email: "rustam@example.com" },
  { id: 2, name: "Dilnoza Ibragimova", phone: "+998 91 876 54 32", students: ["Sardor Ibragimov"], email: "dilnoza@example.com" },
  { id: 3, name: "Alisher Aliyev", phone: "+998 93 765 43 21", students: ["Madina Aliyeva"], email: "alisher@example.com" },
];

export default function Parents() {
  const [parents, setParents] = useState(INITIAL_PARENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [editingParent, setEditingParent] = useState(null);

  const filteredParents = useMemo(() => {
    return parents.filter(parent => 
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.phone.includes(searchQuery)
    );
  }, [searchQuery, parents]);

  const handleDelete = (id) => {
    setParents(parents.filter(p => p.id !== id));
    toast.success("Ota-ona ma'lumotlari o'chirildi!");
    setOpenActionId(null);
  };

  const handleEditSave = () => {
    if (!editingParent.name || !editingParent.phone) {
      toast.error("Ism va telefon kiritilishi shart!");
      return;
    }
    setParents(parents.map(p => p.id === editingParent.id ? editingParent : p));
    toast.success("Ma'lumotlar saqlandi!");
    setEditingParent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
      onClick={() => setOpenActionId(null)}
    >
      <PageHeader 
        title="Ota-onalar" 
        description="O'quvchilarning ota-onalari va ular bilan aloqa."
      />

      <div className="flex items-center mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Ism yoki telefon bo'yicha qidiruv..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {filteredParents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Ota-ona topilmadi.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParents.map((parent) => (
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} key={parent.id}>
              <Card className="h-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <CardContent className="p-6 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {parent.name.charAt(0)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="-mr-2 -mt-2" 
                      onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === parent.id ? null : parent.id); }}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>

                    {/* Action Menu */}
                    <AnimatePresence>
                      {openActionId === parent.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="absolute right-4 top-12 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10"
                        >
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setEditingParent(parent); 
                              setOpenActionId(null); 
                            }}
                          >
                            <Edit className="w-3.5 h-3.5" /> Tahrirlash
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            onClick={(e) => { e.stopPropagation(); handleDelete(parent.id); }}
                          >
                            <Trash className="w-3.5 h-3.5" /> O'chirish
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{parent.name}</h3>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {parent.phone}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {parent.email}
                    </div>
                    <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                        <Users className="w-3 h-3" />
                        Farzandlari
                      </div>
                      {parent.students.map((student, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                          {student}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingParent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg">Ota-onani tahrirlash</h3>
                <button onClick={() => setEditingParent(null)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ism va Familiya</label>
                  <input 
                    type="text" 
                    value={editingParent.name}
                    onChange={(e) => setEditingParent({...editingParent, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon raqam</label>
                  <input 
                    type="text" 
                    value={editingParent.phone}
                    onChange={(e) => setEditingParent({...editingParent, phone: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50/50 focus:bg-white" 
                  />
                </div>
                <div className="pt-2">
                  <Button className="w-full" onClick={handleEditSave}>
                    Saqlash
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
