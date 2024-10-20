import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Select, Space, Form, Table, Tag } from "antd";
import { EyeFilled, EditFilled, DeleteOutlined } from "@ant-design/icons";
import StaffDrawer from "./StaffDrawer";
import { request, config } from "../../share/request";
import { Link } from "react-router-dom";
import "./Staff.css";
import getColumnSearchProps from "../../share/ColumnSearchProps";
const Staff = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSelectChange = (value, type) => {
    console.log(`selected ${value} for ${type}`);
  };
  const getList = () => {
    setLoading(true);
    request("info/employee/listEmployee", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId")
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "sex",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date Join",
      dataIndex: "joinDate",
    },
    {
      title: "Department",
      dataIndex: "depId",
      ...getColumnSearchProps("depId")
    },
    {
      title: "Position",
      dataIndex: "posId",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
    {
      title: "Action",
      key: "Action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeFilled />}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          />
          <Link to={`/edit-employee/${record.empId}`}>
            <Button
              type="primary"
              icon={<EditFilled />}
              style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
            />
          </Link>

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            style={{ backgroundColor: "#F44336", borderColor: "#F44336" }}
          ></Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getList(); // Only fetch data when this tab is active
  }, []);
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
        <Button
          icon={<SearchOutlined />}
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Search
        </Button>
        <Link to={`/add-employee`}>
          <Button type="primary">Add</Button>
        </Link>
      </Space>
      <Table
        scroll={{
          x: "max-content",
        }}
        columns={columns}
        loading={loading}
        //pagination={false}
        dataSource={data}
      />
      <StaffDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        //onSave={handleSave}
        form={form}
      />
    </>
  );
};

export default Staff;
