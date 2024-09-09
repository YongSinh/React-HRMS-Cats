import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Offspring from "./tab/Offfspring/Offspring";
import Personal_Attendace from "./tab/Personal/PersonalAttendance";
import './TabsAttendance.css';

const Tabs_Attendance = () => {
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
      label: "Personal Attendance",
      children: <Personal_Attendace />,
    },
    {
      key: "2",
      label: "Offspring",
      children: <Offspring />,
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

export default Tabs_Attendance;

