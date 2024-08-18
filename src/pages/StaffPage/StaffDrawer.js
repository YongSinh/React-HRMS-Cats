import React from "react";
import { Drawer, Button, Space, Typography,Form } from "antd";
import StaffForm from "./StaffForm";

const { Title } = Typography;

const StaffDrawer = ({ visible, onClose, onSave }) => {
  return (
    <Drawer
      title={"Add New Staff"}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80, height: "100vh" }}
      width="100%"
    >
      <StaffForm onClose={onSave} />
    </Drawer>
  );
};


export default StaffDrawer;