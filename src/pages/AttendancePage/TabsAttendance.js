import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import AllAttendance from "./tab/AllAttendance";
import Personal_Attendace from "./tab/Personal_Attendance";
import './TabsAttendance.css';

const TabsAttendance = () => {
  const items = [
    {
      key: "1",
      label: "All Attendace",
      children: <AllAttendance />,
    },
    {
      key: "2",
      label: "Personal Attendace",
      children: <Personal_Attendace />,
    },
  ];

  return (
    <>
      <PageTitle  PageTitle="Attendance" />
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default TabsAttendance;
