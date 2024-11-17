import React, { useState, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import "./leaveBalance.css";
import ModelForm from "./ModelForm";
import Swal from "sweetalert2";
import {
  EyeFilled,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";
//Componets form antd
import { Space, Table, Button, Input, Card, Popconfirm, Row, Col } from "antd";
import dayjs from "dayjs";
import { request } from "../../../share/request";
import { isEmptyOrNull } from "../../../share/helper";
import { Link } from "react-router-dom";

const LeaveBalancePage = () => {
  // const now = Date.now();
  // const today = dayjs(now);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [department, setDepartment] = useState([]);
  const [emId, setEmId] = useState("");
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

  const onDelete = (Item) => {
    request(
      "attendanceLeave/LeaveBalance/delete/" + Item.id,
      "delete",
      {}
    ).then((res) => {
      if (res) {
        Swal.fire({
          title: "Success!",
          text: "Your has been deleted",
          icon: "success",
          showConfirmButton: true,
          //timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getList();
        setLoading(false);
      }
    });
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
      render: (text) => `${dayjs(text).format("DD-MM-YYYY h:mm A")}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          {/* <Link to={`/leave-employee/${record.empId}`}>
            <Button type="success" size="small">
              <EyeFilled />
              view
            </Button>
          </Link> */}

          <Link to={`/leave-employee/${record.empId}`}>
            <Button
              //onClick={() => handleClickView(record)}
              type="info"
              icon={<EyeFilled />}
            />
          </Link>
          <Link to={`/leave-employee/${record.empId}`}>
            <Button
              //onClick={() => onEdit(record)}
              type="primary"
              icon={<EditOutlined />}
            />
          </Link>

          <Popconfirm
            title="Delete the Type"
            description="Are you sure to delete this type?"
            onConfirm={() => onDelete(record)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getList();
    getListDep();
    getListLeaveType();
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

  const onSearch = () => {
    setLoading(true);
    if (!isEmptyOrNull(emId)) {
      request(
        `attendanceLeave/getLeaveBalanceByEmId?emId=${emId}`,
        "get",
        {}
      ).then((res) => {
        if (res) {
          //console.log(res);
          setData(res.data);
          setLoading(false);
        }
      });
    }
  };

  const onClickClear = () => {
    getList();
    setEmId("");
  };

  const onChangeEmId = (e) => {
    setEmId(e.target.value);
    console.log(e.target.value);
  };

  const onFinish = (value) => {
    //console.log(value)
    var param = {
      empId: value.employee,
      balanceAmount: 0,
      lastUpdateDate: dayjs(value.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      leaveType: value.type,
    };
    // console.log(param)
    let url;
    let method;
    url = "attendanceLeave/LeaveBalance/add";
    method = "post";
    //console.log(date)
    setLoading(true);

    request(url, method, param).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been save!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getList();
        setLoading(false);
        setIsModalOpen(false);
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

  return (
    <>
      <ModelForm
        handleClose={handleCancel}
        handleOk={handleOk}
        open={isModalOpen}
        department={department}
        leaveType={leaveType}
        onFinish={onFinish}
      />
      <PageTitle PageTitle="Leave Balance" />
      <Card style={{ width: "100%" }}>
        <Row>
          <Col span={20}>
            <Space>
              <Input
                placeholder="Employees ID"
                value={emId}
                onChange={onChangeEmId}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={onSearch}
              >
                Search
              </Button>
              <Button
                type="primary"
                icon={<ClearOutlined />}
                onClick={onClickClear}
                danger
              >
                Clear
              </Button>
            </Space>
          </Col>
          <Col style={{ textAlign: "right" }} span={4}>
            <Button type="primary" onClick={showModal}>
              Add Balance
            </Button>
          </Col>
        </Row>
      </Card>
      {/* <Divider dashed /> */}
      <Card style={{ width: "100%", marginTop: 10 }}>
        <Table
          loading={loading}
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
