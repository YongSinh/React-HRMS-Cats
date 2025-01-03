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
  Popconfirm,
  Modal,
} from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { SendOutlined, EditFilled, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import { request } from "../../share/request";
import getColumnSearchProps from "../../share/ColumnSearchProps";
const { Title } = Typography;

const PayslipPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const [data, setData] = useState([]);
  const [salaryCycle, setSalaryCycle] = useState("1");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeType = (value) => {
    setSalaryCycle(value);
    //console.log(value);
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
  }, []);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
    },
    {
      title: "Payment Type",
      dataIndex: "payType",
      key: "payType",
      render: (payType) =>
        payType === 1
          ? "First Payment"
          : payType === 2
          ? "Second Payment"
          : "Unknown",
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
    var param = {
      khmerRate: values.khrate,
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
        console.log(res);
        //onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.error,
        });
        setLoading(false);
        getList();
        console.log(res);
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageTitle PageTitle="Payroll Item" />
      <Modal
        title={"Add Payroll Item"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
        width={700}
      >
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
            <Col span={24}>
              <Form.Item
                label="Khmer Rate"
                name="khrate"
              >
                <Input placeholder="Khmer Riel" />
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
      </Modal>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Payroll Item
      </Button>
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

export default PayslipPage;
