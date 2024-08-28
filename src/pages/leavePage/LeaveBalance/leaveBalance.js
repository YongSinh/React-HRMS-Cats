import React, { useState, useCallback, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import "./leaveBalance.css";
import ModelForm from "./ModelForm";
//Componets form antd
import {
  Space,
  Table,
  Tag,
  Button,
  Form,
  Select,
  Typography,
  Input,
  Card,
} from "antd";
import dayjs from "dayjs";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Search } = Input;
const { Title } = Typography;

const columns = [
  {
    title: "Leave Type ID",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Leave Title",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Leave Description",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Total Leave",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Create Date",
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
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const { Option } = Select;

const generateDateRanges = (year) => {
  const ranges = [];
  for (let month = 0; month < 12; month++) {
    const firstHalfStart = new Date(year, month, 1);
    const firstHalfEnd = new Date(year, month, 15);
    const secondHalfStart = new Date(year, month, 16);
    const secondHalfEnd = new Date(year, month + 1, 0); // Last day of the month

    ranges.push(
      `${firstHalfStart.toISOString().split("T")[0]} To ${
        firstHalfEnd.toISOString().split("T")[0]
      }`,
      `${secondHalfStart.toISOString().split("T")[0]} To ${
        secondHalfEnd.toISOString().split("T")[0]
      }`
    );
  }
  return ranges;
};

const LeaveBalancePage = () => {

  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [year, setYear] = useState("2024");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMonthChange = (date) => {
    if (date) {
      const start = date.startOf("month");
      const end = date.endOf("month");
      setStartDate(dayjs(start).format("YYYY-MM-DD"));
      setEndDate(dayjs(end).format("YYYY-MM-DD"));
      console.log("Start Date:", dayjs(start).format("YYYY-MM-DD"));
      console.log("End Date:", dayjs(end).format("YYYY-MM-DD"));
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeYear = (date, dateString) => {
    console.log(date, dateString);
    setYear(dateString);
  };
  const dateRanges = generateDateRanges(year);


  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const handleDateRangeChange = (value) => {
    const [startDate, endDate] = value.split(" To ");
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <>
      <ModelForm
        handleClose={handleCancel}
        handleOk={handleOk}
        open={isModalOpen}
      />
      <PageTitle PageTitle="Leave Balance" />
      <Card style={{ width: "100%" }}>
        <Button type="primary" onClick={showModal}>
          Add Balance
        </Button>

      </Card>
      {/* <Divider dashed /> */}
      <Card style={{ width: "100%", marginTop: 10 }}>
        <Table
          scroll={{
            x: "max-content",
          }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default LeaveBalancePage;
