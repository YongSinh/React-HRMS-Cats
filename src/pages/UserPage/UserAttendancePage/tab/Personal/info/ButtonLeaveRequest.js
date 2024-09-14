import React from "react";
import { Button } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";

import LeaveRequestDrawer from "../LeaveRequestDrawer";
import "./ButtonLeaveRequest.css";
const ButtonLeaveRequest = ({ form, showDrawer }) => (
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
      {<FieldTimeOutlined />}
    </Button>
    <LeaveRequestDrawer form={form} />
    Request Leave
  </div>
);

export default ButtonLeaveRequest;
