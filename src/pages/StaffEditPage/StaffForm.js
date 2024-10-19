import React, { useState, useEffect } from "react";
import { Form, Tabs, message } from "antd";
import { useParams } from "react-router-dom";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

const StaffEditForm = () => {
  const [activeKey, setActiveKey] = useState("1");
  const { id } = useParams();
  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "Personal Detail",
      children: <PersonalDetailForm activeKey={activeKey} id={id}/>, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "History",
      children: <HistoryForm activeKey={activeKey} id={id}/>,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataForm id={id}/>,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationForm id={id} />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityForm id={id}/>,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactForm id={id}/>,
    },
  ];

  return (
    <>
    <h1>{id}</h1>
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

export default StaffEditForm;
