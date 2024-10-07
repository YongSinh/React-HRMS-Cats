import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import AllAttendance from "./tab/AllAttendance";
import PersonalAttendace from "./tab/PersonalAttendance";
import React, { useState, useEffect } from "react";
import './TabsAttendance.css';

const TabsAttendance = () => {
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "All Attendance",
      children: <AllAttendance activeKey={activeKey} />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "Personal Attendance",
      children: <PersonalAttendace activeKey={activeKey}/>,
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
export default TabsAttendance;
