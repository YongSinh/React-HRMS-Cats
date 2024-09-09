import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Main Layout Routes */

import MainLayout from "./components/layout/Layout";
import DashboardPage from "./pages/Dashboard/dashboard";
import LeavePage from "./pages/leavePage/leavePage";
import InfoPage from "./pages/infoPage/info";
import LeaveRequest from "./pages/leavePage/myleave";
import DepartmentPage from "./pages/DepartmentPage/Department";
import StaffPage from "./pages/StaffPage/Staff";
import Report from "./pages/Report/Report";
import AttendancePage from "./pages/AttendancePage/Tabs_Attendance";
import AllowancePage from "./pages/AllowancePage/Allowance";
import DeductionPage from "./pages/DeductionPage/DeductionPage";
import PayrollPage from "./pages/PayrollPage/Payroll";
import PayslipPage from "./pages/Payslip/payslip";
import TaxPage from "./pages/tax/TaxPage";
import SalaryPage from "./pages/Salary/SalaryPage";

/* User Layout Route */
import UserLayout from "./components/layout/UserLayout/UserLayout";

import UserAttendancePage from "./pages/UserPage/UserAttendancePage/Tabs_Attendance";
import UserPayroll from "./pages/UserPage/UserPayroll/Payroll";
import UserStaff from "./pages/UserPage/UserInfo/StaffForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
          <Route path="/department" element={<DepartmentPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/report" element={<Report />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/payslip" element={<PayslipPage />} />
          <Route path="/allowance" element={<AllowancePage />} />
          <Route path="/deduction" element={<DeductionPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/tax" element={<TaxPage />} />
        </Route>

        {/* User Layout Route */}
        <Route path="/userpage" element={<UserLayout />}>
          <Route
            path="/userpage"
            element={<Navigate to="/userpage/attendance" />}
          />
          <Route path="/userpage/attendance" element={<UserAttendancePage />} />
          <Route path="/userpage/Payroll" element={<UserPayroll />} />
          <Route path="/userpage/Staff" element={<UserStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
