import "./leavePage.css";
import { Button, Space, DatePicker, Table, Select, Badge, Row, Col } from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  EyeFilled,
  EditFilled,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import PageTitle from "../../../components/Title_Page/TitlePage";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
import { isEmptyOrNull } from "../../../share/helper";
import Swal from "sweetalert2";
import Drawerleave from "./Drawer";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
const { RangePicker } = DatePicker;

const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const LeavePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([]);
  const [items, setItems] = useState([])
  const showDrawer = (value) => {
    setItems(value)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getList = () => {
    setLoading(true);
    request("attendanceLeave/leave/getAll", "get", {}).then((res) => {
      if (res) {
        //console.log(res);
        setData(res.data);
        setLoading(false);
      }
    });
  };


  const onReject = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/approveOrRejectByHr?id=${value.id}&reject=true`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Rejected!",
              text: "Your file has been rejected.",
              icon: "success",
            });
            getList();
            setLoading(false);
          }
        });
      }
    });
  };

  const onApprove = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/approveOrRejectByHr?id=${value.id}&reject=false`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Approved!",
              text: "Leave has been approved.",
              icon: "success",
            });
            getList();
            setLoading(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const onChangeDate = (value, dataSrting) => {
    setDate(dataSrting);
    console.log(dataSrting[0]);
    console.log(dataSrting[1]);
  };

  const onSeacrh = () => {
    console.log(isEmptyOrNull(date[0]))
    if (!isEmptyOrNull(date[0])) {
      setLoading(true);
      var filter = `?startDate=${date[0]}&endDate=${date[1]}`;
      request(
        "attendanceLeave/leave/getLeaveByDateBetween" + filter,
        "get",
        {}
      ).then((res) => {
        if (res) {
          setData(res.data);
          setLoading(false);
        }
      });
    } else {
      getList();
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
      width: 140,
    },
    {
      title: "Leave Date",
      dataIndex: "leave_date",
      render: (_, record) => record.startDate + " to " + record.endDate,
      width: 220,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      width: 200,
    },
    {
      title: "Duration",
      dataIndex: "dayOfLeave",
      width: 100,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: 250,
      ellipsis: true,
    },

    {
      title: "Remark",
      dataIndex: "remark",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Date Create",
      dataIndex: "createdAt",
      width: 180,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (_, record) => {
        let status = record.status ? "success" : "error";
        let text = record.status ? "Send" : "Not yet";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
    {
      title: "Manger Approve",
      dataIndex: "approvedByManger",
      width: 150,
      render: (_, record) => {
        let status = record.approvedByManger ? "success" : "error";
        let text = record.approvedByManger ? "Approved" : "No";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
    {
      title: "Head Approve",
      dataIndex: "approvedByHead",
      width: 150,
      render: (_, record) => {
        let status = record.approvedByHead ? "success" : "error";
        let text = record.approvedByHead ? "Approved" : "No";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
    {
      title: "Hr Approve",
      dataIndex: "approvedByHr",
      width: 150,
      render: (_, record) => {
        let status = record.approvedByHr ? "success" : "error";
        let text = record.approvedByHr ? "Approved" : "No";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
    {
      title: "Approve",
      dataIndex: "approved",
      width: 150,
      render: (_, record) => {
        let status = record.approved ? "success" : "error";
        let text = record.approved ? "Approved" : "No";
        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      },
    },
    {
      title: " Action",
      dataIndex: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showDrawer(record)} icon={<EyeFilled />} />
          <Button
            onClick={() => onApprove(record)}
            type="primary"
            disabled={record.approved && !record.cancel}
            icon={<CheckOutlined />}
          />
          <Button
            type="primary"
            onClick={() => onReject(record)}
            icon={<CloseOutlined />}
            disabled={record.cancel}
            danger
          />
        </Space>
      ),
    },
  ];


  return (
    <>
      <PageTitle PageTitle="Leave" />
      <Space>
        <RangePicker onChange={onChangeDate} />
        <Button icon={<SearchOutlined />} onClick={onSeacrh} type="primary">
          Search
        </Button>
        <div>
          <Button icon={<ExportOutlined />} type="primary">
            Export xlsx
          </Button>
        </div>
      </Space>
      <Drawerleave 
      open={open} 
      onClose={onClose} 
      items={items}
      />
      <Table
        style={{ marginTop: 10 }}
        scroll={{
          x: 2000,
        }}
        loading={loading}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};
// const App = () => <Pagination defaultCurrent={6} total={500} />;
export default LeavePage;
