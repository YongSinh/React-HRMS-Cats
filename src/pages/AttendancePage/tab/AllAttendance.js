import React, { useState, useEffect } from "react";
import {
  EyeFilled,
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Select, Table,  Space, Button, Modal, Input } from "antd";
import { request } from "../../../share/request";

const { confirm } = Modal;

const AllAttendance = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [editValues, setEditValues] = useState({});

  const showDeleteConfirm = (ID) => {
    confirm({
      title: "Are you sure you want to delete this record?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(ID);
      },
      onCancel() {
        console.log("Cancel");
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

  const getList = () => {
    setLoading(true);
    request("attendanceLeave/attendance/listAttendance", "get", {}).then(
      (res) => {
        if (res) {
          setData(res.data);
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "emId",
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
    },
    {
      title: "Date In",
      dataIndex: "dateIn",
    },
    {
      title: "Time Out",
      dataIndex: "timeout",
    },
    {
      title: "Date Out",
      dataIndex: "dateOut",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            style={{ backgroundColor: "#F44336", borderColor: "#F44336" }}
            onClick={() => showDeleteConfirm(record.ID)}
          />
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
      <Select
        showSearch
        style={{ marginBottom: 15, marginTop: 7, marginLeft: 10 }}
        placeholder="Select Department"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: "iT",
            label: "IT",
          },
          {
            value: "deverloper",
            label: "Deverloper",
          },
          {
            value: "ui/ux",
            label: "UI/UX",
          },
        ]}
      />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{
          backgroundColor: "green",
          borderColor: "green",
          marginLeft: 10,
        }}
      >
        Search
      </Button>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  );
};

export default AllAttendance;
