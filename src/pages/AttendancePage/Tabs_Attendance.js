import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import All_Attendance from "./tab/All_Attendance";
import Personal_Attendace from "./tab/Personal_Attendance";
import './TabsAttendance.css';

const Tabs_attendance = () => {
  const items = [
    {
      key: "1",
      label: "All Attendace",
      children: <All_Attendance />,
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
export default Tabs_attendance;
