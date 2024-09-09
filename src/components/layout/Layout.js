import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button } from "antd";

import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  FieldTimeOutlined,
  PayCircleOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./Layout.css";
import MenuItems from "./MenuItems/MenuItems";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const gifimage = require("../../asset/image/cambodia-307_256.gif");
const logo = require("../../asset/image/catslogo.png");
const Whitelogo = require("../../asset/image/CatsWhiteLogo.png");

const items = [
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Info & Management", "Info", <InfoCircleOutlined />),
  getItem("Attendance", "Attendance", <FieldTimeOutlined />),
  getItem("Leave Management", "/", <TeamOutlined />, [
    getItem("All Employee", "leave", <TeamOutlined />),
    getItem("Leave Request", "leave-request", <UserOutlined />),
  ]),
  getItem("Department", "Department", <BankOutlined />),
  getItem("Staff", "Staff", <UserOutlined />),
  getItem("Report", "report", <FileOutlined />),
  getItem("Hr Payroll", "//", <SettingOutlined />, [
    getItem("Payroll", "Payroll"),
    getItem("Payslips", "payslip"),
    getItem("Allowances", "allowance"),
    getItem("Deductions", "deduction"),
    getItem("Salary", "salary"),
    getItem("Tax", "tax"),
  ]),
  getItem("Setting", "Setting", <SettingOutlined />, [
    getItem("General", "2"),
    getItem("Leave ", "3"),
    getItem("Attendance ", "4"),
    getItem("Payroll ", "4"),
  ]),
];

const breadcrumbNameMap = {
  "/": "Home",
  "/Dashboard": "Dashboard",
  "/Info": "Info & Management",
  "/Attendance": "Attendance",
  "/leave": "All Employee",
  "/leave-request": "Leave Request",
  "/Payroll": "Payroll",
  "/Department": "Department",
  "/Staff": "Staff",
  "/report": "Report",
  "/Setting": "Setting",
  payroll: "payroll",
  "/payslip": "payslip",
  "/allowance": "allowance",
  "/deduction": "deduction",
  "/Salary": "salary",
  "/tax": "tax",

  "/Setting": "Setting",
  "/Setting/2": "General",
  "/Setting/3": "Leave",
  "/Setting/4": "Attendance",
  "/Setting/5": "Payroll",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [siderKey, setSiderKey] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("Dashboard");

  useEffect(() => {
    const pathKey =
      location.pathname === "/" ? "Dashboard" : location.pathname.split("/")[1];
    setSelectedKey(pathKey);
    localStorage.setItem("selectedMenuKey", pathKey);
  }, [location]);

  useEffect(() => {
    const initialKey = localStorage.getItem("selectedMenuKey") || "Dashboard";
    setSelectedKey(initialKey);
    navigate(`/${initialKey}`);
  }, []);

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>{breadcrumbNameMap[url]}</Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handleBreadcrumbClick()}
      >
        Home
      </span>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const handleBreadcrumbClick = () => {
    navigate("/Dashboard");
    setSiderKey(Date.now());
    localStorage.setItem("selectedMenuKey", "Dashboard");
    setSelectedKey("Dashboard");
  };

  const onChange = (value) => {
    localStorage.setItem("selectedMenuKey", value.key);
    navigate(value.key);
    setSelectedKey(value.key);
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark"
    );
  };

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "auto" }}>
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
              src={darkMode ? logo : Whitelogo}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <div className="header-title">Human Resource Management System</div>
          {/* <div>
            <img 
            className="logoCambodia"
            src={ gifimage }

            style={{ display: "flex", marginLeft: "1rem" }}
            
            />
          </div> */}
        </div>
        <MenuItems darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Header>
      <Layout>
        <Sider
          className="sider-style"
          key={siderKey}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <Menu
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={onChange}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, marginTop: 64 }}>
          <Content
            className="content"
            style={{ background: darkMode ? "#1f1f1f" : "#ffffff" }}
          >
            <Breadcrumb className="breadcrumb fixed-breadcrumb">
              {breadcrumbItems}
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                background: darkMode ? "#1f1f1f" : "#ffffff",
                borderRadius: 8,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: darkMode ? "#1f1f1f" : "#ffffff",
              borderTop: darkMode ? "1px solid #303030" : "1px solid #e8e8e8",
            }}
          >
            <div className="countText">
              © Copyright CATS. All Rights Reserved
            </div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
