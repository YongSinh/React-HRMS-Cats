import React, { useState, useEffect } from "react";
import "./personal_attendance.css";
import { Table, Space, Button, Form, Badge } from "antd";
import { isEmptyOrNull } from "../../../share/helper";
import { request } from "../../../share/request";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import TimeInAndOut from "./Drawer";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import UserService from "../../../UserService/UserService";
const UserAttendance = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = UserService.getUsername();
  const today = dayjs().format("YYYY-MM-DD");
  const getList = () => {
    setLoading(true);
    request(
      "attendanceLeave/attendance/listAttendanceByEmId/" + userId,
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

  const showDrawer = () => {
    setOpen(true);
    setEdit(false);
  };

  const timeOut = (value) => {
    setId(value.id);
    setOpen(true);
    setEdit(true);
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const hasTimedInToday = data.some(
    (record) => record.dateIn === today && !isEmptyOrNull(record.timeIn)
  );

  const onFinish = (value) => {
    //console.log(value);
    var format = "YYYY-MM-DD";
    const dateText = edit ? "dateOut" : "dateIn";
    const timeText = edit ? "timeOut" : "timeIn";
    const time = edit ? "time Out" : "time In";
    var remark = isEmptyOrNull(value.remark) ? " " : value.remark;
    var param = {
      emId: userId,
      [timeText]: dayjs(value.time).format("hh:mm:ss"), // use computed property names
      [dateText]: dayjs(value.date).format(format),
      remark: remark,
    };
    let url;
    let method;

    url = "attendanceLeave/attendance/timeIn";
    method = "post";

    if (edit) {
      url = "attendanceLeave/attendance/timeOut?id=" + id;
      method = "put";
    }
    setLoading(true);

    request(url, method, param).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: `Your has been ${time}!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getList();
        setLoading(false);
        setOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getList();
      }
    });
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            disabled={!isEmptyOrNull(record.timeOut) || record.onLeave}
            onClick={() => timeOut(record)}
            //icon={<PlusOutlined />}
            style={{ marginBottom: 15, marginTop: 7 }}
          >
            Time Out
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        // icon={<PlusOutlined />}
        disabled={hasTimedInToday}
        style={{ marginBottom: 15, marginTop: 7 }}
      >
        Time In 
      </Button>
      <TimeInAndOut
        open={open}
        onClose={onClose}
        onFinish={onFinish}
        edit={edit}
      />
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

export default UserAttendance;
