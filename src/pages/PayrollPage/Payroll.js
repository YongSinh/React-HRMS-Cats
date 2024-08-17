<<<<<<< HEAD
import React from "react";
//Componets form MUI
import Grid from "@mui/material/Unstable_Grid2";

//Componets form antd
import {
  Collapse,
  DatePicker,
  Space,
  Button,
  List,
  Checkbox,
  Form,
  Input,
  Select,
  Tag,
  Radio,
} from "antd";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const PayrollPage = () => {
  const [form] = Form.useForm();
  return (
    <>
      <h2>Preference</h2>
      <div className="info">
        <h3>How payrun works?</h3>
        <ol>
          <li>
            Default pay run is applicable to generate payslip for all employees
            (Except those are updated individually) whenever it executes from
            the Payrun module.
          </li>
          <li>
            You can set pay run individually over the default from the Employees
            details.
          </li>
        </ol>
      </div>

      <div>
        <div style={{ minWidth: "95rem" }}>
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={9}>
              <div className="border-box form-entry">
                <Form
                  form={form}
                  layout="vertical"
                  // layout="horizontal"
                  //  onFinish={onFinish}
                  //  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Grid container spacing={1}>
                    <Grid xs={6}>
                      <Form.Item label="Select Month" name={""}>
                        <Space direction="vertical">
                          <DatePicker onChange={onChange} picker="month" />
                        </Space>
                      </Form.Item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid xs={9}>
                      <Form.Item label="Payrun period" name={"payrun"}>
                        <Space>
                          <Select
                            style={{
                              width: 1000,
                              height: 30,
                            }}
                            Select
                            options={[
                              {
                                value: "monthly",
                                label: "Monthly",
                              },
                              {
                                value: "first of month",
                                label: "First of Month",
                              },
                              {
                                value: "second of month",
                                label: "Second of Month",
                              },
                            ]}
                          />
                        </Space>
                      </Form.Item>
                    </Grid>
                    <Grid xs={9}>
                      <Form.Item label="Payrun generate type" name={"pgt"}>
                        <Space>
                          <Select
                            style={{
                              width: 1000,
                              height: 30,
                            }}
                            Select
                            options={[
                              {
                                value: "monthly",
                                label: "Monthly",
                              },
                              {
                                value: "first of month",
                                label: "First of Month",
                              },
                              {
                                value: "second of month",
                                label: "Second of Month",
                              },
                            ]}
                          />
                        </Space>
                      </Form.Item>
                    </Grid>
                  </Grid>
                  <Button type="primary">Generate</Button>

                  <Button style={{ margin: 10 }}>Cancel</Button>
                </Form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
=======
import React, { useState, useCallback, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
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
import { useParams, Link } from "react-router-dom";
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
    title: "Employee ID",
    dataIndex: "name",
    key: "name",
    fixed: 'left',
    render: (text) => <a>{text}</a>,
  },
  {
    title: "RefNo",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Date Form",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Date To",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Type",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
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
    fixed: 'right',
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
const PayrollPage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now)
  const dateFormat = 'YYYY';
  const [year,setYear] = useState("2024")
  const [salaryCycle, setSalaryCycle] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleMonthChange = (date) => {
    if (date) {
      const start = date.startOf('month');
      const end = date.endOf('month');
      setStartDate(dayjs(start).format('YYYY-MM-DD'));
      setEndDate(dayjs(end).format('YYYY-MM-DD'));
      console.log('Start Date:', dayjs(start).format('YYYY-MM-DD'));
      console.log('End Date:', dayjs(end).format('YYYY-MM-DD'));
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
    setYear(dateString)
  };
  const dateRanges = generateDateRanges(year);
  const options = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
    { label: "three", value: "three" },
  ];
  const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(options);
  const { productId } = useParams();
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
    const [startDate, endDate] = value.split(' To ');
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };


  return (
    <>
      <PageTitle PageTitle="Payroll" />
      <Link to={`/product/1`}>Hello</Link>
      <Space.Compact block>
        <DatePicker onChange={onChangeYear} defaultValue={dayjs(today, dateFormat)} picker="year"  />
        <Select
          placeholder="Select a Salary Cycle"
          optionFilterProp="label"
          onChange={onChange}
          allowClear
          options={[
            {
              value: "1",
              label: "Monthly",
            },
            {
              value: "2",
              label: "Semi-Monthly",
            },
          ]}
        />
        {salaryCycle === "1" ? (
          <DatePicker picker="month"  onChange={handleMonthChange}/>
        ) : (
          <Select 
          style={{ width: 300 }} 
          onChange={handleDateRangeChange}
          placeholder="Select Range">
            {dateRanges.map((range, index) => (
              <Option key={index} value={range}>
                {range}
              </Option>
            ))}
          </Select>
        )}
         <Search style={{ width: 300 }} placeholder="input search text" onSearch={onSearch} enterButton />
      </Space.Compact>
      <br />
      <Card style={{ width: "100%" }}>
        <Title level={2}>Generate Payroll</Title>
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
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please select department!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Department"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  allowClear
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employees"
                getValueFromEvent={getValueFromEvent}
                name="selectWithAllOption"
              >
                <Select
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  mode="multiple"
                  options={optionsWithAllOption}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button icon={<SendOutlined />} type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider dashed />
      <Card style={{ width: "100%" }}>
        <Table 
         scroll={{
          x: 'max-content',
        }}
        columns={columns} dataSource={data} />
      </Card>
>>>>>>> 4bd5d1938f2cc0bd942ba19691ce7a304e7aafae
    </>
  );
};

export default PayrollPage;
