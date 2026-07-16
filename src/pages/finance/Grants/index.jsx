import React, { useState } from 'react';

export default function Grants() {
  const [grants, setGrants] = useState([
    { id: 1, studentName: 'Dildora Umarova', amount: '1,000,000 UZS', dateAwarded: '2026-07-01', reason: 'Top Student', status: 'Approved' },
    { id: 2, studentName: 'Bekzod Karimov', amount: '500,000 UZS', dateAwarded: '2026-07-05', reason: 'Financial Aid', status: 'Pending' },
    { id: 3, studentName: 'Sardor Ibragimov', amount: '750,000 UZS', dateAwarded: '2026-06-20', reason: 'Competition Winner', status: 'Approved' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    amount: '',
    reason: '',
    dateAwarded: '',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ studentName: '', amount: '', reason: '', dateAwarded: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrant = {
      id: grants.length > 0 ? Math.max(...grants.map((g) => g.id)) + 1 : 1,
      ...formData,
      status: 'Pending',
    };
    setGrants([...grants, newGrant]);
    handleCloseModal();
  };

  const handleApprove = (id) => {
    setGrants(grants.map(g => g.id === id ? { ...g, status: 'Approved' } : g));
  };

  const handleDelete = (id) => {
    setGrants(grants.filter(g => g.id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800">Grants</h1>
          <p className="text-gray-500 text-sm mt-1">Manage student grants and scholarships.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleOpenModal} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            + Award Grant
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Reason</th>
                <th className="py-4 px-6">Date Awarded</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grants.map((grant) => (
                <tr key={grant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">#{grant.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{grant.studentName}</td>
                  <td className="py-4 px-6 font-semibold text-emerald-600">{grant.amount}</td>
                  <td className="py-4 px-6">{grant.reason}</td>
                  <td className="py-4 px-6">{grant.dateAwarded}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      grant.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {grant.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    {grant.status === 'Pending' && (
                      <button onClick={() => handleApprove(grant.id)} className="text-emerald-600 hover:text-emerald-800 font-medium text-sm inline-flex items-center" title="Approve">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                    )}
                    <button onClick={() => setItemToDelete(grant.id)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {grants.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">No grants awarded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Award Grant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input required name="studentName" value={formData.studentName} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input required name="amount" value={formData.amount} onChange={handleChange} type="text" placeholder="e.g. 500,000 UZS" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input required name="reason" value={formData.reason} onChange={handleChange} type="text" placeholder="e.g. Financial Aid" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input required name="dateAwarded" value={formData.dateAwarded} onChange={handleChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Award</button>
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
