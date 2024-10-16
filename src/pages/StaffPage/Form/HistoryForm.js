import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Spin,
  Typography,
  Button,
  Space,
  DatePicker,
} from "antd";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const HistoryForm = ({ activeKey }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [empId, setEmpId] = useState("");
  const [submittedId, setSubmittedId] = useState(null);
  useEffect(() => {
    const storedId = localStorage.getItem("employeeId");
    if (activeKey === "2") {
      if (storedId) {
        setEmpId(storedId);
        getEmpInfo(storedId);
      }
      //getListDep(); // Only fetch data when this tab is active
    }
       // Retrieve employee ID from local storage when the component mounts


  }, [activeKey]);


  useEffect(() => {
 
  }, []);


  const text =()=>{
      Swal.fire({
        title: "Enter your IP address",
        input: "text",
        inputLabel: "Your IP address",
        inputValue: '',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to input employee id!";
          }
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const ipAddress = result.value;
          Swal.fire(`Your IP address is ${ipAddress}`);
        }
      });
  }

  const onFinish = (item) => {
    const body = {
      startDate: dateFormat(item.startDate),
      endDate: dateFormat(item.endDate),
      jobTitle: item.jobTitle,
      department: item.dep,
      empId: 2431,
    };
    let url = "info/jobHistory/addJobHistory";
    let method = "post";
    request(url, method, body).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
      }
    });
  };

  const getEmpInfo = (value) => {
    setLoading(true);
    request("info/employee/getEmployeeById/"+value, "get", {}).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        form.setFieldsValue({
          empId: result.empId,
          dep: result.depId,
          jobTitle: result.posId,
          name:result.firstName +" "+ result.lastName
        });
      }
    });
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <>
      <Button onClick={text}>Hello</Button>
      <Spin spinning={loading} tip="Loading" size="middle">
        <Title level={4}> History Imformation</Title>
        <Form
          name="basic"
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="empId"
                label="Employee ID"
                rules={[
                  {
                    required: true,
                    message: "Please input the Employee ID",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Employee Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dep"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please input the department!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="jobTitle"
                label="Job Title"
                rules={[
                  {
                    required: true,
                    message: "Please input the Job Title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  {
                    required: true,
                    message: "Please select Start Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Start Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[
                  {
                    required: true,
                    message: "Please select End Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select End Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button danger onClick={onCancel}>
                Clean
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default HistoryForm;
