import React, { useState } from "react";
import { EyeFilled, DeleteOutlined, EditFilled, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Select, Table, Tag, Space, Button, Modal, Input, DatePicker, TimePicker } from "antd";
import moment from "moment";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const All_Attendance = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(() => {
    const initialData = [];
    for (let i = 1; i < 46; i++) {
      initialData.push({
        key: i,
        name: `Edward King ${i}`,
        age: `2024-01-01 - 2024-12-31`,
        department: `Department ${i}`,
        position: `Position ${i}`,
        Status: `Active`,
        ID: `001${i}`,
        remark: `Remark ${i}`,
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
      });
    }
    return initialData;
  });

  const [filteredData, setFilteredData] = useState(data);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
    setFilteredData((prevData) => prevData.filter((item) => item.ID !== ID));
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setEditValues({
      ...record,
      rangeDate: record.age.split(" - ").map((date) => moment(date, "YYYY-MM-DD")),
      timeIn: moment(record.timeIn, "hh:mm A"),
      timeOut: moment(record.timeOut, "hh:mm A"),
    });
    setIsEditModalVisible(true);
  };

  const handleEdit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === currentRecord.key ? { ...item, ...editValues } : item
      )
    );
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.key === currentRecord.key ? { ...item, ...editValues } : item
      )
    );
    setIsEditModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setEditValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleRangeChange = (dates, dateStrings) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      age: `${dateStrings[0]} - ${dateStrings[1]}`,
    }));
  };

  const handleTimeChange = (field, time, timeString) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: timeString,
    }));
  };

  const handlePositionChange = (value) => {
    setSelectedPosition(value);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return (
        (selectedPosition ? item.position === selectedPosition : true) &&
        (selectedDepartment ? item.department === selectedDepartment : true)
      );
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      render: (_, { ID }) => (
        <div>
          <text style={{ fontSize: 13 }}>{ID}</text>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Start Date - End Date",
      dataIndex: "age",
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
   
    {
      title: "Status",
      dataIndex: "Status",
      render: (_, { Status }) => (
        <Tag style={{ fontSize: 13 }} color="green">
          {Status}
        </Tag>
      ),
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Select
        showSearch
        style={{ marginBottom: 15, marginTop: 7 }}
        placeholder="Select Position"
        optionFilterProp="children"
        onChange={handlePositionChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "Position 1", label: "Position 1" },
          { value: "Position 2", label: "Position 2" },
          { value: "Position 3", label: "Position 3" },
        ]}
      />
      <Select
        showSearch
        style={{ marginBottom: 15, marginTop: 7, marginLeft: 10 }}
        placeholder="Select Department"
        optionFilterProp="children"
        onChange={handleDepartmentChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "Department 1", label: "Department 1" },
          { value: "Department 2", label: "Department 2" },
          { value: "Department 3", label: "Department 3" },
        ]}
      />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green", marginLeft: 10 }}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Table rowSelection={rowSelection} columns={columns} dataSource={filteredData} />

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
        <RangePicker
          value={editValues.rangeDate}
          onChange={handleRangeChange}
          format="YYYY-MM-DD"
          style={{ marginBottom: 8, width: '100%' }}
        />
        <TimePicker
          value={editValues.timeIn}
          onChange={(time, timeString) => handleTimeChange("timeIn", time, timeString)}
          format="hh:mm A"
          use12Hours
          style={{ marginBottom: 8, width: '100%' }}
        />
        <TimePicker
          value={editValues.timeOut}
          onChange={(time, timeString) => handleTimeChange("timeOut", time, timeString)}
          format="hh:mm A"
          use12Hours
          style={{ marginBottom: 8, width: '100%' }}
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
