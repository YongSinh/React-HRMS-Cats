import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayoutLayout from './components/layout/Layout';
import DashboardPage from './pages/Dashboard/dashboard';
import LeavePage from './pages/leavePage/MainLeave/leavePage';
import InfoPage from './pages/infoPage/info';
import LeaveRequest from './pages/leavePage/UserLeavePage/leaveRequest';
import DepartmentPage from './pages/DepartmentPage/Department';
import Staff from './pages/StaffPage/Staff';
import Report from './pages/Report/TabsReport';
import AttendancePage from './pages/AttendancePage/TabsAttendance';
import AllowancePage from './pages/AllowancePage/Allowance';
import DeductionPage from './pages/DeductionPage/DeductionPage';
import PayrollPage from './pages/PayrollPage/Payroll';
import PayslipPage from './pages/Payslip/payslip';
import TaxPage from './pages/tax/TaxPage';
import SalaryPage from './pages/Salary/SalaryPage';
import LeaveTypePage from './pages/leavePage/LeaveType/leaveType';
import LeaveBalancePage from './pages/leavePage/LeaveBalance/leaveBalance';
import LeaveEmpPage from './pages/leavePage/LeaveEmp/LeaveEmp';
import PositionPage from './pages/PositionPage/Position';
import EidtPayslipPage from './pages/Payslip/edtPayslipPage';
import StaffForm from './pages/StaffPage/StaffForm';
import './App.css';
import "antd/dist/antd"; // or 'antd/dist/antd.less'
import "antd-button-color/dist/css/style.css"; // or 'antd-button-color/dist/css/style.less'
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
            <Route path="/position" element={<PositionPage />} />
            <Route path="/employee" element={<Staff />} />
            <Route path="/payroll-report" element={<Report />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/payslip" element={<PayslipPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/product/:productId" element={<PayslipPage />} />
            <Route path="/allowance" element={<AllowancePage />} />
            <Route path="/deduction" element={<DeductionPage />} />
            <Route path="/leave-type" element={<LeaveTypePage />} />
            <Route path="/leave-balance" element={<LeaveBalancePage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/add-employee" element={<StaffForm />} />
            <Route path="/leave-employee/:id" element={<LeaveEmpPage />} />
            <Route path="/edit-payslip/:id" element={<EidtPayslipPage />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App; 