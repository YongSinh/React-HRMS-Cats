import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import UserAttendance from "./tab/UserAttendance";
import React, { useState, useEffect } from "react";
import EmployeeAttendance from "./tab/EmployeeAtten";
import './TabsAttendance.css';
import UserService from "../../UserService/UserService";
const UserTabsAttendance = () => {
  const [activeKey, setActiveKey] = useState("1");
  const userRoles = UserService.getrole();
  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "Personal Attendance",
      children: <UserAttendance/>,
    },
    {
      key: "2",
      label: "Employee Attendance",
      children: <EmployeeAttendance/>, // Pass activeKey as prop
      disabled:  !UserService.hasRole(["hrms_manger", "hrms_head"]),
    },
  ];
  return (
    <>
      <PageTitle PageTitle="Attendance" />
      <div className="border-box">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"large"}
          items={items}
          onChange={(key) => setActiveKey(key)} // Update activeKey when tab changes
        />
      </div>
    </>
  );
};
export default UserTabsAttendance;
