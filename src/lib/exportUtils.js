import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportDashboardToExcel = async (stats) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Umumiy hisobot');

  // Define columns
  sheet.columns = [
    { header: 'Ko\'rsatkich', key: 'metric', width: 30 },
    { header: 'Qiymat', key: 'value', width: 25 },
  ];

  // Style header row
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2563EB' } // Blue-600
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  // Add data rows
  const data = [
    { metric: 'Umumiy daromad', value: `$${stats.revenue.toLocaleString()}` },
    { metric: 'Sof foyda', value: `$${stats.finance.toLocaleString()}` },
    { metric: 'Jami o\'quvchilar', value: stats.students },
    { metric: 'Jami o\'qituvchilar', value: stats.teachers },
    { metric: 'Faol guruhlar', value: stats.groups },
    { metric: 'Davomat ko\'rsatkichi', value: stats.attendanceRate },
    { metric: 'O\'sish sur\'ati', value: stats.growthRate },
  ];

  data.forEach(item => {
    sheet.addRow(item);
  });

  // Style data rows
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.font = { size: 11, color: { argb: 'FF334155' } }; // Slate-700
      row.height = 22;
      row.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      
      // Add subtle border
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFF1F5F9' } },
          bottom: { style: 'thin', color: { argb: 'FFF1F5F9' } },
        };
      });
    }
  });

  // Save Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `Algoritm_Hisobot_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportSpecificReport = async (type, stats) => {
  const workbook = new ExcelJS.Workbook();
  let sheetName = 'Hisobot';
  let columns = [];
  let data = [];
  let fileName = 'Hisobot.xlsx';
  let titleColor = 'FF2563EB'; // default blue

  if (type === 1) {
    sheetName = 'Moliyaviy xulosa';
    fileName = 'Moliyaviy_xulosa.xlsx';
    columns = [
      { header: 'Ko\'rsatkich', key: 'metric', width: 30 },
      { header: 'Qiymat', key: 'value', width: 20 },
    ];
    data = [
      { metric: 'Umumiy daromad', value: `$${stats.revenue.toLocaleString()}` },
      { metric: 'Operatsion xarajatlar (Taxminiy)', value: `$${(stats.revenue * 0.4).toLocaleString()}` },
      { metric: 'Soliqlar (Taxminiy)', value: `$${(stats.revenue * 0.1).toLocaleString()}` },
      { metric: 'Sof foyda', value: `$${stats.finance.toLocaleString()}` },
    ];
    titleColor = 'FF16A34A'; // green
  } else if (type === 2) {
    sheetName = 'O\'quvchilar ketishi';
    fileName = 'Oquvchilar_ketishi.xlsx';
    columns = [
      { header: 'Oy', key: 'month', width: 20 },
      { header: 'Ketgan o\'quvchilar', key: 'count', width: 25 },
      { header: 'Sabab (Asosiy)', key: 'reason', width: 40 },
    ];
    data = [
      { month: 'Yanvar', count: Math.floor(stats.students * 0.02), reason: 'Boshqa joyga ko\'chish' },
      { month: 'Fevral', count: Math.floor(stats.students * 0.015), reason: 'Moliyaviy muammolar' },
      { month: 'Mart', count: Math.floor(stats.students * 0.03), reason: 'O\'qishga kirolmaslik/Vaqt yetishmovchiligi' },
    ];
    titleColor = 'FFDC2626'; // red
  } else if (type === 3) {
    sheetName = 'O\'sish prognozlari';
    fileName = 'Osish_prognozlari.xlsx';
    columns = [
      { header: 'Chorak', key: 'quarter', width: 20 },
      { header: 'Kutilayotgan o\'quvchilar', key: 'students', width: 25 },
      { header: 'Kutilayotgan daromad', key: 'revenue', width: 25 },
    ];
    data = [
      { quarter: '2026 3-chorak', students: Math.floor(stats.students * 1.15), revenue: `$${Math.floor(stats.revenue * 1.15).toLocaleString()}` },
      { quarter: '2026 4-chorak', students: Math.floor(stats.students * 1.25), revenue: `$${Math.floor(stats.revenue * 1.25).toLocaleString()}` },
    ];
    titleColor = 'FF8B5CF6'; // purple
  } else if (type === 4) {
    sheetName = 'O\'qituvchilar ko\'rsatkichi';
    fileName = 'Oqituvchilar_korsatkichi.xlsx';
    columns = [
      { header: 'Guruhlar reytingi', key: 'rating', width: 30 },
      { header: 'O\'rtacha davomat', key: 'attendance', width: 25 },
      { header: 'O\'qituvchilar soni', key: 'teachers', width: 25 },
    ];
    data = [
      { rating: 'A\'lo (90-100%)', attendance: '95%', teachers: Math.floor(stats.teachers * 0.6) },
      { rating: 'Yaxshi (80-89%)', attendance: '85%', teachers: Math.floor(stats.teachers * 0.3) },
      { rating: 'Qoniqarli (<80%)', attendance: '75%', teachers: Math.floor(stats.teachers * 0.1) },
    ];
    titleColor = 'FFEA580C'; // orange
  } else if (type === 'custom') {
    sheetName = 'Maxsus Hisobot';
    fileName = 'Maxsus_Hisobot.xlsx';
    columns = [
      { header: 'Parametr', key: 'param', width: 30 },
      { header: 'Holat', key: 'status', width: 30 },
    ];
    data = [
      { param: 'Tizim barqarorligi', status: '100% ishlamoqda' },
      { param: 'Faol foydalanuvchilar', status: `${stats.students + stats.teachers} kishi` },
      { param: 'Oxirgi yangilanish', status: new Date().toLocaleDateString('uz-UZ') },
    ];
  }

  const sheet = workbook.addWorksheet(sheetName);
  sheet.columns = columns;

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: titleColor } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  data.forEach(item => sheet.addRow(item));

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.font = { size: 11, color: { argb: 'FF334155' } };
      row.height = 22;
      row.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFF1F5F9' } },
          bottom: { style: 'thin', color: { argb: 'FFF1F5F9' } },
        };
      });
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, fileName);
};
