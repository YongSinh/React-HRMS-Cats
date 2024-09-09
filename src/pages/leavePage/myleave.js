import React, { useState } from "react";
import {
  PlusOutlined,
  EyeFilled,
  EditFilled,
  DeleteOutlined,
  SendOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Button,
  Select,
  Space,
  DatePicker,
  Table,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import Drawerleave from "./Drawer";
import PageTitle from "../../components/Title_Page/TitlePage";
const { RangePicker } = DatePicker;
const LeaveRequest = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleMenuClick = (e) => {
    console.log('click', e);
    // Add logic here for each menu item based on e.key
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EyeFilled />} style={{ color: "#4CAF50" }}>
        View
      </Menu.Item>
      <Menu.Item key="2" icon={<EditFilled />} style={{ color: "#2196F3" }}>
        Edit
      </Menu.Item>
      <Menu.Item key="3" icon={<SendOutlined />} style={{ color: "#FFC107" }}>
        Send
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<DeleteOutlined />}
        
        style={{ color: "#F44336" }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: "No",
      dataIndex: "no",
    },

    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Leave Date",
      dataIndex: "leave_date",
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
    },
    {
      title: "Leave Duration",
      dataIndex: "duration",
    },
    {
      title: "Department",
      dataIndex: "department",
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: "Position",
      dataIndex: "posId",
    },
    {
      title: "Approve",
      dataIndex: "approve",
    },
    {
      title: "Remark",
      dataIndex: "remarl",
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
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
      title: "Action",
      dataIndex: "action",
      render: (_) => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button style={{   borderColor: "transparent", fontSize:"18px", padding:"0"}}>
           <MoreOutlined /> 
          </Button>
        </Dropdown>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: 1,
      name: " Tonny",
      department: "MIS",
      leave_type: "Anual Leave",
      duration: 2,
      posId: "Head of IT",
      leave_date: "2024-01-01",
    },
    {
      key: "2",
      no: 2,
      name: "David",
      department: "MIS",
      leave_type: "Anual Leave",
      duration: 2,
      posId: "System Devloper",
      leave_date: "2024-01-01",
    },
    {
      key: "3",
      no: 3,
      name: "John Brown",
      department: "MIS",
      leave_type: "Anual Leave",
      duration: 2,
      posId: "Cyber Security",
      leave_date: "2024-01-01",
    },
    {
      key: "4",
      no: 4,
      name: "Jim Green",
      department: "MIS",
      leave_type: "Sick Leave",
      duration: 1,
      posId: "Data Analysis",
      leave_date: "2024-01-01",
    },
  ];
  return (
    <>
      <PageTitle PageTitle="Leave Request" />
      <Space>
        <Select
          style={{
            width: 180,
            height: 30,
          }}
          Select
          showSearch
          placeholder="Leave Type"
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
          style={{
            width: 180,
            height: 30,
          }}
          Select
          showSearch
          placeholder="Status"
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

        <RangePicker />
        <Button
          style={{ width: 180, height: 30 }}
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Request Leave
        </Button>
        <Drawerleave open={open} onClose={onClose} />
      </Space>
      <Table style={{ marginTop: 10 }} dataSource={data} columns={columns} />;
    </>
  );
};
export default LeaveRequest;
