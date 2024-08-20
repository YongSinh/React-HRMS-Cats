import React, { useState, useCallback, useMemo } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
//Componets form antd
import {
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
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { SendOutlined, DownloadOutlined,EditFilled,DeleteOutlined } from "@ant-design/icons";
const { Search } = Input;
const { Title } = Typography;
const { RangePicker } = DatePicker;
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
    fixed: "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Salary",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Form Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "To Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tax",
    dataIndex: "address",
    key: "address",
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, ) => (
      <Space>

        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
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
const SalaryPage = () => {
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
      <PageTitle PageTitle="Salary" />
      <Space.Compact block>
        <DatePicker
          onChange={onChangeYear}
          defaultValue={dayjs(today, dateFormat)}
          picker="year"
        />
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
          <DatePicker picker="month" onChange={handleMonthChange} />
        ) : (
          <Select
            style={{ width: 300 }}
            onChange={handleDateRangeChange}
            placeholder="Select Range"
          >
            {dateRanges.map((range, index) => (
              <Option key={index} value={range}>
                {range}
              </Option>
            ))}
          </Select>
        )}
        <Search
          style={{ width: 300 }}
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space.Compact>
      <br />
      <Card style={{ width: "100%" }}>
        <Title level={2}>Generate Salary</Title>
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
            <Col span={12}>
              <Form.Item label="Salary">
                <Input placeholder="Salary" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tax Rate"
                getValueFromEvent={getValueFromEvent}
                name="selectWithAllOption"
              >
                <Select
                  showSearch
                  placeholder="Select a Payment Type"
                  allowClear
                  mode="multiple"
                  options={optionsWithAllOption}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Date"
                getValueFromEvent={getValueFromEvent}
                name="selectWithAllOption"
              >
                <RangePicker
                  style={{width:"100%"}}
                  id={{
                    start: "startInput",
                    end: "endInput",
                  }}
                  onFocus={(_, info) => {
                    console.log("Focus:", info.range);
                  }}
                  onBlur={(_, info) => {
                    console.log("Blur:", info.range);
                  }}
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
            x: "max-content",
          }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default SalaryPage;
