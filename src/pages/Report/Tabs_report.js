import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Report from "./Report";
const Tabs_report = () => {
  const items = [
    {
      key: "1",
      label: "Report",
      children: < Report/>,
    },
 
  ];
  return (
    <>
      <PageTitle PageTitle="Report" />
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Tabs_report;