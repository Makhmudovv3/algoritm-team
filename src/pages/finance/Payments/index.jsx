import React, { useState } from 'react';

export default function Payments() {
  const [payments, setPayments] = useState([
    { id: 1, studentName: 'Ali Valiyev', amount: '500,000 UZS', date: '2026-07-10', status: 'Completed', course: 'Frontend' },
    { id: 2, studentName: 'Hasanboy Toshmatov', amount: '450,000 UZS', date: '2026-07-12', status: 'Pending', course: 'Backend' },
    { id: 3, studentName: 'Zebo Karimova', amount: '600,000 UZS', date: '2026-07-14', status: 'Completed', course: 'Design' },
    { id: 4, studentName: 'Murod Aliyev', amount: '500,000 UZS', date: '2026-07-15', status: 'Failed', course: 'Frontend' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    amount: '',
    date: '',
    status: 'Pending',
  });

  const [filterText, setFilterText] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ studentName: '', course: '', amount: '', date: '', status: 'Pending' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      id: payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1,
      ...formData,
    };
    setPayments([...payments, newPayment]);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete);
      setItemToDelete(null);
    }
  };

  const filteredPayments = payments.filter((p) => 
    p.studentName.toLowerCase().includes(filterText.toLowerCase()) ||
    p.status.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage student payments and transactions.</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search by name or status..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
          />
          <button onClick={handleOpenModal} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap">
            + Add Payment
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
                <th className="py-4 px-6">Course</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">#{payment.id}</td>
                  <td className="py-4 px-6">{payment.studentName}</td>
                  <td className="py-4 px-6">{payment.course}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{payment.amount}</td>
                  <td className="py-4 px-6">{payment.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button onClick={() => setItemToDelete(payment.id)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input required name="studentName" value={formData.studentName} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input required name="course" value={formData.course} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input required name="amount" value={formData.amount} onChange={handleChange} type="text" placeholder="e.g. 500,000 UZS" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Save</button>
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
