import React, { useState } from "react";
import { Row, Col, Layout, Form } from "antd";
import AttendanceDrawer from "../AttendanceDrawer";
import ButtonMarkAttendance from "./ButtonMarkAttendance";
import ButtonLeaveRequest from "./ButtonLeaveRequest";
import LeaveRequestDrawer from "../LeaveRequestDrawer";
import UserProfile from "./UserProfile";
import UserInfo from "./Userinfo";

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
      
      {/* Row containing both buttons */}
      <Row gutter={16}  justify="end" style={{ marginBottom: "6px", }}>
        <Col>
          <ButtonMarkAttendance showDrawer={showAttendanceDrawer} />
        </Col>
        <Col>
          <ButtonLeaveRequest showDrawer={showLeaveDrawer} />
        </Col>
      </Row>
      
      <Content style={{ padding: "12px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <UserProfile />
          </Col>
          <Col span={16}>
            <UserInfo />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserProfileWithProgress;
