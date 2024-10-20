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
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Attendance", "Attendance", <FieldTimeOutlined />),
  getItem("Leave Management", "/", <TeamOutlined />, [
    getItem("All Employee", "leave", <TeamOutlined />),
    getItem("Leave Type", "leave-type", <TeamOutlined />),
    getItem("Leave Balance", "leave-balance", <ControlOutlined />),
    getItem("Leave Request", "leave-request", <UserOutlined />),
  ]),
  getItem("Info Management", "Management", <TeamOutlined />, [
    getItem("Department", "Department", <BankOutlined />),
    getItem("Position", "position", <BankOutlined />),
    getItem("Employees", "employee", <UserOutlined />),
  ]),
  getItem("Hr Payroll", "Setting", <SettingOutlined />, [
    getItem("Payroll", "/payroll"),
    getItem("Payroll Report", "/payroll-report"),
    getItem("Payslips", "/payslip"),
    getItem("Allowances", "/allowance"),
    getItem("Deductions", "/deduction"),
    getItem("Salary", "/salary"),
    getItem("Tax", "/tax"),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

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

export default MainLayout;
