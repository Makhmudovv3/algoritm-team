import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Users from '../pages/admin/Users';
import Roles from '../pages/admin/Roles';
import Branches from '../pages/admin/Branches';
import Teachers from '../pages/admin/Teachers';
import Rooms from '../pages/admin/Rooms';
import Students from '../pages/students/Students';
import Parents from '../pages/students/Parents';
import StudentGroups from '../pages/students/StudentGroups';
import Attendance from '../pages/students/Attendance';
import Ratings from '../pages/students/Ratings';
import Courses from '../pages/academic/Courses';
import Groups from '../pages/academic/Groups';
import Lessons from '../pages/academic/Lessons';
import Schedules from '../pages/academic/Schedules';
import StudentTransfer from '../pages/academic/StudentTransfer';
import Payments from '../pages/finance/Payments';
import FinanceAccounts from '../pages/finance/FinanceAccounts';
import Discounts from '../pages/finance/Discounts';
import Grants from '../pages/finance/Grants';
import CallLogs from '../pages/finance/CallLogs';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/roles" element={<Roles />} />
        <Route path="admin/branches" element={<Branches />} />
        <Route path="admin/teachers" element={<Teachers />} />
        <Route path="admin/rooms" element={<Rooms />} />
        <Route path="students/students" element={<Students />} />
        <Route path="students/parents" element={<Parents />} />
        <Route path="students/studentgroups" element={<StudentGroups />} />
        <Route path="students/attendance" element={<Attendance />} />
        <Route path="students/ratings" element={<Ratings />} />
        <Route path="academic/courses" element={<Courses />} />
        <Route path="academic/groups" element={<Groups />} />
        <Route path="academic/lessons" element={<Lessons />} />
        <Route path="academic/schedules" element={<Schedules />} />
        <Route path="academic/studenttransfer" element={<StudentTransfer />} />
        <Route path="finance/payments" element={<Payments />} />
        <Route path="finance/financeaccounts" element={<FinanceAccounts />} />
        <Route path="finance/discounts" element={<Discounts />} />
        <Route path="finance/grants" element={<Grants />} />
        <Route path="finance/calllogs" element={<CallLogs />} />
      </Route>
    </Routes>
  );
}
