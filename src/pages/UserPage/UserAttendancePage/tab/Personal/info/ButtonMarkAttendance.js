import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AttendanceDrawer from "../AttendanceDrawer";
const ButtonMarkAttendance = ({ form, showDrawer }) => (
  <div
    style={{
      alignContent: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      borderRadius: "6px",
      padding: "9px",
      fontSize: "15px ",
      fontWeight: "bold",
    }}
  >
    <Button className="button" type="#" onClick={showDrawer}>
      {<PlusOutlined />}
    </Button>
    <AttendanceDrawer form={form} />
    Mark Attendance{" "}
  </div>
);

export default ButtonMarkAttendance;
