import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';

// Eager load Dashboard to make it feel fast instantly
import Dashboard from './pages/Dashboard';

// Lazy loading for other modules to reduce main bundle size
const Profile = React.lazy(() => import('./pages/dashboard/Profile'));
const Roles = React.lazy(() => import('./pages/admin/Roles'));
const Users = React.lazy(() => import('./pages/admin/Users'));
const Branches = React.lazy(() => import('./pages/admin/Branches'));
const Rooms = React.lazy(() => import('./pages/admin/Rooms'));
const Teachers = React.lazy(() => import('./pages/admin/Teachers'));
const Settings = React.lazy(() => import('./pages/admin/Settings'));

const Courses = React.lazy(() => import('./pages/academic/Courses'));
const Groups = React.lazy(() => import('./pages/academic/Groups'));
const Lessons = React.lazy(() => import('./pages/academic/Lessons'));
const Schedules = React.lazy(() => import('./pages/academic/Schedules'));
const StudentTransfer = React.lazy(() => import('./pages/academic/StudentTransfer'));

const CallLogs = React.lazy(() => import('./pages/finance/CallLogs'));
const Discounts = React.lazy(() => import('./pages/finance/Discounts'));
const FinanceAccounts = React.lazy(() => import('./pages/finance/FinanceAccounts'));
const Grants = React.lazy(() => import('./pages/finance/Grants'));
const Payments = React.lazy(() => import('./pages/finance/Payments'));

const Attendance = React.lazy(() => import('./pages/students/Attendance'));
const Parents = React.lazy(() => import('./pages/students/Parents'));
const Ratings = React.lazy(() => import('./pages/students/Ratings'));
const StudentGroups = React.lazy(() => import('./pages/students/StudentGroups'));
const Students = React.lazy(() => import('./pages/students/Students'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Suspense fallback={<PageLoader />}><Profile /></Suspense>} />
        
        <Route path="/admin">
          <Route path="roles" element={<Suspense fallback={<PageLoader />}><Roles /></Suspense>} />
          <Route path="users" element={<Suspense fallback={<PageLoader />}><Users /></Suspense>} />
          <Route path="branches" element={<Suspense fallback={<PageLoader />}><Branches /></Suspense>} />
          <Route path="rooms" element={<Suspense fallback={<PageLoader />}><Rooms /></Suspense>} />
          <Route path="teachers" element={<Suspense fallback={<PageLoader />}><Teachers /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
        </Route>
        
        <Route path="/academic">
          <Route path="courses" element={<Suspense fallback={<PageLoader />}><Courses /></Suspense>} />
          <Route path="groups" element={<Suspense fallback={<PageLoader />}><Groups /></Suspense>} />
          <Route path="lessons" element={<Suspense fallback={<PageLoader />}><Lessons /></Suspense>} />
          <Route path="schedules" element={<Suspense fallback={<PageLoader />}><Schedules /></Suspense>} />
          <Route path="student-transfer" element={<Suspense fallback={<PageLoader />}><StudentTransfer /></Suspense>} />
        </Route>
        
        <Route path="/finance">
          <Route path="call-logs" element={<Suspense fallback={<PageLoader />}><CallLogs /></Suspense>} />
          <Route path="discounts" element={<Suspense fallback={<PageLoader />}><Discounts /></Suspense>} />
          <Route path="finance-accounts" element={<Suspense fallback={<PageLoader />}><FinanceAccounts /></Suspense>} />
          <Route path="grants" element={<Suspense fallback={<PageLoader />}><Grants /></Suspense>} />
          <Route path="payments" element={<Suspense fallback={<PageLoader />}><Payments /></Suspense>} />
        </Route>

        <Route path="/students">
          <Route path="attendance" element={<Suspense fallback={<PageLoader />}><Attendance /></Suspense>} />
          <Route path="parents" element={<Suspense fallback={<PageLoader />}><Parents /></Suspense>} />
          <Route path="ratings" element={<Suspense fallback={<PageLoader />}><Ratings /></Suspense>} />
          <Route path="student-groups" element={<Suspense fallback={<PageLoader />}><StudentGroups /></Suspense>} />
          <Route path="students" element={<Suspense fallback={<PageLoader />}><Students /></Suspense>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
