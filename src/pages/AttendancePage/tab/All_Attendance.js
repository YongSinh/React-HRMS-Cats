import React, { useState } from "react";
import { EyeFilled, DeleteOutlined, EditFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Select, Table, Tag, Space, Button, Modal, Input } from "antd";
import Title from "antd/es/skeleton/Title";

const { confirm } = Modal;

const All_Attendance = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(() => {
    const initialData = [];
    for (let i = 1; i < 46; i++) {
      initialData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        department: `Department ${i}`,
        position: `Position ${i}`,
        Status: `Active`,
        ID: `001${i}`,
        remark: `Remark ${i}`,
      });
    }
    return initialData;
  });
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [editValues, setEditValues] = useState({});

  const showDeleteConfirm = (ID) => {
    confirm({
      title: 'Are you sure you want to delete this record?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(ID);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = (ID) => {
    setData((prevData) => prevData.filter((item) => item.ID !== ID));
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setEditValues(record);
    setIsEditModalVisible(true);
  };

  const handleEdit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === currentRecord.key ? { ...item, ...editValues } : item
      )
    );
    setIsEditModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setEditValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      render: (_, { ID }) => {
        return (
          <>
            <div>
              <text style={{ fontSize: 13 }}>{ID}</text>
            </div>
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
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
          <>
            <div>
              <Tag style={{ fontSize: 13 }} color={color}>
                {Status}
              </Tag>
            </div>
          </>
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
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeFilled />}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          ></Button>
          <Button
            type="primary"
            icon={<EditFilled />}
            style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
            onClick={() => showEditModal(record)}
          ></Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            style={{ backgroundColor: "#F44336", borderColor: "#F44336" }}
            onClick={() => showDeleteConfirm(record.ID)}
          ></Button>
        </Space>
      ),
    },
  ];

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
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Select
        showSearch
        style={{ marginBottom: 15, marginTop: 7 }}
        placeholder="Select Position"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
      >
        <Input 
       
          value={editValues.ID}
          onChange={(e) => handleInputChange("ID", e.target.value)}
          placeholder="Enter new ID"
          style={{ marginBottom: 8 }}
        />
        
        <Input
          value={editValues.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter new name"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={editValues.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          placeholder="Enter new date"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={editValues.department}
          onChange={(e) => handleInputChange("department", e.target.value)}
          placeholder="Enter new department"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={editValues.position}
          onChange={(e) => handleInputChange("position", e.target.value)}
          placeholder="Enter new position"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={editValues.Status}
          onChange={(e) => handleInputChange("Status", e.target.value)}
          placeholder="Enter new status"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={editValues.remark}
          onChange={(e) => handleInputChange("remark", e.target.value)}
          placeholder="Enter new remark"
        />
      </Modal>
    </>
  );
};

export default All_Attendance;
