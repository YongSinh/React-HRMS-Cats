import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Department from "./Department";
const Tabs_Department = () => {
  const items = [
    {
      key: "1",
      label: "Department",
      children: < Department/>,
    },
 
  ];
  return (
    <>
      <PageTitle PageTitle="Department" />
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Tabs_Department;
   