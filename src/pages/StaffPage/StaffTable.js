import React, { useState } from "react";
import { Table, Button, Space, Tag } from "antd";
import { EyeFilled, EditFilled, DeleteOutlined } from "@ant-design/icons";

const StaffTable = ({ data }) => {
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

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
          <Button
            type="primary"
            icon={<EyeFilled />}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          ></Button>
          <Button
            type="primary"
            icon={<EditFilled />}
            style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
          ></Button>
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

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default StaffTable;
