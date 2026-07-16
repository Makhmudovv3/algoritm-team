import React, { useState } from 'react';

export default function Discounts() {
  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Family Discount', type: 'Percentage', value: '10%', status: 'Active', appliesTo: 'All Courses' },
    { id: 2, name: 'Early Bird', type: 'Fixed Amount', value: '100,000 UZS', status: 'Active', appliesTo: 'Frontend' },
    { id: 3, name: 'Summer Special', type: 'Percentage', value: '20%', status: 'Expired', appliesTo: 'Design' },
    { id: 4, name: 'Referral Bonus', type: 'Fixed Amount', value: '50,000 UZS', status: 'Active', appliesTo: 'All Courses' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Percentage',
    value: '',
    appliesTo: '',
    status: 'Active',
  });

  const handleOpenModal = (discount = null) => {
    if (discount) {
      setEditingId(discount.id);
      setFormData({ 
        name: discount.name, 
        type: discount.type, 
        value: discount.value, 
        appliesTo: discount.appliesTo, 
        status: discount.status 
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', type: 'Percentage', value: '', appliesTo: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDiscounts(discounts.map((d) => d.id === editingId ? { ...d, ...formData } : d));
    } else {
      const newDiscount = {
        id: discounts.length > 0 ? Math.max(...discounts.map((d) => d.id)) + 1 : 1,
        ...formData,
      };
      setDiscounts([...discounts, newDiscount]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setDiscounts(discounts.filter((d) => d.id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800">Discounts</h1>
          <p className="text-gray-500 text-sm mt-1">Configure and manage discount rules for courses.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            + Add Discount
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Discount Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Value</th>
                <th className="py-4 px-6">Applies To</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">#{discount.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{discount.name}</td>
                  <td className="py-4 px-6">{discount.type}</td>
                  <td className="py-4 px-6 font-semibold text-indigo-600">{discount.value}</td>
                  <td className="py-4 px-6">{discount.appliesTo}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      discount.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button onClick={() => handleOpenModal(discount)} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                    </button>
                    <button onClick={() => setItemToDelete(discount.id)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {discounts.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">No discounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{editingId ? 'Edit Discount' : 'Add Discount'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input required name="value" value={formData.value} onChange={handleChange} type="text" placeholder={formData.type === 'Percentage' ? 'e.g. 15%' : 'e.g. 50,000 UZS'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                <input required name="appliesTo" value={formData.appliesTo} onChange={handleChange} type="text" placeholder="e.g. All Courses, Frontend" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
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
