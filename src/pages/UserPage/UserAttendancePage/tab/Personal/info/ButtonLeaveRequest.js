import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LeaveRequestDrawer from "../LeaveRequestDrawer";

const ButtonLeaveRequest = ({ form, showDrawer }) => (
  <div>

<Button
type="primary"
onClick={showDrawer}
icon={<PlusOutlined />}
style={{ marginTop: 0.5, float: "right" }}
>
Request Leave
</Button>
<LeaveRequestDrawer form={form} />
  </div>

);

export default ButtonLeaveRequest;