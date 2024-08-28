import React, { useState, useCallback, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import { useParams } from "react-router-dom";
import "./leaveType.css";
//Componets form antd
import {
  Image,
  Space,
  Table,
  Tag,
  Button,
  Form,
  Select,
  Col,
  Row,
  Divider,
  Typography,
  Input,
  Card,
} from "antd";
import dayjs from "dayjs";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";
const { Search } = Input;
const { Title } = Typography;

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
const columns2 = [
  {
    title: "Type",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Available",
    dataIndex: "age",
    key: "age",
  },
];

const LeaveEmpPage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [year, setYear] = useState("2024");

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeYear = (date, dateString) => {
    console.log(date, dateString);
    setYear(dateString);
  };
  const { id } = useParams();
  const data = [
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

  return (
    <>
      {/* <PageTitle PageTitle="Leave Type" /> */}

      <Card style={{ width: "100%" }}>
        <Title>{id}</Title>
        <Button icon={<SendOutlined />} type="primary" htmlType="submit">
          submit
        </Button>
        <Divider dashed />
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          layout={"vertical"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Image
                width={240}
                style={{ margin: "auto" }}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>

            <Col span={18}>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item label="Employee ID" name={"id"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Employee Name" name={"name"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name={"email"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Location" name={"location"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Department" name={"departmenr"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Position" name={"position"}>
                    <Input />
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
          <Card style={{ width: "100%" }}>
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
              dataSource={data}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LeaveEmpPage;
