import React, { useState, useCallback, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import "./leaveType.css";
//Componets form antd
import {
  DatePicker,
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
const SELECT_ALL_OPTION = { label: "Select All", value: "_SELECT_ALL_OPTION" };
function useSelectAllOption(options) {
  const optionsWithAllOption = useMemo(
    () => [SELECT_ALL_OPTION, ...options],
    [options]
  );

  /** pass this to Form.Item's getValueFromEvent prop */
  const getValueFromEvent = useCallback(
    (value, selections) => {
      if (!selections?.length) return selections;
      if (!selections?.some((s) => s.value === SELECT_ALL_OPTION.value)) {
        return selections;
      }
      const labelInValue = typeof value[0]?.label === "string";
      // if "Select All" option selected, set value to all options
      // also keep labelInValue in consideration
      return labelInValue ? options : options.map((o) => o.value);
    },
    [options]
  );

  return [getValueFromEvent, optionsWithAllOption];
}
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
const { Option } = Select;

const generateDateRanges = (year) => {
  const ranges = [];
  for (let month = 0; month < 12; month++) {
    const firstHalfStart = new Date(year, month, 1);
    const firstHalfEnd = new Date(year, month, 15);
    const secondHalfStart = new Date(year, month, 16);
    const secondHalfEnd = new Date(year, month + 1, 0); // Last day of the month

    ranges.push(
      `${firstHalfStart.toISOString().split("T")[0]} To ${
        firstHalfEnd.toISOString().split("T")[0]
      }`,
      `${secondHalfStart.toISOString().split("T")[0]} To ${
        secondHalfEnd.toISOString().split("T")[0]
      }`
    );
  }
  return ranges;
};



const LeaveTypePage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [year, setYear] = useState("2024");
  const [salaryCycle, setSalaryCycle] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleMonthChange = (date) => {
    if (date) {
      const start = date.startOf("month");
      const end = date.endOf("month");
      setStartDate(dayjs(start).format("YYYY-MM-DD"));
      setEndDate(dayjs(end).format("YYYY-MM-DD"));
      console.log("Start Date:", dayjs(start).format("YYYY-MM-DD"));
      console.log("End Date:", dayjs(end).format("YYYY-MM-DD"));
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    setSalaryCycle(value);
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeYear = (date, dateString) => {
    console.log(date, dateString);
    setYear(dateString);
  };
  const dateRanges = generateDateRanges(year);
  const options = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
    { label: "three", value: "three" },
  ];
  const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(options);

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

  const handleDateRangeChange = (value) => {
    const [startDate, endDate] = value.split(" To ");
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <>
      <PageTitle PageTitle="Leave Type" />

      <Card style={{ width: "100%" }}>
        <Title level={2}>Create Or Update Leave Type</Title>
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
             
            <Col span={12}>
              <Form.Item 
              label="Leave ID"
              name={"id"}
              rules={[
                {
                  required: true,
                  message: 'Please input Leave Id!',
                },
              ]}
              >
                <Input placeholder="ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label="Leave Title"
              name={"title"}
              rules={[
                {
                  required: true,
                  message: 'Please input Leave Title!',
                },
              ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label="Leave Description"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: 'Please input Leave Description!',
                },
              ]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label="Leave Per Year"
              name={"id"}
              rules={[
                {
                  required: true,
                  message: 'Please input Leave Per Year!',
                },
              ]}
              >
                <Input placeholder="Leave Per Year" />
              </Form.Item>
            </Col>
    
        
          </Row>
          <Form.Item>
            <Button icon={<SendOutlined />} type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider dashed />
      <Card style={{ width: "100%" }}>
        <Table
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

export default LeaveTypePage;
