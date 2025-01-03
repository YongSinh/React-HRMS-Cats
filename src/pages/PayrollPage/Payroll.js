import React, { useState, useCallback, useMemo, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
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
  Input,
  Card,
  Popconfirm,
  Modal,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { request } from "../../share/request";
import {
  SendOutlined,
  EyeFilled,
  DeleteOutlined,
  SearchOutlined,
  ClearOutlined,
  FileDoneOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import ModalForm from "./ModelForm";
import Swal from "sweetalert2";
import getColumnSearchProps from "../../share/ColumnSearchProps";
const { Search } = Input;
const { RangePicker } = DatePicker;

const PayrollPage = () => {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState();
  const [empList, setEmpList] = useState([]);
  const [empId, setEmpId] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const format = "YYYY-MM-DD";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allowances, setAllowances] = useState([]);
  const [allowance, setAllowance] = useState("");
  const [allDataSource, setAllDataSource] = useState([]);
  const [allowanceAmount, setAllowanceAmount] = useState("");

  const [deductions, setDeductions] = useState([]);
  const [deduction, setDeduction] = useState("");
  const [dedDataSource, setDedDataSource] = useState([]);
  const [deductionAmount, setDeductionAmount] = useState("");

  const handleAddDeductions = () => {
    const data = {
      deductionsId: deduction,
      type: 1,
      amount: deductionAmount,
      emId: empList,
    };
    setDedDataSource((prevData) => [data, ...prevData]); // Add `data` as an element of the array
  };
  const handleRemoveDeductions = (deductionsIdToRemove) => {
    setDedDataSource((prevData) =>
      prevData.filter((item) => item.deductionsId !== deductionsIdToRemove)
    );
  };
  //setData((prevData) => [...prevData, ...res.data.data]);
  const handleDeductions = (value) => {
    setDeduction(value);
  };
  const handleDedAmount = (value) => {
    setDeductionAmount(value);
  };

  const handleAddAllowances = () => {
    const data = {
      allowanceId: allowance,
      type: 1,
      amount: allowanceAmount,
      emId: empList,
    };
    setAllDataSource((prevData) => [data, ...prevData]); // Add `data` as an element of the array
  };
  const handleRemoveAllowances = (allowanceIdToRemove) => {
    setAllDataSource((prevData) =>
      prevData.filter((item) => item.allowanceId !== allowanceIdToRemove)
    );
  };
  //setData((prevData) => [...prevData, ...res.data.data]);
  const handleAllowances = (value) => {
    setAllowance(value);
  };
  const handleAllAmount = (value) => {
    setAllowanceAmount(value);
  };
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
  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  // const typeOption = [
  //   {
  //     value: "1",
  //     label: "Monthly",
  //   },
  //   {
  //     value: "2",
  //     label: "Semi-Monthly",
  //   },
  // ];

  const statusOption = [
    {
      value: "1",
      label: "New",
    },
    {
      value: "2",
      label: "Completed",
    },
  ];
  const onDelete = (Item) => {
    setLoading(true);
    request("payrolls/deletePayroll?id=" + Item.id, "delete", {}).then(
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

  const getEmpInfo = (value) => {
    request(`info/employee/getEmployeeById/${value}`, "get", {}).then((res) => {
      if (res) {
        var data = res.data;
        form.setFieldsValue({
          department: data.depId,
        });
        // console.log(res.data);
      }
    });
  };

  const handleClickView = (Item) => {
    getEmpInfo(Item.empId);
    setIsModalOpen(true);
    setItem(Item);
    setEdit(true);
    form.setFieldsValue({
      employees: Item.empId,
      salary: Item.salary,
      selectType: Item.type === 1 ? "Monthly" : "Semi-Monthly",
      status: Item.status === 1 ? "New" : "Computed",
    });
  };

  const onFinish = (values) => {
    const param = {
      empIds: empList,
      status: 1,
    };
    //onsole.log(param);

    let url = "payrolls/addPayroll";
    let method = "post";
    // case update
    if (edit) {
      url = "payrolls/updatePayroll?id=" + item.id;
      method = "put";
    }
    // setLoading(true);

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
        setIsModalOpen(false);
        onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getList();
        setEdit(false);
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
  const onChange = (value) => {
    //setSalaryCycle(value);
    setEmpList(value);
    console.log(`selected ${value}`);
  };

  const onChangeDep = (value) => {
    getListEmp(value);
  };

  const onReset = () => {
    form.resetFields();
    setEdit(false);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    } 
  };
  const getPayrollByEmId = (value) => {
    setLoading(true);
    request("payrolls/payrollByEmId?emId=" + value, "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  const getPayrollByCreateDate = () => {
    setLoading(true);
    request(
      `payrolls/payrollByDateBetween?fromDate=${startDate}&toDate=${endDate}`,
      "get",
      {}
    ).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };
  const getPayrollByEmpIdAndDate = () => {
    setLoading(true);
    request(
      `payrolls/payrollByEmIdAndDateBetween?fromDate=${startDate}&toDate=${endDate}&emId=${empId}`,
      "get",
      {}
    ).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  const onClickSearch = () => {
    if (!isEmptyOrNull(empId) && !isEmptyOrNull(startDate)) {
      getPayrollByEmpIdAndDate();
    } else if (!isEmptyOrNull(empId)) {
      getPayrollByEmId(empId);
    } else {
      getPayrollByCreateDate();
    }
  };

  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item);
    setEdit(true);
  };
  const getListDeductions = () => {
    setLoading(true);
    request("payrolls/deductions", "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        const arrTmpP = res.data.map((items) => ({
          label: items.deduction,
          value: items.deId,
        }));
        setDeductions(arrTmpP);
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
      ...getColumnSearchProps("empId"),
    },
    {
      title: "RefNo",
      dataIndex: "refNo",
      key: "refNo",
      ...getColumnSearchProps("refNo"),
    },
    {
      title: "Date Form",
      dataIndex: "dateFrom",
      key: "dateFrom",
    },
    {
      title: "Date To",
      dataIndex: "dateTo",
      key: "dateTo",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => `${type === 1 ? "Monthly" : "Semi-Monthly"}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => `${status === 1 ? "New" : "Completed"}`,
    },
    {
      title: "Create Date",
      key: "dateCreate",
      dataIndex: "dateCreate",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="info"
            icon={<EyeFilled />}
            onClick={() => handleClickView(record)}
          />
          {/* <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(record)}
          /> */}
          <Popconfirm
            title="Delete the Employee Salary"
            description="Are you sure to delete this Employee Salary?"
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

  const getList = () => {
    setLoading(true);
    request("payrolls/payroll", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
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

  const getListAllowances = () => {
    setLoading(true);
    request("payrolls/allowances", "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        const arrTmpP = res.data.map((items) => ({
          label: items.allowances,
          value: items.allid,
        }));
        //console.log(arrTmpP)
        setAllowances(arrTmpP);
      }
    });
  };

  const onClickClear = () => {
    setEmpId("");
    getList();
  };

  const onFinish2 = (values) => {
    var date = dayjs(values.date).format(format);
    let url;
    let method;
    url = "payrolls/updateStatusPayroll/" + date;
    method = "put";
    //console.log(date)
    setLoading(true);

    request(url, method, {}).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been updated Status",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getList();
        setLoading(false);
        setVisibleModal(false);
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
  const DeductionColumns = [
    {
      title: "Deductions",
      dataIndex: "deductionsId",
      key: "deductionsId",
      render: (_, record) => {
        const result = deductions.find(
          (item) =>
            item.label === record.deductionsId ||
            item.value === record.deductionsId
        );
        return result.label;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleRemoveDeductions(record.deductionsId)}
          icon={<DeleteOutlined />}
          danger
          size={"small"}
        />
      ),
    },
  ];

  const AllownaceColumns = [
    {
      title: "Allownces",
      dataIndex: "allownces",
      key: "allownces",
      render: (_, record) => {
        const result = allowances.find(
          (item) =>
            item.label === record.allowanceId ||
            item.value === record.allowanceId
        );
        return result.label;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleRemoveAllowances(record.allowanceId)}
          icon={<DeleteOutlined />}
          danger
          size={"small"}
        />
      ),
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Payroll" />
      <ModalForm
        open={visibleModal}
        title={"Update status"}
        onCancel={onCloseModal}
        onFinish={onFinish2}
      />
      <Modal
        title={edit ? "Edit Payroll" : "Add Payroll"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
        width={700}
      >
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: false,
          }}
          layout={"vertical"}
          onFinish={(item) => {
            // form.resetFields();
            onFinish(item);
          }}
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
                  onChange={onChangeDep}
                  //onSearch={onSearch}
                  allowClear
                  options={department}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employees"
                //getValueFromEvent={getValueFromEvent}
                name="employees"
                rules={[
                  {
                    required: true,
                    message: "Please Select Employees!",
                  },
                ]}
              >
                <Select
                  onChange={onChange}
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  mode="multiple"
                  options={emp}
                />
              </Form.Item>
            </Col>
            <Divider>Allownace Part</Divider>
            <Col span={12}>
              <Form.Item label="Allownces">
                <Select
                  showSearch
                  placeholder="Select a allownces"
                  allowClear
                  optionFilterProp="label"
                  onChange={handleAllowances}
                  options={allowances}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Amount">
                <InputNumber
                  onChange={handleAllAmount}
                  style={{ width: "100%" }}
                  addonAfter="$"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddAllowances}
                  type="primary"
                >
                  Add
                </Button>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Table
                size={"small"}
                dataSource={allDataSource}
                columns={AllownaceColumns}
                pagination={{ pageSize: 3 }}
              />
            </Col>
            <Divider>Deduction Part</Divider>

            <Col span={12}>
              <Form.Item label="Deduction">
                <Select
                  showSearch
                  placeholder="Select a deduction"
                  allowClear
                  optionFilterProp="label"
                  //mode="multiple"
                  // value={allValue}
                  onChange={handleDeductions}
                  options={deductions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Amount">
                <InputNumber
                  onChange={handleDedAmount}
                  style={{ width: "100%" }}
                  addonAfter="$"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddDeductions}
                  type="primary"
                >
                  Add
                </Button>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Table
                size={"small"}
                dataSource={dedDataSource}
                columns={DeductionColumns}
                pagination={{ pageSize: 3 }}
              />
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
      <Card style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Space style={{ marginBottom: 20 }}>
              {/* <Search placeholder="Employees ID" onSearch={onSearch} enterButton /> */}
              {/* <Input placeholder="Employees ID" value={empId} onChange={onSearch} /> */}

              <RangePicker onChange={onRangeChange} />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={onClickSearch}
              >
                Search
              </Button>
              <Button
                type="primary"
                icon={<ClearOutlined />}
                onClick={onClickClear}
                danger
              >
                Clear
              </Button>
              <Button
                type="primary"
                icon={<FileDoneOutlined />}
                onClick={handleOpenModal}
              >
                update Status
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Create Payroll
            </Button>
          </Col>
        </Row>
        <Table
          scroll={{
            x: "max-content",
          }}
          loading={loading}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default PayrollPage;
