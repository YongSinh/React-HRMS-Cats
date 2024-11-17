import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, theme } from "antd";
import "./Layout.css";
import MenuItems from './MenuItems'
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  FieldTimeOutlined,
  ControlOutlined,
  BankOutlined,
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

const items = [
  getItem("Home", "/user/home", <PieChartOutlined />),
  getItem("Information", "/user/employee", <PieChartOutlined />),
  getItem("Attendance", "/user/attendance", <FieldTimeOutlined />),
  getItem("Staffs Leave", "/user/staff-leave-request", <UserOutlined />),
  getItem("Leave Request", "/user/leave-request", <UserOutlined />),
  getItem("Leave Balance", "/user/leave-balance", <UserOutlined />),
  getItem("Payslip", "/user/payslip", <UserOutlined />),
];

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const userRoles = UserService.getrole();

  const onChange = (value) => {
    navigate(value.key);
    console.log(value.key);
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
        <MenuItems/>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{width:200}}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
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
