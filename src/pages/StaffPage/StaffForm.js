// import React, { useState } from "react";
// import { Form, Tabs, message } from "antd";
// import PersonalDetailForm from "./Form/PersonalDetailForm";
// import HistoryForm from "./Form/HistoryForm";
// import FamilyDataForm from "./Form/FamilyDataForm";
// import EducationForm from "./Form/EducationForm";
// import SpecialAbilityForm from "./Form/SpecialAbility";
// import EmergencyContactForm from './Form/EmergencyContactForm';

// const StaffForm = ({ onClose }) => {
//   const [form] = Form.useForm();
//   const [activeTabKey, setActiveTabKey] = useState("1");
//   const [formData, setFormData] = useState({
//     personalDetail: {},
//     history: {},
//     familyData: {},
//     education: {},
//     specialAbility: {},
//     emergencyContact: {},
//   });

//   const tabKeys = ["1", "2", "3", "4", "5", "6"];
  
//   const handleSave = () => {
//     form.validateFields()
//       .then((values) => {
//         // Save data based on the current tab
//         const updatedData = { ...formData };
//         const currentTabKey = activeTabKey;
        
//         const tabKeyToData = {
//           "1": "personalDetail",
//           "2": "history",
//           "3": "familyData",
//           "4": "education",
//           "5": "specialAbility",
//           "6": "emergencyContact",
//         };

//         updatedData[tabKeyToData[currentTabKey]] = values;
//         setFormData(updatedData);

//         message.success("Form saved successfully!");

//         // Determine the next tab
//         const nextTabIndex = tabKeys.indexOf(currentTabKey) + 1;
//         if (nextTabIndex < tabKeys.length) {
//           setActiveTabKey(tabKeys[nextTabIndex]);
//         } else {
//           message.success("All forms completed successfully!");
//           onClose();
//         }
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info);
//         message.error("Form validation failed. Please check the inputs.");
//       });
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     message.info("Form reset.");
//   };

//   const handleTabChange = (key) => {
//     setActiveTabKey(key);
//     form.setFieldsValue(formData[{
//       "1": "personalDetail",
//       "2": "history",
//       "3": "familyData",
//       "4": "education",
//       "5": "specialAbility",
//       "6": "emergencyContact",
//     }[key]]);
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       name="form_in_drawer"
//       id="staffForm"
//       onFinish={handleSave}
//     >
//       <Tabs activeKey={activeTabKey} onChange={handleTabChange} type="card">
//         <Tabs.TabPane tab="Personal Detail" key="1">
//           <PersonalDetailForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>

//         <Tabs.TabPane tab="History" key="2">
//           <HistoryForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>

//         <Tabs.TabPane tab="Family Data" key="3">
//           <FamilyDataForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>

//         <Tabs.TabPane tab="Education" key="4">
//           <EducationForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>

//         <Tabs.TabPane tab="SpecialAbility" key="5">
//           <SpecialAbilityForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>

//         <Tabs.TabPane tab="Emergency Contact" key="6">
//           <EmergencyContactForm onSave={handleSave} onCancel={handleCancel} />
//         </Tabs.TabPane>
//       </Tabs>
//     </Form>
//   );
// };

// export default StaffForm;


import React, { useState } from "react";
import { Form, Tabs, message } from "antd";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

// Utility function to check if an object has all empty values
const isEmpty = (obj) => {
  return Object.values(obj).every(
    (value) =>
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
  );
};

const StaffForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [formData, setFormData] = useState({
    personalDetail: {},
    history: {},
    familyData: {},
    education: {},
    specialAbility: {},
    emergencyContact: {},
  });

  const tabKeys = ["1", "2", "3", "4", "5", "6"];

  // Mapping from tab keys to data keys
  const keyToData = {
    "1": "personalDetail",
    "2": "history",
    "3": "familyData",
    "4": "education",
    "5": "specialAbility",
    "6": "emergencyContact",
  };

  const handleSave = () => {
    const currentTabKey = activeTabKey;
    const currentDataKey = keyToData[currentTabKey];
    const currentFormData = form.getFieldsValue();

    if (isEmpty(currentFormData)) {
      message.warning("No data entered in this tab. Please fill in the form before saving.");
      return;
    }

    form
      .validateFields()
      .then((values) => {
        // Save data based on the current tab
        const updatedData = { ...formData };
        updatedData[currentDataKey] = values;
        setFormData(updatedData);

        message.success("Form saved successfully!");

        // Determine the next tab
        const nextTabIndex = tabKeys.indexOf(currentTabKey) + 1;
        if (nextTabIndex < tabKeys.length) {
          const nextTabKey = tabKeys[nextTabIndex];
          setActiveTabKey(nextTabKey);
          // Populate form with the next tab's data if available
          form.setFieldsValue(formData[keyToData[nextTabKey]]);
        } else {
          message.success("All forms completed successfully!");
          onClose();
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Form validation failed. Please check the inputs.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    message.info("Form reset.");
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    const dataKey = keyToData[key];
    form.setFieldsValue(formData[dataKey]);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_drawer"
      id="staffForm"
      onFinish={handleSave}
    >
      <Tabs activeKey={activeTabKey} onChange={handleTabChange} type="card">
        <Tabs.TabPane tab="Personal Detail" key="1">
          <PersonalDetailForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="History" key="2">
          <HistoryForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Family Data" key="3">
          <FamilyDataForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Education" key="4">
          <EducationForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Special Ability" key="5">
          <SpecialAbilityForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Emergency Contact" key="6">
          <EmergencyContactForm onSave={handleSave} onCancel={handleCancel} />
        </Tabs.TabPane>
      </Tabs>
    </Form>
  );
};

export default StaffForm;
