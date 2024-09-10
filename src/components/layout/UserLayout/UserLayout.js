import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button } from "antd";
import {
  FieldTimeOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
// import MenuItems from "../MenuItems/MenuItems";
import UserMenuItems from "./UserMenuItems/UserMenuItems";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const gifimage = require("../../../asset/image/cambodia-307_256.gif");
const logo = require("../../../asset/image/catslogo.png");
const Whitelogo = require("../../../asset/image/CatsWhiteLogo.png");

const items = [
  getItem("Attendance", "userpage/attendance", <FieldTimeOutlined />),

  getItem("Payroll", "userpage/Payroll", <SettingOutlined />),
  getItem("Staff", "userpage/Staff", <UserOutlined />),
];

const breadcrumbNameMap = {
  "/": "Home",
  "/userpage/attendance": "Attendance",

  "/userpage/Payroll": "Payroll",
  "/userpage/Staff": "Staff",
};

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [siderKey, setSiderKey] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("userpage/Attendance");

  useEffect(() => {
    const pathKey = location.pathname.split("/").slice(1).join("/");
    setSelectedKey(pathKey);
    localStorage.setItem("selectedMenuKey", pathKey);
  }, [location]);

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
    navigate("/userpage/Attendance");
    setSiderKey(Date.now());
    localStorage.setItem("selectedMenuKey", "userpage/Attendance");
    setSelectedKey("userpage/Attendance");
  };

  const onChange = (value) => {
    localStorage.setItem("selectedMenuKey", value.key);
    navigate(`/${value.key}`);
    setSelectedKey(value.key);
  };

  const handleLogoClick = () => {
    navigate("/userpage/Attendance");
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
        </div>
        <UserMenuItems darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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

export default UserLayout;
