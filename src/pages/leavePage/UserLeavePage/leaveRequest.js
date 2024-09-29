import { Button, Space, DatePicker, Table, Row, Col, Badge } from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  EyeFilled,
  EditFilled,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import PageTitle from "../../../components/Title_Page/TitlePage";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
import Swal from "sweetalert2";
import Drawerleave from "./Drawer";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import dayjs from "dayjs";
import { isEmptyOrNull } from "../../../share/helper";
import DrawerView from "./DrawerView";
import UserService from "../../../UserService/UserService";
const { RangePicker } = DatePicker;

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const LeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [items, setItems] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const today = new Date();
  const showDrawer = (value) => {
    setItems(value);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer2 = (value) => {
    setItems(value);
    setOpen2(true);
  };

  const onClose2 = () => {
    setOpen2(false);
  };
  const getList = () => {
    setLoading(true);
    request("attendanceLeave/leave/getLeaveByEmId/1006", "get", {}).then(
      (res) => {
        if (res) {
          //console.log(res);
          setData(res.data);
          setLoading(false);
        }
      }
    );
  };

  const getListLeaveType = () => {
    setLoading(true);
    request("attendanceLeave/getListLeaveType", "get", {}).then((res) => {
      if (res) {
        //console.log(res);
        const arrTmpP = res.data.map((item) => ({
          label: item.leaveTitle,
          value: item.id,
        }));
        setLeaveType(arrTmpP);
        // setData(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getList();
    getListLeaveType();
  }, []);

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
          <Button onClick={() => showDrawer2(record)} icon={<EyeFilled />} />
          <Button
            // onClick={() => onApprove(record)}
            type="primary"
            disabled={record.approved && !record.cancel}
            icon={<EditFilled />}
          />
          <Button
            type="primary"
            //onClick={() => onReject(record)}
            icon={<CloseOutlined />}
            disabled={record.cancel}
            danger
          />
        </Space>
      ),
    },
  ];

  const onFinish = (items) => {
    var format = "YYYY-MM-DD";
    var remark = isEmptyOrNull(items.remark) ? " " : items.remark;
    var time = isEmptyOrNull(items.time)
      ? "00:00:00"
      : dayjs(items.time).format("hh:mm:ss");

    const reasonDiv = document.createElement("div");
    reasonDiv.innerHTML = items.reason;
    const plainTextReason = reasonDiv.textContent || reasonDiv.innerText || "";
    const remarkDiv = document.createElement("div");
    remarkDiv.innerHTML = items.remark;
    const plainTextRemark = remarkDiv.textContent || remarkDiv.innerText || "";
    const body = {
      empId: 1006,
      startDate: dayjs(items.date[0]).format(format),
      endDate: dayjs(items.date[1]).format(format),
      timeOfHaftDay: time,
      reason: plainTextReason,
      leaveTypeId: items.leaveType,
      remark: plainTextRemark,
      dayOfLeave: items.duration,
      createdAt: today,
    };
    const json = JSON.stringify(body);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("body", blob);
    if (items.upload != null) {
      formData.append("file", items.upload.file);
    }
    let url = "attendanceLeave/leave/add";
    let method = "post";

    // request(url, method, formData).then((res) => {
    //   if (res.code === 200) {
    //     Swal.fire({
    //       title: "Success!",
    //       text: "Your has been saved",
    //       icon: "success",
    //       showConfirmButton: false,
    //       timer: 1500,
    //       // confirmButtonText: "Confirm",
    //     });
    //     getListLeaveType();
    //     setLoading(false);
    //     // setEdit(false);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Something went wrong, please check in error detail!",
    //       text: res.message,
    //     });
    //     setLoading(false);
    //     getListLeaveType();
    //   }
    // });
    console.log(body);
    console.log(items);
  };

  return (
    <>
      <PageTitle PageTitle="Personal Leave" />

      <Row>
        <Col span={12}>
          <Space>
            <RangePicker />
            <Button icon={<SearchOutlined />} type="primary">
              Search
            </Button>
            <div>
              <Button icon={<ExportOutlined />} type="primary">
                Export xlsx
              </Button>
            </div>
          </Space>
        </Col>
        <Col style={{ textAlign: "right" }} span={12}>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={showDrawer}
            type="primary"
          >
            Add Leave
          </Button>
        </Col>
      </Row>
      <Drawerleave
        open={open}
        onClose={onClose}
        items={items}
        leaevType={leaveType}
        onFinish={onFinish}
      />
      <DrawerView open={open2} onClose={onClose2} items={items} />
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
export default LeaveRequest;
