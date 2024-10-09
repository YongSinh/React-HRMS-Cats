import React, {useState} from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Report from "./Report";
import PersonalReport from "./PersonalReport";
const Tabs_report = () => {
  const [activeKey, setActiveKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Report",
      children: <Report activeKey={activeKey} />,
    },
    {
      key: "2",
      label: "Personal Report",
      children: <PersonalReport activeKey={activeKey} />,
    },
  ];
  return (
    <>
      <PageTitle PageTitle="Report" />
      <div className="border-box">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"large"}
          onChange={(key) => setActiveKey(key)}
          items={items}
        />
      </div>
    </>
  );
};
export default Tabs_report;
