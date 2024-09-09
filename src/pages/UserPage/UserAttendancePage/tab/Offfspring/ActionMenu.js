import React, { useState } from "react";
import { Button, Dropdown, Menu, message } from "antd";
import {
  EditFilled,
  EyeFilled,
  SendOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

const ActionMenu = ({ record, setData, setFilteredData }) => {
  const [isIconUp, setIsIconUp] = useState(false);

  // Update visibility when dropdown is opened or closed
  const handleMenuVisibilityChange = (visible) => {
    setIsIconUp(visible);
  };

  // Delete record handler
  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.key !== record.key));
    setFilteredData((prevData) =>
      prevData.filter((item) => item.key !== record.key)
    );
    message.success("Record deleted successfully!");
    setIsIconUp(false); // Close dropdown and reset button color
  };

  // Handle other actions (View, Edit, Send)
  const handleMenuClick = (action) => {
    message.info(`${action} ${record.name}`);
    setIsIconUp(false); // Close dropdown and reset button color
  };

  // Menu for dropdown actions
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<EyeFilled />}
        onClick={() => handleMenuClick("Viewing")}
      >
        View
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<EditFilled />}
        onClick={() => handleMenuClick("Editing")}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<SendOutlined />}
        onClick={() => handleMenuClick("Sending")}
      >
        Send
      </Menu.Item>
      <Menu.Item key="4" icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      onVisibleChange={handleMenuVisibilityChange}
    >
      <Button
        style={{
          backgroundColor: isIconUp ? "red" : "#6dfb72",
          color: isIconUp ? "white" : "#fff",
        }}
      >
        {isIconUp ? <UpOutlined /> : <DownOutlined />}
      </Button>
    </Dropdown>
  );
};

export default ActionMenu;
