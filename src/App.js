import logo from './logo.svg';
import './App.css';
import DashboardPage from './pages/Dashboard/dashboard';
import MainLayoutLayout from './components/layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeavePage from './pages/leavePage/leavePage';
import InfoPage from './pages/infoPage/info';
import LeaveRequest from './pages/leavePage/myleave';
import DepartmentPage from './pages/DepartmentPage/Department';
import StaffPage from './pages/StaffPage/staff';
import Tabs_report from'./pages/Report/Tabs_report'
import Tabs_payroll from './pages/PayrollPage/Tabs_payroll';
import Tabs_attendance from './pages/AttendancePage/Tabs_Attendance'
import AllowancePage from './pages/AllowancePage/Allowance';
import DeductionPage from './pages/DeductionPage/DeductionPage';
import Leave_TypePage from './pages/Setting/Leave_Type/leave_type';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayoutLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/report" element={<Tabs_report />} />
            <Route path="/payroll" element={<Tabs_payroll />} />
            <Route path="/attendance" element={< Tabs_attendance/>} />
            <Route path="/allowance" element={< AllowancePage/>} />
            <Route path="/deduction" element={< DeductionPage/>} />
            <Route path="/leave_type" element={< Leave_TypePage/>} />
            
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
