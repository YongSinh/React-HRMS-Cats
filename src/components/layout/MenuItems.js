import React from "react";
import {
  DownOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FcBusinessman } from "react-icons/fc";
import { Dropdown, Space, Avatar } from "antd";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineNotificationsActive } from "react-icons/md";
import UserService from "../../UserService/UserService";
const themes = {
  light: {
    sidebar: {
      // backgroundColor: "#EBEBEB",
      // color: "#636363;",
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

const handleLogout = () => {
  UserService.doLogout();
  //window.location.href = "https://www.cats.com.kh/apps/sso/logout";
};
const menuUser =  [
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
    onClick: handleLogout,
  },
];

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  backgroundColor: themes.light.sidebar.backgroundColor,
  color: themes.light.sidebar.color,
  height: '60px',
};

const menuStyles = {
  display: 'flex',
  alignItems: 'center',
};

const badgeStyles = {
  marginRight: '30px',
};

const dropdownStyles = {

  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px 10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  
};

const MenuItems = () => (
  <div style={headerStyles}>
    <div style={menuStyles}>
      <Tooltip title="Notification" arrow>
        <Badge
          badgeContent={100}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "red",
            },
          }}
          style={badgeStyles}
        >
          <MdOutlineNotificationsActive size={28} />
        </Badge>
      </Tooltip>

      <Dropdown
        menu={{
          items: menuUser,
        }}
        placement="bottomLeft"
      >
        <div style={dropdownStyles}>
          <Avatar
            style={{marginRight:'8px'}}
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`}
            size="large"
          />
          YongSinh
          <DownOutlined style={{ marginLeft: '8px' }} />
        </div>
      </Dropdown>
    </div>
  </div>
);

export default MenuItems;



