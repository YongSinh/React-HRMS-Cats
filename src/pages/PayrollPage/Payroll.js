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
  Typography,
  Input,
  Card,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import { request } from "../../share/request";
import {
  SendOutlined,
  EyeFilled,
  EditFilled,
  DeleteOutlined,
  SearchOutlined,
  ClearOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import { useParams, Link } from "react-router-dom";
import ModalForm from "./ModelForm";
import Swal from "sweetalert2";
import UserService from "../../UserService/UserService";
const { Search } = Input;
const { RangePicker } = DatePicker;
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

const PayrollPage = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const today = dayjs(now);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salaryCycle, setSalaryCycle] = useState("1");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [emp, setEmp] = useState([]);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState();
  const [empList, setEmpList] = useState([]);
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const format = "YYYY-MM-DD";
  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  const onCloseModal= () => {
    setVisibleModal(false);
  };
  const onChangeStatus = (value) => {
    setStatus(value);
    //console.log(value);
  };
  const onChangeType = (value) => {
    setSalaryCycle(value);
    //console.log(value);
  };
  
  const typeOption = [
    {
      value: "1",
      label: "Monthly",
    },
    {
      value: "2",
      label: "Semi-Monthly",
    },
  ];

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
    //console.log("Failed:", Item);
    getEmpInfo(Item.empId);
    setStatus(Item.status);
    //console.log(Item.fromDate);
    setItem(Item);
    setEdit(true);
    form.setFieldsValue({
      employees: Item.empId,
      endDate: dayjs(Item.toDate),
      startDate: dayjs(Item.fromDate),
      createDate:dayjs(Item.createDate),
      salary: Item.salary,
      selectType: Item.type === 1 ? "Monthly" : "Semi-Monthly",
      status: Item.status === 1 ? "New" : "Computed",
    });
  };

  const onFinish = (values) => {

    var startDate = dayjs(values.startDate).format(format);
    var endDate = dayjs(values.endDate).format(format);
    var today = dayjs(values.createDate).format(format);

    const param = {
      empId: UserService.getUsername(),
      empIds: empList,
      dateFrom: startDate,
      dateTo: endDate,
      type: salaryCycle,
      status: status,
      dateCreate: today,
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
        //onReset();
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
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

  const onSearch = (e) => {
    setEmpId(e.target.value);
    console.log(e.target.value);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      //console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
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

  useEffect(() => {
    getListDep();
    getList();
  }, [empList]);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "RefNo",
      dataIndex: "refNo",
      key: "refNo",
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
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(record)}
          />
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
  const onClickClear = () => {
    setEmpId("");
    getList();
  };

  const onFinish2 = (values) => {
    var date = dayjs(values.date).format(format);
    let url;
    let method;
    url = "payrolls/updateStatusPayroll/"+date ;
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
        setVisibleModal(false)
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

  const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(emp);
  const { productId } = useParams();

  return (
    <>
      <PageTitle PageTitle="Payroll" />
      <ModalForm
        open={visibleModal}
        title={"Update status"}
        onCancel={onCloseModal}
        onFinish={onFinish2}
      />
      {/* <Link to={`/product/1`}>Hello</Link> */}
      <Card style={{ width: "100%" }}>
        <Title level={2}>Generate Payroll</Title>
        <Divider dashed />
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
            <Col span={12}>
              <Form.Item
                name={"selectType"}
                label="Select Cycle"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
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
            <Col span={12}>
              <Form.Item
                name={"status"}
                label="Select Status"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a Salary Cycle"
                  optionFilterProp="label"
                  onChange={onChangeStatus}
                  value={status}
                  allowClear
                  options={statusOption}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name={"startDate"}
                label="From Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"endDate"}
                label="To Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"createDate"}
                label="Create Date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
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
        <Space style={{ marginBottom: 20 }}>
          {/* <Search placeholder="Employees ID" onSearch={onSearch} enterButton /> */}
          <Input placeholder="Employees ID" value={empId} onChange={onSearch} />

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
