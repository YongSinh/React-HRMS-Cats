import React from "react";
import {
  DownOutlined,
  SmileOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FcBusinessman } from "react-icons/fc";
import { Dropdown, Space, Avatar } from "antd";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineNotificationsActive } from "react-icons/md";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#EBEBEB",
      color: "#636363;",
    },
    menu: {
      menuContent: "#F0F0F0",
      icon: "#777777",
      fontSize: 40,
      hover: {
        backgroundColor: "#f9f9f9",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
};
const menuUser = [
  {
    key: "1",
    label: "Profile",
    icon: <FcBusinessman />,
  },
  {
    key: "2",
    label: "Login",
    icon: <LoginOutlined />,
  },
  {
    key: "3",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const MenuItems = () => (
  <>
    <Space>
      {/* <Space size="large">
    <Badge count={99}>
      <Avatar shape="square" size="large" />
    </Badge>
    </Space> */}

      <Tooltip title="Notification" arrow>
        <Badge
          badgeContent={100}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "red",
            },
          }}
        >
          <MdOutlineNotificationsActive />
        </Badge>
      </Tooltip>

      <Dropdown
        style={{ width: 150 }}
        menu={{
          items: menuUser,
        }}
        placement="bottomLeft"
      >
        <Space>
          <Avatar
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`}
          />

          <DownOutlined />
        </Space>
      </Dropdown>
    </Space>
  </>
);
export default MenuItems;
