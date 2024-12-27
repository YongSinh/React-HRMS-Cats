import React, { useState, useEffect } from "react";
import { Tabs, Collapse } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import EducationFormView from "./FormView/EducationFormView";
import EmergencyContactFormView from "./FormView/EmergencyContactFormView";
import SpecialAbilityView from "./FormView/SpecialAbilityView";
import FamilyDataFormView from "./FormView/FamilyDataFormView";
import PersonalDetailFormView from "./FormView/PersonalDetailFormView";
import HistoryFormView from "./FormView/HistoryFormView";
import UserService from "../../UserService/UserService";
const EmployeeView = () => {
  const [activeKey, setActiveKey] = useState("1");
  const id = UserService.getUsername();
  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey, id]);

  const items = [
    {
      key: "1",
      label: "Personal Information",
      children: <PersonalDetailFormView id={id} />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "Job History",
      children: <HistoryFormView id={id} />,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataFormView id={id} />,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationFormView id={id} />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityView id={id} />,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactFormView id={id} />,
    },
  ];


  const onChange = (key) => {
    setActiveKey(key)
  };
  return (
    <>
    <PageTitle PageTitle="Personal Detail" />
    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
      {/* <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        items= {items}
        onChange={(key) => setActiveKey(key)} // Update activeKey when tab changes
      /> */}
    </>
  );
};

export default EmployeeView;
