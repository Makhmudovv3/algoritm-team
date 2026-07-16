const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

const structure = {
    'assets': [],
    'components': ['common', 'forms', 'tables', 'modals', 'layout'],
    'layouts': ['MainLayout.jsx'],
    'pages': {
        'admin': ['Users', 'Roles', 'Branches', 'Teachers', 'Rooms'],
        'students': ['Students', 'Parents', 'StudentGroups', 'Attendance', 'Ratings'],
        'academic': ['Courses', 'Groups', 'Lessons', 'Schedules', 'StudentTransfer'],
        'finance': ['Payments', 'FinanceAccounts', 'Discounts', 'Grants', 'CallLogs']
    },
    'routes': ['AppRouter.jsx'],
    'services': ['api.js'],
    'data': ['dummy'],
    'hooks': [],
    'utils': []
};

function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function createFile(filePath, content = '') {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Create base directories
Object.keys(structure).forEach(key => {
    const mainPath = path.join(baseDir, key);
    createDir(mainPath);

    const val = structure[key];
    if (Array.isArray(val)) {
        val.forEach(item => {
            if (item.endsWith('.js') || item.endsWith('.jsx')) {
                // It's a file
                let content = '';
                if (item === 'MainLayout.jsx') {
                    content = `import React from 'react';\nimport { Outlet, Link } from 'react-router-dom';\n\nexport default function MainLayout() {\n  return (\n    <div className="flex h-screen bg-gray-100">\n      <aside className="w-64 bg-white shadow-md">\n        <div className="p-4 text-xl font-bold border-b">Sidebar</div>\n        <nav className="p-4 space-y-2">\n          <Link to="/admin/users" className="block text-gray-700 hover:bg-gray-200 p-2 rounded">Admin Users</Link>\n          <Link to="/students/students" className="block text-gray-700 hover:bg-gray-200 p-2 rounded">Students</Link>\n          <Link to="/academic/courses" className="block text-gray-700 hover:bg-gray-200 p-2 rounded">Academic Courses</Link>\n          <Link to="/finance/payments" className="block text-gray-700 hover:bg-gray-200 p-2 rounded">Finance Payments</Link>\n        </nav>\n      </aside>\n      <div className="flex-1 flex flex-col overflow-hidden">\n        <header className="bg-white shadow-sm p-4 flex justify-between items-center">\n          <h2 className="text-lg font-semibold">Navbar</h2>\n        </header>\n        <main className="flex-1 overflow-auto p-4">\n          <Outlet />\n        </main>\n      </div>\n    </div>\n  );\n}\n`;
                } else if (item === 'AppRouter.jsx') {
                    content = `import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport MainLayout from '../layouts/MainLayout';\n\n// Import pages here\n\nexport default function AppRouter() {\n  return (\n    <Routes>\n      <Route path="/" element={<MainLayout />}>\n        {/* Add routes here */}\n      </Route>\n    </Routes>\n  );\n}\n`;
                }
                createFile(path.join(mainPath, item), content);
            } else {
                // It's a subfolder
                createDir(path.join(mainPath, item));
            }
        });
    } else if (typeof val === 'object') {
        // It's pages
        Object.keys(val).forEach(section => {
            const sectionPath = path.join(mainPath, section);
            createDir(sectionPath);
            val[section].forEach(page => {
                const pagePath = path.join(sectionPath, page);
                createDir(pagePath);
                
                // Create subdirectories for the page
                createDir(path.join(pagePath, 'components'));
                createDir(path.join(pagePath, 'hooks'));
                createDir(path.join(pagePath, 'data'));
                createDir(path.join(pagePath, 'styles'));
                
                // Create index.jsx
                const indexContent = `import React from 'react';\n\nexport default function ${page}() {\n  return (\n    <div>\n      <h1 className="text-2xl font-bold">${page} Page</h1>\n    </div>\n  );\n}\n`;
                createFile(path.join(pagePath, 'index.jsx'), indexContent);
            });
        });
    }
});

console.log('Folder structure created successfully!');
