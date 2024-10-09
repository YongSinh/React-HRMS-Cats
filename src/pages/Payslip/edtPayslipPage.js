import React, { useState, useCallback, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../components/Title_Page/TitlePage";
import "./paySlip.css";
import { Link, useParams } from "react-router-dom";
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
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import {
  EditOutlined,
  EditFilled,
  PlusCircleOutlined,
  DeleteOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { isEmptyOrNull } from "../../share/helper";
import { request } from "../../share/request";
import AllowncesModel from "./AllowncesModel";
import DeductionModel from "./DeductionModel";
const { Title } = Typography;



const EidtPayslipPage = () => {
  const now = Date.now();
  const today = dayjs(now);
  const dateFormat = "YYYY";
  const [empList, setEmpList] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [deduction, setDeduction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empAllowances, setEmpAllowances] = useState([]);
  const [empDeduction, setEmpDeduction] = useState([]);
  const [data, setData] = useState([]);
  const [allValue, setAllValue] = useState("");
  const [dedValue, setDedValue] = useState("");
  const [allItem, setAllItem] = useState("");
  const [dedItem, setdedItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [type, setType] = useState("");
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  const handleAllowances = (value) => {
    console.log(value)
    setAllValue(value)
  };

  const handleDeduction = (value) => {
    console.log(value)
    setDedValue(value)
  };

   const handleType = (value) => {
    console.log(value)
    setType(value)
  };
  
  const handleEditAllowances = (value) => {
    handleType(value.type)
    handleAllowances(value.allowances)
    setAllItem(value)
    setIsModalOpen(true);
    setEdit(true);
  };

  const handleEditDeduction = (value) => {
    handleType(value.type)
    handleDeduction(value.deductions)
    setdedItem(value)
    setIsModalOpen2(true);
    setEdit(true);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
    setEdit(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen2 = () => {
    setIsModalOpen2(true);
    setEdit(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
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
        setDeduction(arrTmpP);
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

  const getListEmpAllowances = () => {
    setLoading(true);
    request("payrolls/empAllowances/ByPaySlipId?id=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setLoading(false);
          setEmpAllowances(res.data);
        }
      }
    );
  };

  const getListEmpDeduction = () => {
    setLoading(true);
    request("payrolls/empDeduction/ByPaySlip?id=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setLoading(false);
          setEmpDeduction(res.data);
        }
      }
    );
  };

  const getList = () => {
    setLoading(true);
    request("payrolls/payslips/getPayrollById?id=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setData([res.data]);
          setLoading(false);
          //console.log(res.data);
        }
      }
    );
  };

  useEffect(() => {
    getList();
    getListAllowances();
    getListDeductions();
    getListEmpAllowances();
    getListEmpDeduction();
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
  ];

  const columns2 = [
    {
      fixed: "left",
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Allowances",
      dataIndex: "allowances",
      key: "allowances",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleEditAllowances(record)}
            type="primary"
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Delete the Type"
            description="Are you sure to delete this type?"
            onConfirm={() => onDelete(record)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const columns3 = [
    {
      fixed: "left",
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Deductions",
      dataIndex: "deductions",
      key: "deductions",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleEditDeduction(record)}
            type="primary"
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Delete the Type"
            description="Are you sure to delete this type?"
            // onConfirm={() => onDelete(record)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const typeOption = [
    {
      value: 1,
      label: "Monthly",
    },
    {
      value: 2,
      label: "Semi-Monthly",
    },
    {
      value: 3,
      label: "once",
    },
  ];
  const onDelete = (Item) => {
    request(
      "payrolls/empAllowances/delete?id=" + Item.empAllId,
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
        getListEmpAllowances()
        getListEmpDeduction()
      }
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    const result = allowances.find(item => item.label === allValue || item.value === allValue) ;
    const resultType = typeOption.find(item => item.label === type || item.value === type) ;
    var eDate = isEmptyOrNull(values.effectiveDate) ? "": values.effectiveDate;
    console.log(type)
    var param = {
      "allowances": result.value,
      "type": resultType.value,
      "amount": values.amount,
      "effectiveDate": eDate,
      "dateCreated": today,
      "paySlipId": id
    }
    setIsModalOpen(false)
    let url = "payrolls/empAllowances/add";
    let method = "post";
    if(edit){
      url = "payrolls/empAllowances/update?id="+allItem.empAllId
      method="put"
    }
    // case update
    setLoading(true);
    // empAllId
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
        getListEmpAllowances()
        getListEmpDeduction()
        //onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getList();
        getListEmpAllowances()
        getListEmpDeduction()
      }
    });
    
  };


  const onFinishDed = (values) => {
    console.log("Success:", values);
    const result = deduction.find(item => item.label === dedValue || item.value === dedValue) ;
    const resultType = typeOption.find(item => item.label === type || item.value === type) ;
    var eDate = isEmptyOrNull(values.effectiveDate) ? "": values.effectiveDate;
    console.log(type)
    var param = {
      "deductions": result.value,
      "type": resultType.value,
      "amount": values.amount,
      "effectiveDate": eDate,
      "dateCreated": today,
      "paySlipId": id
    }
    console.log(param)
    setIsModalOpen2(false)
    let url = "payrolls/empDeduction/addDeduction";
    let method = "post";
    if(edit){
      url = "payrolls/empDeduction/updateDeduction?id="+dedItem.empDedId
      method="put"
    }
    // case update
    setLoading(true);
    // empAllId
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
        getListEmpAllowances()
        getListEmpDeduction()
        //onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getList();
        getListEmpAllowances()
        getListEmpDeduction()
      }
    });
    
  };


  return (
    <>
      {/* <PageTitle PageTitle="Payslip" /> */}
      <AllowncesModel
        open={isModalOpen}
        handleClose={handleCancel}
        item={allItem}
        edit={edit}
        allownces={allowances}
        typeOption={typeOption}
        handleAllowances={handleAllowances}
        onFinish={onFinish}
        allValue={allValue}
        type = {type}
        handleType={handleType}
      />
      <DeductionModel
        open={isModalOpen2}
        item={dedItem}
        handleClose={handleCancel2}
        deduction ={deduction}
        typeOption={typeOption}
        type={type}
        handleType={handleType}
        handleDeduction={handleDeduction}
        onFinish={onFinishDed}
        detValue={dedValue}
        edit={edit}
      />
      <Divider dashed />
      <Card style={{ width: "100%" }}>
        <Table
          scroll={{
            x: "max-content",
          }}
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
      <Divider dashed />
      <Row gutter={16}>
        <Col span={12}>
          <Title level={3}>Allowances</Title>
          {/* <Divider dashed /> */}
          <Card style={{ width: "100%", position: "relative" }}>
            <Button
              style={{
                position: "absolute",
                top: "10px",
                right: "11px",
                zIndex: "5",
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
              shape="circle"
              onClick={handleOpen}
            />

            <Table
              scroll={{
                x: "max-content",
              }}
              columns={columns2}
              loading={loading}
              //pagination={false}
              dataSource={empAllowances}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Title level={3}>Deductions</Title>
          {/* <Divider dashed /> */}
          <Card style={{ width: "100%", position: "relative" }}>
            <Button
              style={{
                position: "absolute",
                top: "10px",
                right: "11px",
                zIndex: "5",
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
              shape="circle"
              onClick={handleOpen2}
            />

            <Table
              scroll={{
                x: "max-content",
              }}
              columns={columns3}
              loading={loading}
              //pagination={false}
              dataSource={empDeduction}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EidtPayslipPage;
