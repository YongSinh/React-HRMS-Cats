import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayoutLayout from './components/layout/Layout';
import DashboardPage from './pages/Dashboard/dashboard';
import LeavePage from './pages/leavePage/leavePage';
import InfoPage from './pages/infoPage/info';
import LeaveRequest from './pages/leavePage/myleave';
import DepartmentPage from './pages/DepartmentPage/Department';
import StaffPage from './pages/StaffPage/Staff';
import PayrollPage from './pages/PayrollPage/Payroll';
import Report from './pages/Report/Report';
import AttendancePage from './pages/AttendancePage/Tabs_Attendance';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayoutLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/Payroll" element={<PayrollPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;