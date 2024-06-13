import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Staff from "./Staff";
const Tabs_staff = () => {
  const items = [
    {
      key: "1",
      label: "Staff",
      children: < Staff/>,
    },
 
  ];
  return (
    <>
      <PageTitle PageTitle="Staff" />
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Tabs_staff;