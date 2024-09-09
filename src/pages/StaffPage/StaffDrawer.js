import React, {useState,useEffect} from "react";
import { Drawer, Typography,Space,Button,} from "antd";
import StaffForm from "./StaffForm";

const { Title } = Typography;


const StaffDrawer = ({ visible, onClose, onSave }) => {

  return (
    <Drawer
      title={<Title style={styles.addstaff}>Add New Staff</Title>}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80, height: "100vh" }}
      width="100%"
      // extra={
      //   <Space className="btnCS">
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button form="staffForm" type="primary" htmlType="submit">
      //       Save
      //     </Button>
      //   </Space>
      // }
    >
      <StaffForm onClose={onSave} />
    </Drawer>
  );
};

const styles = {
  addstaff: {
    color: "#fff",
    marginBottom: "none",
    fontSize: "1.5rem",
    padding: "none",
  },
};

export default StaffDrawer;