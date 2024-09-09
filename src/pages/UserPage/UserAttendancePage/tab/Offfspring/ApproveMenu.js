import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { EditFilled, DownOutlined, UpOutlined } from "@ant-design/icons";

const ApproveMenu = ({ record }) => {
  const [isIconUp, setIsIconUp] = useState(false);

  // Update visibility when dropdown is opened or closed
  const handleMenuVisibilityChange = (visible) => {
    setIsIconUp(visible);
  };

  // Function to handle menu item click and close the menu
  const handleMenuClick = (action) => {
    console.log(`${action} ${record.name}`);
    setIsIconUp(false); // Close the dropdown by setting icon state back to false
  };

  const menu = (
    <Menu onClick={() => setIsIconUp(false)}>
      <Menu.Item 
        key="1" 
        icon={<EditFilled />}
        onClick={() => handleMenuClick("Supervisor")}
      >
        Supervisor
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<EditFilled />}
        onClick={() => handleMenuClick("Sec.Manager")}
      >
        Sec.Manager
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<EditFilled />}
        onClick={() => handleMenuClick("Head.Deg Director")}
      >
        Head.Deg Director
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<EditFilled />}
        onClick={() => handleMenuClick("HR")}
      >
        HR
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      onVisibleChange={handleMenuVisibilityChange}
    >
      <Button style={{ backgroundColor: isIconUp ? "red" : "#4096ff", color: isIconUp ? "white" : "#ffff" }}>
        {isIconUp ? <UpOutlined /> : <DownOutlined />}
      </Button>
    </Dropdown>
  );
};

export default ApproveMenu;
