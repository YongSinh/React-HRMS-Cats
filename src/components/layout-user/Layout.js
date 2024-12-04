import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Space, Layout, Menu, Button, theme } from "antd";
import "./Layout.css";
import MenuItems from './MenuItems'
import Notification from "../notetification/notetification";
import {
  PieChartOutlined,
  UserOutlined,
  FieldTimeOutlined,
  FormOutlined,
  SolutionOutlined,
  AccountBookOutlined
} from "@ant-design/icons";
import UserService from "../../UserService/UserService";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const logo = require("../../asset/image/catslogo.png");
const Whitelogo = require("../../asset/image/CatsWhiteLogo.png");

const allItems = [
  getItem("Home", "/user/home", <PieChartOutlined />),
  getItem("Information", "/user/employee", <PieChartOutlined />),
  getItem("Attendance", "/user/attendance", <FieldTimeOutlined />),
  getItem("Staffs Leave", "/user/staff-leave-request", <UserOutlined />),
  getItem("Leave Request", "/user/leave-request", <FormOutlined />),
  getItem("Leave Balance", "/user/leave-balance", <SolutionOutlined />),
  getItem("Payslip", "/user/payslip",<AccountBookOutlined />),
];

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const location = useLocation(); // Get current path
  const currentPath = location.pathname;

  const checkRole = (value) => {
    const matchedRole = value.find(role => UserService.hasRole([role]));
    return matchedRole;
  }

  const getFilteredItems = () => {
    return allItems.filter(item => {
      // If the user has the 'hrms_manager' or 'hrms_head' role, show all menu items
      
     
      if (checkRole(["hrms_manger", "hrms_head"])) {
        return true;
      }

      // Otherwise, show basic menu items for users with only 'user' role
      if (checkRole(['hrms_user'])) {
        return item.key !== "/user/staff-leave-request" ;
      } 

      return false; // Hide other items if no matching roles
    });
  };

  const onChange = (value) => {
    navigate(value.key);
    //console.log(value.key);
  };

  const handleLogoClick = () => {
    navigate("/"); // Change the route as per your requirement
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="title-logo">
          <Button
            type="text"
            onClick={handleLogoClick}
            style={{ padding: 0, border: "none" }}
          >
            <img
              className="logo"
              alt=""
              src={theme === "light" ? logo : Whitelogo}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <div className="header-title">Human Resource Management System</div>
        </div>
        <Space size={"large"}>
          <Notification /> 
          <MenuItems />
        </Space>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ width: 200 }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            selectedKeys={[currentPath]} 
            items={getFilteredItems()}
            onClick={onChange}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#fff",
              borderTop: "1px solid #e8e8e8",
            }}
          >
            © Copyright CATS. All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};


export default UserLayout;
