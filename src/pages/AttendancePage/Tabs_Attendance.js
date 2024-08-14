import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import All_Attendance from "./tab/All_Attendance";
import Personal_Attendace from "./tab/Personal_Attendance";
import './TabsAttendance.css';

const Info = () => {
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const savedActiveKey = localStorage.getItem("activeTabKey");
    if (savedActiveKey) {
      setActiveKey(savedActiveKey);
    }
  }, []);

  const onTabChange = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeTabKey", key);
  };

  const items = [
    {
      key: "1",
      label: "All Attendance",
      children: <All_Attendance />,
    },
    {
      key: "2",
      label: "Personal Attendance",
      children: <Personal_Attendace />,
    },
  ];

  return (
    <div className="border-box">
      <Tabs 
        activeKey={activeKey} 
        onChange={onTabChange} 
        type="card" 
        size={"large"} 
        items={items} 
      />
    </div>
  );
};

export default Info;
