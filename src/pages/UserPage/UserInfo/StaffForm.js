import React, { useState, useEffect } from "react";
import { Form, Tabs } from "antd";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

const StaffForm = () => {
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState("1");

  // Load active tab key from localStorage on component mount
  useEffect(() => {
    const savedTabKey = localStorage.getItem("savedActiveTabKey");
    if (savedTabKey) {
      setActiveTabKey(savedTabKey);
    }
  }, []);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem("savedActiveTabKey", key);
  };

  return (
    <Form form={form} layout="vertical">
      <Tabs activeKey={activeTabKey} onChange={handleTabChange} type="card">
        <Tabs.TabPane tab="Personal Detail" key="1">
          <PersonalDetailForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="History" key="2">
          <HistoryForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Family Data" key="3">
          <FamilyDataForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Education" key="4">
          <EducationForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Special Ability" key="5">
          <SpecialAbilityForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Emergency Contact" key="6">
          <EmergencyContactForm />
        </Tabs.TabPane>
      </Tabs>
    </Form>
  );
};

export default StaffForm;
