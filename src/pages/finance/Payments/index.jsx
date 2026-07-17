import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import PaymentsHeader from './components/PaymentsHeader';
import RevenueCards from './components/RevenueCards';
import DashboardCharts from './components/DashboardCharts';
import PaymentsTabs from './components/PaymentsTabs';
import TransactionsTable from './components/TransactionsTable';
import PendingPayments from './components/PendingPayments';
import Invoices from './components/Invoices';
import PaymentModal from './components/PaymentModal';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    sum: '',
    type: 'cash',
    date: '',
    finance_account_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pData, sData, aData] = await Promise.all([
        api.Payments.getAll(),
        api.Students.getAll(),
        api.FinanceAccounts.getAll()
      ]);
      setPayments(pData);
      setStudents(sData);
      setAccounts(aData);
    } finally {
      setIsLoading(false);
    }
  };

  const studentOptions = students.map(s => ({ label: s.fullname, value: s.id }));
  const accountOptions = accounts.map(a => ({ label: a.name, value: a.id }));

  const handleOpenModal = () => {
    setFormData({
      student_id: studentOptions.length > 0 ? studentOptions[0].value : '',
      sum: '',
      type: 'cash',
      date: new Date().toISOString().split('T')[0],
      finance_account_id: accountOptions.length > 0 ? accountOptions[0].value : ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.sum || !formData.finance_account_id || !formData.date) return;
    try {
      const payload = { ...formData, sum: Number(formData.sum) };
      const created = await api.Payments.create(payload);
      setPayments([...payments, created]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('To\'lovlar_Tarixi');
    
    // Set column widths
    worksheet.columns = [
      { header: 'To\'lov ID', key: 'id', width: 20 },
      { header: 'O\'quvchi', key: 'student', width: 30 },
      { header: 'Summa (UZS)', key: 'amount', width: 20 },
      { header: 'To\'lov turi', key: 'type', width: 15 },
      { header: 'Sana', key: 'date', width: 20 },
      { header: 'Kassa/Hisob', key: 'account', width: 25 }
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF10B981' } // Emerald-500 for finance
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 30;

    // Add data
    payments.forEach(p => {
      const studentName = students.find(s => s.id === p.student_id)?.fullname || 'Noma\'lum';
      const accountName = accounts.find(a => a.id === p.finance_account_id)?.name || 'Noma\'lum';
      const typeName = p.type === 'cash' ? 'Naqd' : p.type === 'card' ? 'Plastik' : 'Bank';
      
      worksheet.addRow({
        id: p.id,
        student: studentName,
        amount: new Intl.NumberFormat('uz-UZ').format(p.sum),
        type: typeName,
        date: p.date ? p.date.substring(0, 10) : ''
      });
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        // Add borders to all cells
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
        };
        
        // Data rows specific alignment
        if (rowNumber > 1) {
          cell.alignment = { vertical: 'middle', horizontal: colNumber === 2 ? 'left' : 'center' };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Tolovlar_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 px-6">
      <PaymentsHeader onAddPayment={handleOpenModal} onExport={handleExport} />
      
      <RevenueCards payments={payments} accounts={accounts} />
      
      <DashboardCharts payments={payments} />
      
      <PaymentsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'transactions' && (
        <TransactionsTable 
          isLoading={isLoading}
          payments={payments}
          students={students}
          accounts={accounts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          accountFilter={accountFilter}
          setAccountFilter={setAccountFilter}
        />
      )}
      
      {activeTab === 'pending' && <PendingPayments />}
      
      {activeTab === 'invoices' && <Invoices />}

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        studentOptions={studentOptions}
        accountOptions={accountOptions}
      />
    </div>
  );
}
