import React, { useState, useEffect } from "react";
import { DeleteOutlied, SyncOutlined } from "@ant-design/icons";
import { Select, Table, Space, Button, Row, Input, Col, Badge } from "antd";
import { request } from "../../../share/request";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import Swal from "sweetalert2";
const AllAttendance = ({ activeKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const asyncTimeOut = () => {
    Swal.fire({
      title: "Are you sure async time-out?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, async it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        request(
          "attendanceLeave/attendance/manualAsyncTimeOut",
          "post",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Success!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              text: res.message,
            });
            setLoading(false);
          }
        });
      }
    });
  };

  const asyncTimeIn = () => {
    Swal.fire({
      title: "Are you sure async time -n?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, async it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        request(
          "attendanceLeave/attendance/manualAsyncTimeIn",
          "post",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Success!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              text: res.message,
            });
            setLoading(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (activeKey === "1") {
      getList(); // Only fetch data when this tab is active
    }
  }, [activeKey]);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "emId",
      ...getColumnSearchProps("emId"),
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
      dataIndex: "timeOut",
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
      title: "On Leave",
      dataIndex: "onLeave",
      width: 150,
      render: (_, record) => {
        let status = record.onLeave ? "error" : "success";
        let text = record.onLeave ? "on Leave" : "Present";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
  ];

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
      <Row gutter={16}>
        <Col span={12}>
          {/* <Input /> */}
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Space>
            <Button
              icon={<SyncOutlined />}
              onClick={asyncTimeIn}
              type="primary"
            >
              Async-Time-In
            </Button>
            <Button
              icon={<SyncOutlined />}
              onClick={asyncTimeOut}
              type="primary"
            >
              Async-Time-Out
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        style={{ marginTop: 14 }}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default AllAttendance;
