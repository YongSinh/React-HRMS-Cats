import React, { useState, useEffect } from "react";
import { Form, Tabs, message } from "antd";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

const StaffForm = () => {
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "Personal Detail",
      children: <PersonalDetailForm activeKey={activeKey} />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "History",
      children: <HistoryForm activeKey={activeKey} />,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataForm />,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationForm />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityForm />,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactForm />,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        items={items}
        onChange={(key) => setActiveKey(key)} // Update activeKey when tab changes
      />
    </>
  );
};

export default StaffForm;
