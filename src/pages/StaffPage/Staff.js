import React, { useState,useEffect } from "react";
import {SearchOutlined} from '@ant-design/icons';
import { Button, Select, Space, Form } from "antd";
import StaffTable from "./StaffTable";
import StaffDrawer from "./StaffDrawer";
import "./Staff.css";

const initialData = [];
for (let i = 1; i < 28; i++) {
  initialData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    Status: `Active`,
    ID: `KH007${i.toString().padStart(2, "0")}`,
    department: `Department ${i % 5}`,
    position: `Position ${i % 3}`,
  });
}


const Staff = () => {

  const [data, setData] = useState(initialData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSelectChange = (value, type) => {
    console.log(`selected ${value} for ${type}`);
  };

  const handleSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();

        const newEntry = {
          key: data.length + 1,
          employeeId: values.employeeId,
          firstName: values.firstName,
          lastName: values.lastName,
          fullName: `${values.firstName} ${values.lastName}`,
          gender: values.gender,
          phone: values.phone,
          email: values.email,
          workType: values.workType,
          department: values.department,
          workingSite: values.workingSite,
          section: values.section,
          position: values.position,
          startWork: values.startWork
            ? values.startWork.format("YYYY-MM-DD")
            : null,
          endWork: values.endWork ? values.endWork.format("YYYY-MM-DD") : null,
          address: values.address,
          liveIn: values.liveIn,
          dateOfBirth: values.dateOfBirth
            ? values.dateOfBirth.format("YYYY-MM-DD")
            : null,
          height: values.height,
          weight: values.weight,
          race: values.race,
          nationality: values.nationality,
          religion: values.religion,
          placeOfBirth: values.placeOfBirth,
          idCardNo: values.idCardNo,
          issuedPlace: values.issuedPlace,
          issuedDate: values.issuedDate
            ? values.issuedDate.format("YYYY-MM-DD")
            : null,
          expDate: values.expDate ? values.expDate.format("YYYY-MM-DD") : null,
          drivingLicense: values.drivingLicense,
          passportId: values.passportId,
          passportExpDate: values.passportExpDate
            ? values.passportExpDate.format("YYYY-MM-DD")
            : null,
          emergencyContactFirstName: values.emergencyContactFirstName,
          emergencyContactLastName: values.emergencyContactLastName,
          emergencyContactGender: values.emergencyContactGender,
          emergencyContactAge: values.emergencyContactAge,
          emergencyContactEducation: values.emergencyContactEducation,
          emergencyContactOccupation: values.emergencyContactOccupation,
          emergencyContactPosition: values.emergencyContactPosition,
          emergencyContactOffice: values.emergencyContactOffice,
        };

        setData([...data, newEntry]);
        setDrawerVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });


  
    
  };

  return (
    <>
      <Space style={{ marginBottom: 15, marginTop: 7 }}>
        <Select
          showSearch
          placeholder="Select ID"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "ID")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "0011", label: "0011" }]}
        />
        <Select
          showSearch
          placeholder="Select Position"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Position")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "Position 1", label: "Position 1" }]}
        />
        <Select
          showSearch
          placeholder="Select Department"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Department")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "Department 1", label: "Department 1" }]}
        />
        <Button icon={<SearchOutlined />}
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Search
        </Button>
        <Button type="primary" onClick={showDrawer}>
          Add
        </Button>
      </Space>
      <StaffTable data={data} setData={setData} />
      <StaffDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        onSave={handleSave}
        form={form}
      />
    </>
  );
};

export default Staff;
