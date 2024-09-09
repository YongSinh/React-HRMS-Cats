import React, { useState } from "react";
import { Table, Select, Button ,Avatar} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";
import ActionMenu from "./ActionMenu";
import ApproveMenu from "./ApproveMenu";
import "./Offspring.css";

const Offspring = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(() => {
    const initialData = [];
    for (let i = 1; i < 46; i++) {
      initialData.push({
        key: i,
        name: `Edward King ${i}`,
        age: `2024-01-01 - 2024-12-31`,
        description: `Description ${i}`,
        position: `Position ${i}`,
        Status: `Active`,
        ID: `001${i}`,
        remark: `Remark ${i}`,
        timeIn: "09:00 AM",
        timeOut: "05:00 PM",
        imageUrl: `https://randomuser.me/api/portraits/men/${i}.jpg`,
      });
    }
    return initialData;
  });

  const [filteredData, setFilteredData] = useState(data);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return (
        (selectedPosition ? item.position === selectedPosition : true) &&
        (selectedDescription ? item.description === selectedDescription : true)
      );
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      render: (_, { ID }) => <div style={{ fontSize: 13 }}>{ID}</div>,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (imageUrl) => <Avatar src={imageUrl} size="large" />,
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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record) => <ActionMenu record={record} setData={setData} setFilteredData={setFilteredData} />,
    },
    {
      title: "Approve",
      key: "Approve",
      render: (_, record) => <ApproveMenu record={record} />,
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <>
      <div style={{ display: "flex", marginBottom: 16, gap: 10 }}>
        <Select
          className="custom-select" 
          style={{ width: 200 }}
          placeholder="Select Description"
          onChange={(value) => setSelectedDescription(value)}
          allowClear
          options={[
            { value: "Description 1", label: "Description 1" },
            { value: "Description 2", label: "Description 2" },
            { value: "Description 3", label: "Description 3" },
          ]}
        />
        <Select
          className="custom-select" 
          style={{ width: 200 }}
          placeholder="Select Position"
          onChange={(value) => setSelectedPosition(value)}
          allowClear
          options={[
            { value: "Position 1", label: "Position 1" },
            { value: "Position 2", label: "Position 2" },
            { value: "Position 3", label: "Position 3" },
          ]}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        rowClassName="table-row"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
      <EditModal
        visible={isEditModalVisible}
        record={currentRecord}
        onClose={() => setIsEditModalVisible(false)}
        setData={setData}
        setFilteredData={setFilteredData}
      />
    </>
  );
};

export default Offspring;
