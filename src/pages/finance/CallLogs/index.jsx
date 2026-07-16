import React, { useState } from 'react';

export default function CallLogs() {
  const [logs, setLogs] = useState([
    { id: 1, caller: 'Aziza Qosimova', phone: '+998 90 123 45 67', duration: '2m 15s', type: 'Incoming', date: '2026-07-16 14:20', notes: 'Interested in Frontend' },
    { id: 2, caller: 'Botir Rahimov', phone: '+998 93 987 65 43', duration: '5m 30s', type: 'Outgoing', date: '2026-07-16 11:45', notes: 'Payment reminder' },
    { id: 3, caller: 'Nodira Toirova', phone: '+998 99 111 22 33', duration: '1m 00s', type: 'Missed', date: '2026-07-16 09:10', notes: 'Call back later' },
    { id: 4, caller: 'Jasur Bek', phone: '+998 97 555 44 33', duration: '3m 45s', type: 'Incoming', date: '2026-07-15 16:30', notes: 'Complaint about schedule' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    caller: '',
    phone: '',
    duration: '',
    type: 'Incoming',
    notes: '',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ caller: '', phone: '', duration: '', type: 'Incoming', notes: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newLog = {
      id: logs.length > 0 ? Math.max(...logs.map((l) => l.id)) + 1 : 1,
      ...formData,
      date: now,
    };
    setLogs([newLog, ...logs]); // add to top
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Call Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage all incoming and outgoing calls.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleOpenModal} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            + Log Call
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Caller / Contact</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Duration</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6">Notes</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">#{log.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{log.caller}</td>
                  <td className="py-4 px-6">{log.phone}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      log.type === 'Incoming' ? 'bg-blue-100 text-blue-700' :
                      log.type === 'Outgoing' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">{log.duration}</td>
                  <td className="py-4 px-6">{log.date}</td>
                  <td className="py-4 px-6 text-gray-500 truncate max-w-[200px]" title={log.notes}>
                    {log.notes}
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button onClick={() => setItemToDelete(log.id)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">No call logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log a Call</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caller Name</label>
                <input required name="caller" value={formData.caller} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="+998" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                    <option value="Incoming">Incoming</option>
                    <option value="Outgoing">Outgoing</option>
                    <option value="Missed">Missed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleChange} type="text" placeholder="e.g. 2m 15s" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Haqiqatan ham o'chirmoqchimisiz?</h2>
            <p className="text-gray-500 text-sm mb-6">Bu amalni ortga qaytarib bo'lmaydi.</p>
            <div className="flex justify-center space-x-3">
              <button type="button" onClick={() => setItemToDelete(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Bekor qilish</button>
              <button type="button" onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">O'chirish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
