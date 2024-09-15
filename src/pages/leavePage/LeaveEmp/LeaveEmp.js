import React, { useState, useEffect, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import { useParams } from "react-router-dom";
import ModelForm from "./ModelForm";
import "./leaveType.css";
//Componets form antd
import {
  Image,
  Space,
  Table,
  Tag,
  Button,
  Spin,
  Form,
  Popconfirm,
  Col,
  Row,
  Divider,
  Typography,
  Input,
  Card,
} from "antd";
import dayjs from "dayjs";
import {
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { request } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;
const picture = require("../../../asset/image/missing-picture.jpg");

const LeaveEmpPage = () => {
  const now = Date.now();
  const [leaveType, setLeaveType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [empInfo, setEmpInfo] = useState([]);
  const [item, setItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
    setEdit(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getList = () => {
    setLoading(true);
    request("attendanceLeave/getLeaveBalanceByEmId?emId=" + id, "get", {}).then(
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

  const onEdit = (Item) => {
    setIsModalOpen(true);
    setItem(Item);
    setEdit(true);
  };

  const getListEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmpInfoById?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          //console.log(res);
          //console.log(res.data)
          setEmpInfo(res.data);
          setLoading(false);
        } else {
          setEmpInfo({
            emId: "",
            fullName: "",
            section: "",
            department: "",
            position: "",
            email: "",
            location: "",
          });
        }
      }
    );
  };

  const columns2 = [
    {
      title: "Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Available",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => onEdit(record)}
            type="primary"
            icon={<EditOutlined />}
          />

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

  const onFinish = (value) => {
    // console.log(item)
    // console.log("update: "+ item)
    let param, url, method;

    if (edit) {
      url = "attendanceLeave/LeaveBalance/update/" + item.id;
      method = "put";
      param = {
        empId: 0,
        balanceAmount: value.balance,
        lastUpdateDate: dayjs(value.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        leaveType: "string",
      };
    } else {
      url = "attendanceLeave/LeaveBalance/add";
      method = "post";
      param = {
        empId: [id],
        balanceAmount: 0,
        lastUpdateDate: dayjs(value.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        leaveType: value.type,
      };
    }
    setIsModalOpen(false);
    console.log(param);
    console.log(method);
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
        setEdit(false);
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

  const columns = [
    {
      title: "Leave Type ID",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Leave Title",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Leave Description",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Leave",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Create Date",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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

  useEffect(() => {
    getList();
    getListEmpInfo();
    getListLeaveType();
  }, []);

  const data1 = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  //attendanceLeave/getLeaveBalanceByEmId?emId=1001'

  return (
    <>
      {/* <PageTitle PageTitle="Leave Type" /> */}
      <ModelForm
        open={isModalOpen}
        onOk={handleOk}
        handleClose={handleCancel}
        item={item}
        onFinish={onFinish}
        leaveType={leaveType}
        edit={edit}
      />
      <Spin spinning={loading}>
        <Card style={{ width: "100%" }}>
          {/* <Title>{id}</Title> */}

          <Form
            name="basic"
            initialValues={{
              remember: false,
            }}
            layout={"vertical"}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Image width={240} style={{ margin: "auto" }} src={picture} />
              </Col>

              <Col span={18}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Employee ID">
                      <Input value={empInfo.emId} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Employee Name">
                      <Input value={empInfo.fullName} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input value={empInfo.email} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Location">
                      <Input value={empInfo.location} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Department">
                      <Input value={empInfo.department} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Position">
                      <Input value={empInfo.position} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
        <Divider dashed />
        <Row gutter={16}>
          <Col span={8}>
            <Title level={3}>Leave Credits</Title>
            {/* <Divider dashed /> */}
            <Card style={{ width: "100%", position: "relative" }}>
              <Button
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "11px",
                  zIndex: "5",
                }}
                type="primary"
                icon={<PlusCircleOutlined />}
                shape="circle"
                onClick={handleOpen}
              />

              <Table
                scroll={{
                  x: "max-content",
                }}
                columns={columns2}
                pagination={false}
                dataSource={data}
              />
            </Card>
          </Col>
          <Col span={16}>
            <Title level={3}>Leave Record</Title>
            {/* <Divider dashed /> */}
            <Card style={{ width: "100%" }}>
              <Table
                scroll={{
                  x: "max-content",
                }}
                columns={columns}
                dataSource={data1}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default LeaveEmpPage;
