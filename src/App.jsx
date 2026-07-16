import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Roles from './pages/admin/Roles';
import Users from './pages/admin/Users';
import Branches from './pages/admin/Branches';
import Rooms from './pages/admin/Rooms';
import Teachers from './pages/admin/Teachers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/users" replace />} />
      <Route path="/admin" element={<MainLayout />}>
        <Route path="roles" element={<Roles />} />
        <Route path="users" element={<Users />} />
        <Route path="branches" element={<Branches />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>
    </Routes>
  );
}

export default App;
