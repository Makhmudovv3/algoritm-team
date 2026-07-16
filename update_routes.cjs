const fs = require('fs');
const path = require('path');

const pages = {
    'admin': ['Users', 'Roles', 'Branches', 'Teachers', 'Rooms'],
    'students': ['Students', 'Parents', 'StudentGroups', 'Attendance', 'Ratings'],
    'academic': ['Courses', 'Groups', 'Lessons', 'Schedules', 'StudentTransfer'],
    'finance': ['Payments', 'FinanceAccounts', 'Discounts', 'Grants', 'CallLogs']
};

let imports = `import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport MainLayout from '../layouts/MainLayout';\n`;
let routes = ``;
let links = ``;

Object.keys(pages).forEach(section => {
    links += `          <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">${section}</div>\n`;
    pages[section].forEach(page => {
        imports += `import ${page} from '../pages/${section}/${page}';\n`;
        routes += `        <Route path="${section}/${page.toLowerCase()}" element={<${page} />} />\n`;
        links += `          <Link to="/${section}/${page.toLowerCase()}" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">${page.replace(/([A-Z])/g, ' $1').trim()}</Link>\n`;
    });
});

const appRouterContent = `${imports}\nexport default function AppRouter() {\n  return (\n    <Routes>\n      <Route path="/" element={<MainLayout />}>\n${routes}      </Route>\n    </Routes>\n  );\n}\n`;

const mainLayoutContent = `import React from 'react';\nimport { Outlet, Link } from 'react-router-dom';\n\nexport default function MainLayout() {\n  return (\n    <div className="flex h-screen bg-gray-50">\n      <aside className="w-64 bg-white shadow-lg overflow-y-auto">\n        <div className="p-6 text-2xl font-bold border-b text-indigo-600">Algortim</div>\n        <nav className="p-4">\n${links}        </nav>\n      </aside>\n      <div className="flex-1 flex flex-col overflow-hidden">\n        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">\n          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>\n          <div className="flex items-center space-x-4">\n            <span className="text-gray-600 font-medium">Abdulaziz (Team Lead)</span>\n            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">\n              A\n            </div>\n          </div>\n        </header>\n        <main className="flex-1 overflow-auto p-6">\n          <Outlet />\n        </main>\n      </div>\n    </div>\n  );\n}\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'routes', 'AppRouter.jsx'), appRouterContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx'), mainLayoutContent, 'utf8');

console.log('AppRouter and MainLayout updated!');
