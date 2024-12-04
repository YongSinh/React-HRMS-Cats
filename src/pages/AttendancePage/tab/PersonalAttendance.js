import React, { useState, useEffect } from "react";
import "./personal_attendance.css";
import { Table, Space, Button, Form, Badge, DatePicker } from "antd";
import { isEmptyOrNull } from "../../../share/helper";
import { request, config } from "../../../share/request";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import TimeInAndOut from "./Drawer";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { SearchOutlined, ExportOutlined } from "@ant-design/icons";
import UserService from "../../../UserService/UserService";
const { RangePicker } = DatePicker;
const PersonalAttendance = ({ activeKey }) => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = UserService.getUsername();

  // Get current date in YYYY-MM-DD format
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
    if (activeKey === "2") {
      getList(); // Only fetch data when this tab is active
    }
  }, [activeKey]);

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

  const onFinish = (value) => {
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

  // Check if employee has already timed in today
  const hasTimedInToday = data.some(
    (record) => record.dateIn === today && !isEmptyOrNull(record.timeIn)
  );

  console.log(hasTimedInToday)

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
            style={{ marginBottom: 15, marginTop: 7 }}
          >
            Time Out
          </Button>
        </Space>
      ),
    },
  ];

  const isEmptyOrNull2 = (date) =>
    !date || date.length !== 2 || !date[0] || !date[1];

  const handleDownloadFile = () => {
    if (!isEmptyOrNull2(date)) {
      const startDate = dayjs(date[0]).format("YYYY-MM-DD");
      const endDate = dayjs(date[1]).format("YYYY-MM-DD");
      const url = `attendanceLeave/report/userAttendance?startDate=${startDate}&endDate=${endDate}&emId=${userId}`;
      request(url, "get", {}).then((res) => {
        if (res) {
          window.open(config.base_server + url, "_blank");
        }
      });
    } else {
      Swal.fire({
        title: "Download leave Report",
        text: "Please Select Date Range!",
        icon: "info",
      });
    }
  };

  const onSeacrh = () => {
    if (!isEmptyOrNull2(date)) {
      setLoading(true);
      var filter = `?dateIn=${date[0]}&dateIn2=${date[1]}&emId=${userId}`;
      request(
        "attendanceLeave/attendance/listAttendanceDateInBetweenAndEmId" +
          filter,
        "get",
        {}
      ).then((res) => {
        if (res) {
          setData(res.data);
          console.log(res.data);
          setLoading(false);
        }
      });
    } else {
      getList();
    }
  };

  const onChangeDate = (value, dataSrting) => {
    setDate(dataSrting);
  };

  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <RangePicker onChange={onChangeDate} />
        <Button icon={<SearchOutlined />} onClick={onSeacrh} type="primary">
          Search
        </Button>
        <Button
          icon={<ExportOutlined />}
          type="primary"
          onClick={handleDownloadFile}
        >
          Export PDF
        </Button>
        <Button type="primary" onClick={showDrawer} disabled={hasTimedInToday}>
          Time In
        </Button>
        <TimeInAndOut
          open={open}
          onClose={onClose}
          onFinish={onFinish}
          edit={edit}
        />
      </Space>

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

export default PersonalAttendance;
