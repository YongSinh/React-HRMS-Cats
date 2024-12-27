import React, { useState, useEffect } from "react";
import { Button, Tabs, Divider, Collapse } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

import EducationFormView from "./FormView/EducationFormView";
import EmergencyContactFormView from "./FormView/EmergencyContactFormView";
import SpecialAbilityView from "./FormView/SpecialAbilityView";
import FamilyDataFormView from "./FormView/FamilyDataFormView";
import PersonalDetailFormView from "./FormView/PersonalDetailFormView";
import HistoryFormView from "./FormView/HistoryFormView";
const StaffEditForm = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey]);

  const handleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const items = [
    {
      key: "1",
      label: "Employee Information",
      children: <PersonalDetailForm id={id} />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "Job History",
      children: <HistoryForm id={id} />,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataForm id={id} />,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationForm id={id} />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityForm id={id} />,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactForm id={id} />,
    },
  ];

  const items2 = [
    {
      key: "1",
      label: "Employee Information",
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
  return (
    <>
      <Button
        onClick={handleEdit}
        type="primary"
        icon={edit ? <EyeOutlined /> : <EditOutlined />}
      >
        {edit ? "View" : "Edit"}
      </Button>
      <Divider />
      <Collapse
        items={edit ? items : items2}
        defaultActiveKey={["1"]}
        onChange={(key) => setActiveKey(key)}
      />
      {/* <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        items= {edit ? items : items2}
        onChange={(key) => setActiveKey(key)} // Update activeKey when tab changes
      /> */}
    </>
  );
};

export default StaffEditForm;
