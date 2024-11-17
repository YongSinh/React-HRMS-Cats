import React, { useState, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
import "./paySlip.css";
import { Link } from "react-router-dom";
//Componets form antd
import {
  DatePicker,
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
  Popconfirm
} from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { SendOutlined, EditFilled, DeleteOutlined } from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import { request } from "../../share/request";
import getColumnSearchProps from "../../share/ColumnSearchProps";
const { Title } = Typography;

const PayslipPage = () => {
  const [form] = Form.useForm();
  const [allowances, setAllowances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const [data, setData] = useState([]);
  const [salaryCycle, setSalaryCycle] = useState("1");

  const onChangeType = (value) => {
    setSalaryCycle(value);
    //console.log(value);
  };

  const getListDeductions = () => {
    setLoading(true);
    request("payrolls/deductions", "get", {}).then((res) => {
      if (res) {
        setLoading(false);
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
        setAllowances(arrTmpP);
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

  const onDelete = (Item) => {
    setLoading(true);
    request("payrolls/payslips/delete?id=" + Item.id, "delete", {}).then(
      (res) => {
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
      }
    );
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
  }, []);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId")
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
          <Popconfirm
            title="Delete the PaySlip"
            description="Are you sure to delete this PaySlip?"
            onConfirm={() => onDelete(record)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    //console.log("Success:", values);
    var date = dayjs(values.payrollDate).format("YYYY-MM-DD");
    var param = {
      dateCreated: dayjs(values.createdDate),
      khmerRate: values.khrate,
      payrollDate: date,
      paymentType: values.paymentType,
      emId: values.employees,
    };
    let url = "payrolls/payslips/add";
    let method = "post";
    // case update
    setLoading(true);

    request(url, method, param).then((res) => {
      if (res.code === 200 && res.status) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getList();
        setLoading(false);
        console.log(res)
        //onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.error,
        });
        setLoading(false);
        getList();
        console.log(res)
      }
    });
  };

  const onReset = () => {
    form.resetFields();
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
    {
      value: "3",
      label: "once",
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Payslip" />

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
            //form.resetFields();
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
                rules={[
                  {
                    required: true,
                    message: "Please select employees!",
                  },
                ]}
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
              <Form.Item
                label="Khmer Rate"
                name="khrate"
                rules={[
                  {
                    required: true,
                    message: "Please input Khmer Rate!",
                  },
                ]}
              >
                <Input placeholder="Khmer Riel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Payment Type" name="paymentType">
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
            <Col span={12}>
              <Form.Item
                name={"payrollDate"}
                label="Payroll Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Payroll Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"createdDate"}
                label="Create Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Create  Date!",
                  },
                ]}
              >
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button icon={<SendOutlined />} type="primary" htmlType="submit">
                Generate
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Clear
              </Button>
            </Space>
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

export default PayslipPage;
