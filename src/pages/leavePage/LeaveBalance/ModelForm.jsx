import React, { useState} from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Select,
  Col,
  Row,
  Divider,
  DatePicker,
  Input,
} from "antd";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";
import { isEmptyOrNull } from "../../../share/helper";
import { request } from "../../../share/request";

export default function ModelForm({
  open = false,
  handleClose,
  onFinish,
  title,
  handleOk,
  department,
  items,
  view,
  status,
  disabled = false,
}) {
  const [form] = Form.useForm();
  const [emp, setEmp] = useState([]);

  
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


  const onFinish2 = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log("Dep:", value);
    getListEmp(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
      >
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          form={form}
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
                  allowClear
                  options={department}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                 rules={[
                    {
                      required: true,
                      message: "Please select Employees!",
                    },
                  ]}
                label="Employees"
                name="employee"
              >
                <Select
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  //onChange={getListEmp}
                  mode="multiple"
                  options={emp}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Leave Type"
                name={"type"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Type!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Leave Type"
                  allowClear
                  mode="multiple"
                  options={""}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date"
                name={"date"}
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  style={{width:"100%"}}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={onOk}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button icon={<SendOutlined />} type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
