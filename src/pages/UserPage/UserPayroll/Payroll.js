import React, { useState } from "react";
import {
  Table,
  Tag,
  Card,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import moment from "moment";
const { RangePicker } = DatePicker;
const PayrollPage = () => {
  const [isIconUp, setIsIconUp] = useState(null); // For dropdown icon state
  const [filteredData, setFilteredData] = useState([]); // For filtered table data
  const [selectedDates, setSelectedDates] = useState([]); // Store selected date range
  // Original data source
  const data = [
    {
      key: "1",
      name: "John Brown",
      refNo: "RB123",
      dateFrom: "2023-09-01",
      dateTo: "2023-09-30",
      type: "Full-Time",
      status: "Active",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      refNo: "RB124",
      dateFrom: "2023-08-01",
      dateTo: "2023-08-31",
      type: "Part-Time",
      status: "Inactive",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      refNo: "RB125",
      dateFrom: "2023-07-01",
      dateTo: "2023-07-31",
      type: "Contractor",
      status: "Active",
      tags: ["cool", "teacher"],
    },
  ];

  // Set filtered data initially to show all rows
  const [tableData, setTableData] = useState(data);

  // Handle date range selection
  const onDateChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setSelectedDates(dates); // Store selected dates
      filterDataByDateRange(startDate, endDate);
    } else {
      setTableData(data); // Reset to full data when no date is selected
    }
  };

  // Filter the data based on date range
  const filterDataByDateRange = (startDate, endDate) => {
    const filtered = data.filter((item) => {
      const dateFrom = moment(item.dateFrom, "YYYY-MM-DD");
      const dateTo = moment(item.dateTo, "YYYY-MM-DD");
      return (
        dateFrom.isBetween(startDate, endDate, null, "[]") ||
        dateTo.isBetween(startDate, endDate, null, "[]")
      );
    });
    setTableData(filtered); // Update table with filtered data
  };

  // Dropdown Menu Visibility Toggle
  const handleMenuVisibilityChange = (visible, key) => {
    setIsIconUp(visible ? key : null);
  };

  // Handle other actions (View, Edit, Send)
  const handleMenuClick = (action, record) => {
    if (action === "Editing") {
      message.success(`Inviting ${record.name}`);
    } else if (action === "Sending") {
      message.error(`Deleting ${record.name}`);
    }
    setIsIconUp(null); // Close dropdown after action
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "RefNo",
      dataIndex: "refNo",
      key: "refNo",
    },
    {
      title: "Date From",
      dataIndex: "dateFrom",
      key: "dateFrom",
    },
    {
      title: "Date To",
      dataIndex: "dateTo",
      key: "dateTo",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="1"
              onClick={() => handleMenuClick("Editing", record)}
            >
              Invite {record.name}
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => handleMenuClick("Sending", record)}
            >
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            onVisibleChange={(visible) =>
              handleMenuVisibilityChange(visible, record.key)
            }
          >
            <Button
              style={{
                backgroundColor: isIconUp === record.key ? "red" : "#6dfb72",
                color: isIconUp === record.key ? "white" : "#fff",
              }}
            >
              {isIconUp === record.key ? <UpOutlined /> : <DownOutlined />}
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RangePicker
            style={{ marginBottom: "18px" }}
            onChange={onDateChange}
            placeholder={["Date From", "Date To"]} // Custom placeholder text
          />
        </Col>
      </Row>
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default PayrollPage;
