import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayoutLayout from './components/layout/Layout';
import DashboardPage from './pages/Dashboard/dashboard';
import LeavePage from './pages/leavePage/leavePage';
import InfoPage from './pages/infoPage/info';
import LeaveRequest from './pages/leavePage/myleave';
import DepartmentPage from './pages/DepartmentPage/Tabs_Department';
import StaffPage from './pages/StaffPage/Tabs_staff';
import Report from './pages/Report/Tabs_report';
import AttendancePage from './pages/AttendancePage/Tabs_Attendance';
import AllowancePage from './pages/AllowancePage/Allowance';
import DeductionPage from './pages/DeductionPage/DeductionPage';
import PayrollPage from './pages/PayrollPage/Payroll';
import PayslipPage from './pages/Payslip/payslip';
import TaxPage from './pages/tax/TaxPage';
import SalaryPage from './pages/Salary/SalaryPage';
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
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/payslip" element={<PayslipPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/product/:productId" element={<PayslipPage />} />
            <Route path="/allowance" element={<AllowancePage />} />
            <Route path="/deduction" element={<DeductionPage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="/tax" element={<TaxPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;