import { Button, Space, DatePicker, Table, Row, Col, Badge } from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  EyeFilled,
  EditFilled,
  CloseOutlined,
  PlusCircleOutlined,
  SendOutlined,
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
  const [date, setDate] = useState([]);
  const today = new Date();
  const userId = UserService.getUsername()
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
    request("attendanceLeave/leave/getLeaveByEmId/"+userId, "get", {}).then(
      (res) => {
        if (res) {
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
        setLoading(false);
      }
    });
  };

  const onChangeDate = (value, dataSrting) => {
    setDate(dataSrting);
    console.log(dataSrting[0]);
    console.log(dataSrting[1]);
  };

  const onSeacrh = () => {
    console.log(isEmptyOrNull(date[0]))
    if (!isEmptyOrNull(date[0])) {
      setLoading(true);
      var filter = `?emId=${userId}&startDate=${date[0]}&endDate=${date[1]}`;
      request(
        "attendanceLeave/leave/getLeaveByDateBetweenAndEmId" + filter,
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
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showDrawer2(record)} icon={<EyeFilled />} />
          <Button
            onClick={() => onApply(record)}
            type="primary"
            disabled={record.status}
            icon={<SendOutlined />}
          />
          <Button
            // onClick={() => onApprove(record)}
            type="primary"
            disabled={record.status}
            icon={<EditFilled />}
          />
          <Button
            type="primary"
            onClick={() => onCancel(record)}
            icon={<CloseOutlined />}
            disabled={record.status}
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
    var remark = isEmptyOrNull(plainTextRemark) ? " " : plainTextRemark;
    const body = {
      empId: userId,
      startDate: dayjs(items.date[0]).format(format),
      endDate: dayjs(items.date[1]).format(format),
      timeOfHaftDay: time,
      reason: plainTextReason,
      leaveTypeId: items.leaveType,
      remark: remark,
      dayOfLeave: items.duration,
      createdAt: today,
    };
    const json = JSON.stringify(body);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("body", blob);
    const file = items.upload != null ? items.upload.file : null;
    if (file) {
        formData.append("file", file);
    }
    
    let url = "attendanceLeave/leave/add";
    let method = "post";

    request(url, method, formData).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getListLeaveType();
        setLoading(false);
        // setEdit(false);
        getList()
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getListLeaveType();
        getList()
      }
    });
  };

  

  const onApply = (items) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/apply?id=${items.id}&reject=false`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Apply Leave!",
              text: "Leave has been send.",
              icon: "success",
            });
            getList();
            setLoading(false);
          }
        });
      }
    });
  };

  const onCancel = (items) => {
    Swal.fire({
      title: "Are you sure want to cancel?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/cancelLeave?id=${items.id}`,
          "delete",
          {}
        ).then((res) => {
          if (res.code === 200) {
            Swal.fire({
              title: "Cancel Leave!",
              text: "Leave has been cancelled.",
              icon: "success",
            });
            console.log(res)
            getList();
            setLoading(false);
          }else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: res.message,
            });
            setLoading(false);
            getList();
          }
        });
      }
    });
  };

  return (
    <>
      <PageTitle PageTitle="Personal Leave" />

      <Row>
        <Col span={12}>
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
