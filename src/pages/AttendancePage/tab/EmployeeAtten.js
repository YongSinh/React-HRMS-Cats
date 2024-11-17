import React, { useState, useEffect } from "react";
import { Table, Badge } from "antd";
import { request } from "../../../share/request";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import UserService from "../../../UserService/UserService";
const EmployeeAttendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = UserService.getUsername();
  const getList = () => {
    setLoading(true);
    request(
      "attendanceLeave/attendance/getListAttendanceForManagement?emId=" + userId,
      "get",
      {}
    ).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getList(); // Only fetch data when this tab is active
  }, []);


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
    }
  ];

  return (
    <>
      <Table
        scroll={{
          x: "max-content",
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  );
};

export default EmployeeAttendance;