import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Shield } from 'lucide-react';
import { api } from '../../../services/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import CustomSelect from '@/components/CustomSelect';
import { PageHeader } from '@/components/ui/page-header';

export default function Users() {
  const [data, setData] = useState({ roles: [], users: [], loading: true });
  const [filters, setFilters] = useState({ search: '', role: '' });
  const [modal, setModal] = useState({ open: false, editingId: null, deleteId: null });
  const [form, setForm] = useState({ fullname: '', phone: '+998 ', email: '', role_id: '', is_active: 'true' });

  useEffect(() => {
    Promise.all([api.Users.getAll(), api.Roles.getAll()])
      .then(([users, roles]) => setData({ users, roles, loading: false }))
      .catch(console.error);
  }, []);

  const roleOpts = data.roles.map(r => ({ label: r.name, value: r.id }));
  const getRoleName = id => data.roles.find(r => r.id === id)?.name || 'Unknown';

  const filtered = data.users.filter(u => {
    const s = filters.search.toLowerCase();
    return ((u.fullname||'').toLowerCase().includes(s) || (u.email||'').toLowerCase().includes(s)) &&
           (filters.role ? u.role_id === filters.role : true);
  });

  const openModal = (u = null) => {
    setForm(u ? { fullname: u.fullname, phone: u.phone, email: u.email, role_id: u.role_id, is_active: String(u.is_active) } : { fullname: '', phone: '+998 ', email: '', role_id: roleOpts[0]?.value || '', is_active: 'true' });
    setModal({ ...modal, open: true, editingId: u?.id || null });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const p = { ...form, is_active: form.is_active === 'true' };
      if (modal.editingId) {
        const up = await api.Users.update(modal.editingId, p);
        setData(d => ({ ...d, users: d.users.map(x => x.id === modal.editingId ? up : x) }));
      } else {
        const cr = await api.Users.create({ ...p, password_hash: 'mock' });
        setData(d => ({ ...d, users: [...d.users, cr] }));
      }
      setModal({ ...modal, open: false });
    } catch (err) { console.error(err); }
  };

  const del = async () => {
    try {
      await api.Users.delete(modal.deleteId);
      setData(d => ({ ...d, users: d.users.filter(u => u.id !== modal.deleteId) }));
      setModal({ ...modal, deleteId: null });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-8">
      <PageHeader
        title="Xodimlar"
        description="Tizim foydalanuvchilari va xodimlarni boshqarish"
        actions={
          <Button size="sm" onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            Yangi xodim
          </Button>
        }
      />

      <Card className="border-slate-200 shadow-sm bg-white overflow-visible rounded-lg">
        <div className="p-3 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-3 relative z-20">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ism yoki email bo'yicha qidiruv..."
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
              className="h-8 w-full pl-8 pr-3 text-[13px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="w-full sm:w-48 h-8">
            <CustomSelect options={[{label: "Barcha rollar", value: ""}, ...roleOpts]} value={filters.role} onChange={v => setFilters({...filters, role: v})} />
          </div>
        </div>
        
        {data.loading ? (
          <div className="flex justify-center py-12"><div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Xodim</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Aloqa</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Rol</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 uppercase">Holat</TableHead>
                  <TableHead className="h-8 px-3 py-2 text-[13px] font-medium text-slate-500 text-right w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-[13px] text-slate-500">Xodimlar topilmadi</TableCell></TableRow>
                ) : (
                  filtered.map(user => (
                    <TableRow key={user.id} className="group hover:bg-slate-50/50 border-b border-slate-100 last:border-0 transition-colors">
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-medium text-[11px] uppercase">
                            {user.fullname.charAt(0)}
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-900">{user.fullname}</div>
                            <div className="text-[12px] text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-[13px] text-slate-600">{user.phone}</TableCell>
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                          <Shield size={12} className="text-slate-400" />
                          <span>{getRoleName(user.role_id)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <Badge variant="outline" className={`text-[11px] h-5 px-1.5 font-medium border-0 ${user.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {user.is_active ? 'Faol' : 'Nofaol'}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" onClick={() => openModal(user)}><Edit2 size={12} /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" onClick={() => setModal({...modal, deleteId: user.id})}><Trash2 size={12} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Modal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} title={modal.editingId ? 'Xodimni tahrirlash' : "Yangi xodim"}>
        <form onSubmit={save} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-700">F.I.Sh. (To'liq ism)</label>
            <input required value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} className="h-8 w-full px-3 text-[13px] border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Masalan: Sardor Karimov" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-700">Telefon raqam</label>
            <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="h-8 w-full px-3 text-[13px] border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-700">Email</label>
            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="h-8 w-full px-3 text-[13px] border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="sardor@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-slate-700">Rol</label>
              <div className="h-8"><CustomSelect options={roleOpts} value={form.role_id} onChange={v => setForm({...form, role_id: v})} /></div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-slate-700">Holat</label>
              <div className="h-8"><CustomSelect options={[{label:'Faol',value:'true'},{label:'Nofaol',value:'false'}]} value={form.is_active} onChange={v => setForm({...form, is_active: v})} /></div>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
            <Button type="button" variant="outline" className="h-8 text-[13px] px-3 border-slate-200" onClick={() => setModal({...modal, open: false})}>Bekor qilish</Button>
            <Button type="submit" className="h-8 text-[13px] px-3 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Saqlash</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!modal.deleteId} onClose={() => setModal({...modal, deleteId: null})} title="Xodimni o'chirish">
        <div className="pt-4">
          <p className="text-[13px] text-slate-600 mb-6">Rostdan ham bu xodimni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Button variant="outline" className="h-8 text-[13px] px-3 border-slate-200" onClick={() => setModal({...modal, deleteId: null})}>Bekor qilish</Button>
            <Button variant="destructive" className="h-8 text-[13px] px-3 bg-red-600 hover:bg-red-700 text-white shadow-sm" onClick={del}>O'chirish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
