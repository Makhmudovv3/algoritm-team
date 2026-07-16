import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 text-2xl font-bold border-b text-indigo-600">Algortim</div>
        <nav className="p-4">
          <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">admin</div>
          <Link to="/admin/users" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Users</Link>
          <Link to="/admin/roles" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Roles</Link>
          <Link to="/admin/branches" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Branches</Link>
          <Link to="/admin/teachers" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Teachers</Link>
          <Link to="/admin/rooms" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Rooms</Link>
          <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">students</div>
          <Link to="/students/students" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Students</Link>
          <Link to="/students/parents" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Parents</Link>
          <Link to="/students/studentgroups" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Student Groups</Link>
          <Link to="/students/attendance" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Attendance</Link>
          <Link to="/students/ratings" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Ratings</Link>
          <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">academic</div>
          <Link to="/academic/courses" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Courses</Link>
          <Link to="/academic/groups" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Groups</Link>
          <Link to="/academic/lessons" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Lessons</Link>
          <Link to="/academic/schedules" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Schedules</Link>
          <Link to="/academic/studenttransfer" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Student Transfer</Link>
          <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">finance</div>
          <Link to="/finance/payments" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Payments</Link>
          <Link to="/finance/financeaccounts" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Finance Accounts</Link>
          <Link to="/finance/discounts" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Discounts</Link>
          <Link to="/finance/grants" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Grants</Link>
          <Link to="/finance/calllogs" className="block text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors">Call Logs</Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Abdulaziz (Team Lead)</span>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
