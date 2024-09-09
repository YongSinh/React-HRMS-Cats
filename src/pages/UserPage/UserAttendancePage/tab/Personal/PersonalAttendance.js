import React, { useState } from "react";
import { Layout, Form } from "antd";
import UserProfileWithProgress from "./info/UserProfileWithProgress";
import AttendanceTable from "./AttendanceTable";
import AttendanceDrawer from "./AttendanceDrawer";
import "./personal_attendance.css";
const { Content } = Layout;

const initialData = Array.from({ length: 6 }, (_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  dateRange: `2023-08-${i + 1} - 2023-08-${i + 7}`, // Updated format
  timeIn: "08:00 AM",
  timeOut: "05:00 PM",
  position: "Developer",
  description: `Worked on Project ${i}`,
  ID: `0${i}`,
  Status: `Unactive`,
  remark: `Remark ${i}`,
  imageUrl: `https://randomuser.me/api/portraits/men/${i}.jpg`,
}));

const PersonalAttendance = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData); // useState with initialData

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleSubmit = (newAttendance) => {
    setData([newAttendance, ...data]);
    closeDrawer();
  };

  return (
    <Layout>
      <Content>
        <UserProfileWithProgress form={form} />
        <AttendanceTable data={data} />
        <AttendanceDrawer
          form={form}
          visible={drawerVisible}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      </Content>
    </Layout>
  );
};

export default PersonalAttendance;
