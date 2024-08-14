import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Payroll from "./Payroll";
const Tabs_payroll = () => {
  const items = [
    {
      key: "1",
      label: "Payroll",
      children: < Payroll/>,
    },
 
  ];
  return (
    <>
      {/* <PageTitle PageTitle="Payroll" /> */}
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Tabs_payroll;