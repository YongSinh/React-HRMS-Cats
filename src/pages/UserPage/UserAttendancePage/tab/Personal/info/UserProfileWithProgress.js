import React, { useState } from "react";
import { Row, Col, Layout, Form } from "antd";
import AttendanceDrawer from "../AttendanceDrawer";
import ButtonMarkAttendance from "./ButtonMarkAttendance";
import ButtonLeaveRequest from "./ButtonLeaveRequest";
import LeaveRequestDrawer from "../LeaveRequestDrawer";
import UserProfile from "./UserProfile";
import UserInfo from "./Userinfo";
import "./UserProfileWithProgress..css";
import DynamicCalendar from "./DynamicCalendar";

const { Content } = Layout;

const UserProfileWithProgress = () => {
  const [attendanceDrawerVisible, setAttendanceDrawerVisible] = useState(false);
  const [leaveDrawerVisible, setLeaveDrawerVisible] = useState(false);

  const [attendanceForm] = Form.useForm();
  const [leaveForm] = Form.useForm();

  // Attendance Drawer Handlers
  const showAttendanceDrawer = () => setAttendanceDrawerVisible(true);
  const closeAttendanceDrawer = () => {
    setAttendanceDrawerVisible(false);
    attendanceForm.resetFields();
  };

  const handleAttendanceSubmit = (newAttendance) => {
    console.log("Attendance submitted:", newAttendance);
    closeAttendanceDrawer();
  };

  // Leave Drawer Handlers
  const showLeaveDrawer = () => setLeaveDrawerVisible(true);
  const closeLeaveDrawer = () => {
    setLeaveDrawerVisible(false);
    leaveForm.resetFields();
  };

  const handleLeaveSubmit = (leaveRequest) => {
    console.log("Leave request submitted:", leaveRequest);
    closeLeaveDrawer();
  };

  return (
    <Layout>
      <AttendanceDrawer
        form={attendanceForm}
        visible={attendanceDrawerVisible}
        onClose={closeAttendanceDrawer}
        onSubmit={handleAttendanceSubmit}
      />
      <LeaveRequestDrawer
        form={leaveForm}
        visible={leaveDrawerVisible}
        onClose={closeLeaveDrawer}
        onSubmit={handleLeaveSubmit}
      />

<div class="parent">
    <div class="div1" > <UserProfile /></div>
    <div class="div2"><DynamicCalendar /></div>
    <div class="div3"><UserInfo /> </div>
    <div class="div4" ><ButtonMarkAttendance showDrawer={showAttendanceDrawer} />
    <ButtonLeaveRequest showDrawer={showLeaveDrawer} />
    </div>
</div>


    </Layout>
  );
};

export default UserProfileWithProgress;
