import React, { useState, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
import getColumnSearchProps from "../../share/ColumnSearchProps";
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
  Modal,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import { request } from "../../share/request";
import Swal from "sweetalert2";
import {
  SendOutlined,
  EyeFilled,
  EditFilled,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";

const { Title } = Typography;

/** pass this to Form.Item's getValueFromEvent prop */

const SalaryPage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [khRate, setKhmRate] = useState(4100);
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState([]);
  const [tax, setTax] = useState([]);
  const [taxRate, setTaxRate] = useState("");
  const [emp, setEmp] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setEdit(false);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
  const handleClickView = (Item) => {
    //console.log("Failed:", Item);
    getEmpInfo(Item.empId);
    //console.log(Item.fromDate);
    setIsModalOpen(true)
    setEdit(true);
    form.setFieldsValue({
      emp: Item.empId,
      endDate: dayjs(Item.toDate),
      startDate: dayjs(Item.fromDate),
      salary: Item.salary,
      khmerRate: khRate,
      taxRate: Item.tax * 100 + "%",
    });
  };

  const getEmpInfo = (value) => {
    request(`info/employee/getEmployeeById/${value}`, "get", {}).then((res) => {
      if (res) {
        var data = res.data;
        form.setFieldsValue({
          depId: data.depId,
        });
        // console.log(res.data);
      }
    });
  };

  const onChangeDep = (value) => {
    if (!isEmptyOrNull(value)) {
      getListEmp(value);
    }
  };

  const filterByDep = (value) => {
    if (!isEmptyOrNull(value)) {
      setLoading(true);
      request(
        "payrolls/salary/getSalaryByDepId?depId=" + value,
        "get",
        {}
      ).then((res) => {
        if (res) {
          setData(res.data);
          setLoading(false);
          //console.log(res.data);
        }
      });
    } else {
      getList();
    }
  };

  const onChangeStart = (date, dateString) => {
    console.log("Start: " + dateString);
  };

  const onChangeEnd = (date, dateString) => {
    console.log("End: " + dateString);
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
      "payrolls/salary/deleteSalaryById?id=" + Item.id,
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

  const onChangeSalary = (e) => {
    const salary = e.target.value;

    form.setFieldsValue({
      khmerRate: khRate,
    });
    //console.log("salary: " + salary);
    setSalary(salary); // Update salary state
  };

  const onChangeKhRate = (e) => {
    const rate = e.target.value;
    //console.log("Khmer Rate: " + rate);
    setKhmRate(rate); // Update Khmer rate state
  };

  const getTaxRate = () => {
    setLoading(true);
    var salaryKh = salary * khRate;
    console.log("Calculated salary in Khmer Rate:", salaryKh);
    request(`payrolls/tax/getTaxRateBySalary?salary=${salaryKh}`, "get", {})
      .then((res) => {
        if (res) {
          var data = res.data;
          setTax(data);
          setTaxRate(data.rate * 100 + "%");
          setLoading(false);
          form.setFieldsValue({
            taxRate: data.rate * 100 + "%",
          });
          console.log(data);
          //console.log(data.rate * 100+"%"); // You can handle the response data here
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err); // Handle any errors here
      });
  };

  // Run getTaxRate when either khSalary or khRate changes
  useEffect(() => {
    if (salary && khRate) {
      // Check if both values are available
      getTaxRate();
    }
  }, [salary, khRate]); // Dependency array

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
    // console.log("Success:", values);
    var startDate = dayjs(values.startDate).format("YYYY-MM-DD");
    var endDate = dayjs(values.endDate).format("YYYY-MM-DD");
    var param = {
      empId: values.emp,
      salary: values.salary,
      fromDate: startDate,
      toDate: endDate,
      taxId: tax.id,
    };
    //console.log(param);
    let url = "payrolls/salary/addSalary";
    let method = "post";
    // case update
    if (edit) {
      url = "payrolls/salary/editSalary?id=" + item.id;
      method = "put";
    }
    //console.log(param);
    //setLoading(false)

    request(url, method, param).then((res) => {
      if (res.code === 200) {
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
        setEdit(false);
        onReset();
        setIsModalOpen(false)
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

  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item);
    setEdit(true);
  };

  const onReset = () => {
    form.resetFields();
    setEdit(false);
    setIsModalOpen(false)
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
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
      render: (_, item) => (
        <Space>
          <Button
            type="info"
            icon={<EyeFilled />}
            onClick={() => handleClickView(item)}
          />
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(item)}
          />
          <Popconfirm
            title="Delete the Employee Salary"
            description="Are you sure to delete this Employee Salary?"
            onConfirm={() => onDelete(item)}
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

  const handleDateRangeChange = (value) => {
    const [startDate, endDate] = value.split(" To ");
  };

  return (
    <>
      <PageTitle PageTitle="Salary" />
      <Modal
        title={edit ? "Edit Salary" : "Add Salary"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
        width={600}
      >
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: false,
          }}
          layout={"vertical"}
          onFinish={(item) => {
            form.resetFields();
            onFinish(item);
          }}
          // onFinishFailed={onFinishFailed}
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
                // getValueFromEvent={getValueFromEvent}
                name="emp"
              >
                <Select
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  //mode="multiple"
                  options={emp}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"salary"}
                label="Salary"
                rules={[
                  {
                    required: true,
                    message: "Please Input Salary!",
                  },
                ]}
              >
                <Input onChange={onChangeSalary} placeholder="Salary" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"khmerRate"}
                label="Khmer Rate"
                rules={[
                  {
                    required: true,
                    message: "Please Input Khmer Rate!",
                  },
                ]}
              >
                <Input
                  onChange={onChangeKhRate}
                  value={khRate}
                  placeholder="Khmer Rate"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"taxRate"} label="Tax Rate">
                <Input value={taxRate} placeholder="Tax Rate" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"startDate"}
                label="Start Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeStart}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"endDate"}
                label="End Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <DatePicker onChange={onChangeEnd} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button icon={<SendOutlined />} type="primary" htmlType="submit">
                {!edit ? "Generate" : "Update"}
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add Employee Salary
        </Button>
        {/* <Select
          showSearch
          // style={{
          //   width: "100%",
          // }}
          allowClear
          onChange={filterByDep}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={department}
        /> */}
      </Space>

      <Card style={{ width: "100%", marginTop:10 }}>
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
