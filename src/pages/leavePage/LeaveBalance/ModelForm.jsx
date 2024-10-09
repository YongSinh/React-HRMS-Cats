import React, { useState } from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Select,
  Col,
  Row,
  DatePicker,
} from "antd";
import { SaveFilled } from "@ant-design/icons";
import { request } from "../../../share/request";

export default function ModelForm({
  open = false,
  handleClose,
  onFinish,
  handleOk,
  department,
  leaveType,
}) {
  const [form] = Form.useForm();
  const [emp, setEmp] = useState([]);

  const handleCancel = () => {
    form.resetFields(); // clear data in form
    handleClose();
  };

  const onChange = (value) => {
    request(`info/employee/listEmployeeByDep?depId=${value}`, "get", {}).then(
      (res) => {
        if (res) {
          //console.log(res.data);
          const arrTmpP = res.data.map((emp) => ({
            label: emp.empId.toString(),
            value: emp.empId,
          }));
          setEmp(arrTmpP);
        }
      }
    );
  };

  const sharedProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    emp,
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };

  const typeProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    leaveType,
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };


  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  return (
    <>
      <Modal
        title="Add Leave Balance"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        footer={false}
        maskClosable={false}
      >
        <Form
          form={form}
          name="form_category"
          layout="vertical"
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
          initialValues={{
            status: 1,
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
                  {...sharedProps}
                  //onChange={getListEmp}
                  // mode="multiple"
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
                  {...typeProps}
                  placeholder="Select a Leave Type"
                  allowClear
                  mode="multiple"
                  options={leaveType}
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
                  style={{ width: "100%" }}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={onOk}
                />
              </Form.Item>
            </Col>
          </Row>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button type="primary" onClick={handleCancel} danger >Cancel</Button>
                <Button type="primary" htmlType="submit">
                  <SaveFilled />
                  submit
                </Button>
              </Space>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
