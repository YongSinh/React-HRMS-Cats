import React, { useState, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import "./leaveBalance.css";
import ModelForm from "./ModelForm";

//Componets form antd
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Card,
} from "antd";
import dayjs from "dayjs";
import { request } from "../../../share/request";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Search } = Input;


const LeaveBalancePage = () => {

  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [year, setYear] = useState("2024");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getListDep = () => {
    request("info/department/department", "get", {}).then((res) => {
      if (res) {
        //console.log(res.data);
        const arrTmpP = res.data.map((dep) => ({
          label: dep.depName,
          value: dep.depId,
        }));
        setDepartment(arrTmpP);
      }
    });
  };
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Leave Balance",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Last Update Date",
      key: "lastUpdateDate",
      dataIndex: "lastUpdateDate",
      render: (text) => `${dayjs(text).format('DD-MM-YYYY h:mm A')}`,
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

  const onChangeYear = (date, dateString) => {
    console.log(date, dateString);
    setYear(dateString);
  };

  useEffect(() => {
    getList();
    getListDep();
  }, []);


  const getList = () => {
    setLoading(true);
    request("attendanceLeave/leaveBalance", "get", {}).then((res) => {
      if (res) {
        //console.log(res);
        setData(res.data);
        setLoading(false);
      }
    });
  };


  return (
    <>
      <ModelForm
        handleClose={handleCancel}
        handleOk={handleOk}
        open={isModalOpen}
        department={department}
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
          loading={loading  }
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
