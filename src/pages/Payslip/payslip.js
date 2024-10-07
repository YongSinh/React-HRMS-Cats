import React, { useState, useCallback, useMemo, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
import "./paySlip.css";
import { Link } from "react-router-dom";
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
import { SendOutlined, EditFilled } from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import { request } from "../../share/request";
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
const PayslipPage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [empList, setEmpList] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2024");
  const [salaryCycle, setSalaryCycle] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChangeType = (value) => {
    setSalaryCycle(value);
    //console.log(value);
  };
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
  
  const getListDeductions = () => {
    setLoading(true);
    request("payrolls/deductions", "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        console.log(res.data);
      }
    });
  };

  const getListAllowances = () => {
    setLoading(true);
    request("payrolls/allowances", "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        const arrTmpP = res.data.map((items) => ({
          label: items.allowances,
          value: items.allid,
        }));
        setAllowances(arrTmpP)
      }
    });
  };

  const getList = () => {
    setLoading(true);
    request("payrolls/payslips", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  const getListEmp = (value) => {
    if (!isEmptyOrNull(value)) {
      request(`info/employee/listEmployeeByDep?depId=${value}`, "get", {}).then(
        (res) => {
          if (res) {
            //console.log(res.data);
            const arrTmpP = res.data.map((emp) => ({
              label: emp.empId.toString(),
              value: emp.empId,
            }));
            setEmp(arrTmpP);
            //setDepartment(arrTmpP);
          }
        }
      );
    } else {
      setEmp(" ");
    }
  };
  const onChangeDep = (value) => {
    getListEmp(value);
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
  useEffect(() => {
    getListDep();
    getList();
    getListAllowances();
    getListDeductions();
  }, [empList]);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
    },
    {
      title: "Payment Type",
      dataIndex: "payType",
      key: "payType",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Allownace",
      dataIndex: "allowances",
      key: "allowances",
    },
    {
      title: "Allownace Amount",
      dataIndex: "allowanceAmount",
      key: "allowanceAmount",
    },
    {
      title: "Deductios",
      dataIndex: "deductions",
      key: "deductions",
    },
    {
      title: "Deduction Amount",
      dataIndex: "deductionAmount",
      key: "deductionAmount",
    },
    {
      title: "Net Pay",
      dataIndex: "net",
      key: "net",
    },
    {
      title: "Create Date",
      key: "tadateCreatedgs",
      dataIndex: "dateCreated",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
         
         <Link to={`/edit-payslip/${record.id}`}>
            <Button
              //onClick={() => handleClickView(record)}
              type="info"
              icon={<EditFilled />}
            />
          </Link>
         
        </Space>
      ),
    },
  ];

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

  const handleDateRangeChange = (value) => {
    const [startDate, endDate] = value.split(" To ");
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  const typeOption = [
    {
      value: "1",
      label: "First Payment",
    },
    {
      value: "2",
      label: "Second Payment",
    },
  ];
  return (
    <>
      <PageTitle PageTitle="Payslip" />
      {/* <Space.Compact block>
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
      <br /> */}
      <Card style={{ width: "100%" }}>
        <Title level={2}>Generate Payslips</Title>
        <Divider dashed />
        <Form
          form={form}
          initialValues={{
            remember: false,
          }}
          layout={"vertical"}
          onFinish={(item) => {
            form.resetFields();
            onFinish(item);
          }}
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
                  onChange={onChangeDep}
                  allowClear
                  options={department}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employees"
                name="employees"
              >
                <Select
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  mode="multiple"
                  options={emp}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Khmer Rate">
                <Input placeholder="Khmer Riel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Payment Type"
                name="paymentType"
              >
                <Select
                  placeholder="Select a Type"
                  optionFilterProp="label"
                  onChange={onChangeType}
                  value={salaryCycle}
                  allowClear
                  options={typeOption}
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

export default PayslipPage;
