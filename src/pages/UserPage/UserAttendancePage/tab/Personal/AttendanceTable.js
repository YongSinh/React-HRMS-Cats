import React, { useState } from "react";
import {
  Table,
  DatePicker,
  Avatar,
  Button,
  Space,
  Tag,
  Select,
  Modal,
  Typography,
  Row,
  Col,
} from "antd";
import { EyeFilled } from "@ant-design/icons";
import "./AttendanceTable.css";
import moment from "moment";
const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const AttendanceTable = ({ data }) => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [viewingRecord, setViewingRecord] = useState(null); // State for the selected record
  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

  // Handle date range change
  const handleDateChange = (dates) => {
    setSelectedDateRange(dates);
    filterData(dates, selectedStatus);
  };

  // Handle status change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterData(selectedDateRange, status);
  };

  // Filter data based on selected date range and status
  const filterData = (dates, status) => {
    let filtered = data;

    if (dates) {
      const [startDate, endDate] = dates;
      filtered = filtered.filter((record) => {
        const [recordStartDate, recordEndDate] = record.dateRange
          .split(" - ")
          .map((date) => moment(date, "YYYY-MM-DD"));
        return (
          (recordStartDate.isSameOrAfter(startDate, "day") &&
            recordStartDate.isSameOrBefore(endDate, "day")) ||
          (recordEndDate.isSameOrAfter(startDate, "day") &&
            recordEndDate.isSameOrBefore(endDate, "day"))
        );
      });
    }

    if (status) {
      filtered = filtered.filter((record) => record.Status === status);
    }

    setFilteredData(filtered);
  };

  // Handle viewing details
  const handleViewDetails = (record) => {
    setViewingRecord(record); // Set the selected record to the state
    setIsModalVisible(true); // Show the modal
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      render: (text) => <div style={{ fontSize: 13 }}>{text}</div>,
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
      dataIndex: "dateRange",
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
      render: (Status) => {
        const statusColors = {
          Active: "green",
          Late: "yellow",
          Unactive: "red",
          default: "grey",
        };
        return (
          <Tag color={statusColors[Status] || statusColors.default}>
            {Status}
          </Tag>
        );
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeFilled />}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
            onClick={() => handleViewDetails(record)} // Click event to view details
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={handleDateChange} />
        <Select
          className="custom-select"
          style={{ width: 180, marginLeft: 8 }}
          showSearch
          placeholder="Select Status"
          allowClear // Allow clearing the selection
          onChange={handleStatusChange}
          options={[
            { value: "Active", label: "Active" },
            { value: "Late", label: "Late" },
            { value: "Unactive", label: "Unactive" },
          ]}
        />
      </div>

      <Table columns={columns} dataSource={filteredData} />

      {/* Modal for showing details */}
      {viewingRecord && (
        <Modal
          title={
            <div
              style={{
                borderBottom: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
               marginBottom:"1.2rem"
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Employee Details
              </Title>
            </div>
          }
          visible={isModalVisible}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          width={420} // Modal width
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
          style={{ borderRadius: "8px" }} // Optional: rounded corners for the modal
        >
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={viewingRecord.imageUrl}
                size={120}
                style={{
                  borderRadius: "50%", // Ensures the avatar is round
                  border: "2px solid #f0f0f0", // Optional: adds a border around the avatar
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Optional: adds a shadow effect
                  marginBottom: 16,
                }}
              />
            </Col>
            <Col
              span={16}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Title
                level={4}
                style={{
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                {viewingRecord.name}
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color:"blue"
                }}
              >
                {viewingRecord.position}
              </Text>
            </Col>
          </Row>

          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>ID:</Text>
            </Col>
            <Col span={12}>
              <Text>{viewingRecord.ID}</Text>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>Date Range:</Text>
            </Col>
            <Col span={12}>
              <Text>{viewingRecord.dateRange}</Text>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>Time In:</Text>
            </Col>
            <Col span={12}>
              <Text>{viewingRecord.timeIn}</Text>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>Time Out:</Text>
            </Col>
            <Col span={12}>
              <Text>{viewingRecord.timeOut}</Text>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>Description:</Text>
            </Col>
            <Col span={12}>
              <Text type="secondary">{viewingRecord.description}</Text>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginBottom: 16, borderBottom: "1px solid #ddd" }}
          >
            <Col span={12}>
              <Text strong>Status:</Text>
            </Col>
            <Col span={12}>
              <Text
                strong
                style={{
                  color: viewingRecord.Status === "Active" ? "green" : "red",
                }}
              >
                {viewingRecord.Status}
              </Text>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Text strong>Remark:</Text>
            </Col>
            <Col span={12}>
              <Text>{viewingRecord.remark}</Text>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default AttendanceTable;
