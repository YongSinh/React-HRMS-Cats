import React from "react";
import { Form, Input, Row, Col, Divider, Typography, Button, Space,DatePicker } from "antd";

const { Title } = Typography;

const HistoryForm = ({ onSave, onCancel }) => {
  return (
    <>
      <Title level={4}> History Imformation</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="historyFullName"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input the full name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Full Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyDepartment"
                      label="Department"
                      rules={[
                        {
                          required: true,
                          message: "Please input the department!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Department" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="historySection" label="Section">
                      <Input placeholder="Enter Section" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyPosition"
                      label="Position"
                      rules={[
                        {
                          required: true,
                          message: "Please input the position!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Position" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="historyPhone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input the phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyEmail"
                      label="Email"
                      rules={[
                        { required: true, message: "Please input the email!" },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="startWork"
                      label="Start Work"
                      rules={[
                        {
                          required: true,
                          message: "Please select the start date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select Start Date"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endWork" label="End Work">
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select End Date"
                      />
                    </Form.Item>
                  </Col>
                </Row>
      <Divider />
      <Space>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Space>
    </>
  );
};

export default HistoryForm;
