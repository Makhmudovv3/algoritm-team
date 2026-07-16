import React, { useState } from 'react';

export default function FinanceAccounts() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Main Cash Desk', balance: '15,000,000 UZS', type: 'Cash', lastUpdated: '2026-07-16 10:30' },
    { id: 2, name: 'Click Account', balance: '4,500,000 UZS', type: 'Card', lastUpdated: '2026-07-16 12:15' },
    { id: 3, name: 'Payme Account', balance: '8,200,000 UZS', type: 'Card', lastUpdated: '2026-07-16 14:00' },
    { id: 4, name: 'Bank Transfer', balance: '25,000,000 UZS', type: 'Bank', lastUpdated: '2026-07-15 09:00' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Cash',
    balance: '',
  });

  const handleOpenModal = (account = null) => {
    if (account) {
      setEditingId(account.id);
      setFormData({ name: account.name, type: account.type, balance: account.balance });
    } else {
      setEditingId(null);
      setFormData({ name: '', type: 'Cash', balance: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    if (editingId) {
      setAccounts(accounts.map((acc) => acc.id === editingId ? { ...acc, ...formData, lastUpdated: now } : acc));
    } else {
      const newAccount = {
        id: accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1,
        ...formData,
        lastUpdated: now,
      };
      setAccounts([...accounts, newAccount]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setAccounts(accounts.filter((a) => a.id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800">Finance Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your financial accounts and balances.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            + Create Account
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Account Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Balance</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">#{account.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{account.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      account.type === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                      account.type === 'Card' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {account.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{account.balance}</td>
                  <td className="py-4 px-6">{account.lastUpdated}</td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button onClick={() => handleOpenModal(account)} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                    </button>
                    <button onClick={() => setItemToDelete(account.id)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">No accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{editingId ? 'Edit Account' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
                <input required name="balance" value={formData.balance} onChange={handleChange} type="text" placeholder="e.g. 10,000,000 UZS" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
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
