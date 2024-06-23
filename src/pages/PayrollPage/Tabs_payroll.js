import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Payroll from "./Payroll";
import ValuePage from'./Value'
import Manage_audiencePage from './manage_audience'
import PayslipPage from './payslip'
const Tabs_payroll = () => {
  const items = [
    {
      key: "1",
      label: "Payroll",
      children: < Payroll/>,
    },
    {
      key: "2",
      label: "Value",
      children: < ValuePage/>,
    },
    {
      key: "3",
      label: "Manage audience",
      children: < Manage_audiencePage/>,
    },
    {
      key: "4",
      label: "Payslip",
      children: < PayslipPage/>,
    },
 
  ];
  return (
    <>
      <PageTitle PageTitle="Payroll" />
      <div className="border-box">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Tabs_payroll;