import React from "react";
import { Button, Flex, Segmented } from "antd";
import Box from "@mui/material/Box";
import { Tabs } from "antd";
import Personal_Detail from "./tab/Personal_Detail";
import History from "./tab/History";
import Family from "./tab/Family_Data";
import PageTitle from "../../components/Title_Page/TitlePage";
import Education from "./tab/Education";
import Special from "./tab/Special_Ability";
import Past_Employee from "./tab/Past_Employee";
import Emergency from "./tab/Emergency_Contact";
import Children from "./tab/Children";

const Info = () => {
  const items = [
    {
      key: "1",
      label: " Personal Detail",
      children: <Personal_Detail />,
    },
    {
      key: "2",
      label: " History",
      children: <History />,
    },
    {
      key: "3",
      label: " Family Data",
      children: <Family />,
    },
    {
      key: "4",
      label: " Education",
      children: <Education />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <Special />,
    },
    {
      key: "7",
      label: "Emergency Contact",
      children: <Emergency />,
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Info & Management" />

      <div className="border-box match">
        <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
      </div>
    </>
  );
};
export default Info;
