import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AttendanceDrawer from "../AttendanceDrawer";
const ButtonMarkAttendance = ({ form, showDrawer }) => (
  <div>

    <Button
      type="primary"
      onClick={showDrawer}
      icon={<PlusOutlined />}
      style={{ marginTop: 0.5, float: "right" }}
    >
      Mark Attendance
    </Button>
    <AttendanceDrawer form={form} />
  </div>

);

export default ButtonMarkAttendance;
