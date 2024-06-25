import React, { useState } from "react";
import { EyeFilled, DeleteOutlined, EditFilled } from "@ant-design/icons";
import { Select, Table, Tag, Space, Button, Modal, Form, Input } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    render: (_, { ID }) => (
      <div>
        <span style={{ fontSize: 13 }}>{ID}</span>
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Gender",
    dataIndex: "age",
  },
  {
    title: "Email",
    dataIndex: "age",
  },
  {
    title: "Date",
    dataIndex: "age",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (_, { Status }) => {
      let color = "green";
      return (
        <div>
          <Tag style={{ fontSize: 13 }} color={color}>
            {Status}
          </Tag>
        </div>
      );
    },
  },
  {
    title: "Remark",
    dataIndex: "remark",
  },
  {
    title: "Action",
    key: "Action",
    render: () => (
      <Space>
        <Button icon={<EyeFilled />} />
        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];

const initialData = [];
for (let i = 1; i < 46; i++) {
  initialData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    Status: `Active`,
    ID: `001${i}`,
    department: `Department ${i % 5}`,
    position: `Position ${i % 3}`,
  });
}

const Staff = () => {
  const [data, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  // Select Handlers
  const handleSelectChange = (value, type) => {
    console.log(`selected ${value} for ${type}`);
  };

  const handleSearch = (value) => {
    console.log("search:", value);
  };

  // Filter option for select
  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setData([...data, { key: data.length + 1, ...values, Status: 'Active' }]);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          options={[
            { value: "0011", label: "0011" },
            { value: "0022", label: "0022" },
            { value: "0033", label: "0033" },
          ]}
        />
        <Select
          showSearch
          placeholder="Select Position"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Position")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[
            { value: "Position 1", label: "Position 1" },
            { value: "Position 2", label: "Position 2" },
            { value: "Position 3", label: "Position 3" },
          ]}
        />
        <Select
          showSearch
          placeholder="Select Department"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Department")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[
            { value: "Department 1", label: "Department 1" },
            { value: "Department 2", label: "Department 2" },
            { value: "Department 3", label: "Department 3" },
          ]}
        />
        <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
          Search
        </Button>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </Space>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <Modal title="Add New Staff" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="ID"
            label="ID"
            rules={[{ required: true, message: 'Please input the ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please input the department!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please input the position!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="remark"
            label="Remark"
            rules={[{ required: false, message: 'Please input the remark!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Staff;

