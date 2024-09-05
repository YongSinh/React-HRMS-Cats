import React, { useState, useCallback, useMemo, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
//Componets form antd
import {
  Space,
  Table,
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
import { request } from "../../share/request";
import Swal from "sweetalert2";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
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
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const handleMonthChange = (date) => {
    if (date) {
      const start = date.startOf("month");
      const end = date.endOf("month");
      setStartDate(dayjs(start).format("YYYY-MM-DD"));
      setEndDate(dayjs(end).format("YYYY-MM-DD"));
      // console.log("Start Date:", dayjs(start).format("YYYY-MM-DD"));
      // console.log("End Date:", dayjs(end).format("YYYY-MM-DD"));
    }
  };
  const getListEmp = (value) => {
    if (!isEmptyOrNull(value)) {
      request(
        `info/employee/listEmployeeByDep?depId=${value}`,
        "get",
        {}
      ).then((res) => {
        if (res) {
          //console.log(res.data);
          const arrTmpP = res.data.map((emp) => ({
            label: emp.firstName + " " + emp.lastName,
            value: emp.empId,
          }));
          setEmp(arrTmpP);
          //setDepartment(arrTmpP);
        }
      });
    } else {
      setEmp(" ");
    }
  };
  const onChangeDep = (value) => {
    getListEmp(value)
   // console.log("search:", value);
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

  const getList = () => {
    setLoading(true);
    request("payrolls/salary/getListSalary", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  useEffect(() => {
    getListDep();
    getList();
  }, []);
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

  const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(emp);
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Form Date",
      dataIndex: "fromDate",
      key: "fromDate",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
    },
    {
      title: "Tax Rate",
      dataIndex: "tax",
      key: "tax",
      render: (text) => `${text * 100}%`,
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
                name="depId"
                label="Select Department"
                rules={[
                  {
                    required: true,
                    message: "Please Select Department!",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  allowClear
                  onChange={onChangeDep}
                  placeholder="Search to Select"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={department}
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
            <Col span={8}>
              <Form.Item label="Salary">
                <Input placeholder="Salary" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Khmer Rate">
                <Input placeholder="Khmer Rate" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tax Rate"
               // getValueFromEvent={getValueFromEvent}
                name="selectWithAllOption"
              >
              <Input placeholder="Tax Rate"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Date"
               // getValueFromEvent={getValueFromEvent}
               // name="selectWithAllOption"
              >
                <RangePicker
                  style={{ width: "100%" }}
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

export default SalaryPage;
