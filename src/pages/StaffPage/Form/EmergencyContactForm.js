import React from "react";
import { Form, Input, Row, Col, Divider, Typography, Button, Space,Select } from "antd";

const { Title } = Typography;

const HistoryForm = ({ onSave, onCancel }) => {
  return (
    <>
     <Title level={4}>Emergency Contactn</Title>
    <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyFullName"
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
                      name="relationship"
                      label="Relationship"
                      rules={[
                        {
                          required: true,
                          message: "Please input the relationship!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Relationship" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyAddress"
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input the address!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyTel"
                      label="Tel"
                      rules={[
                        {
                          required: true,
                          message: "Please input the telephone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Tel" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="officeAddress"
                      label="Office Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input the office address!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Office Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="officeTel"
                      label="Office Tel"
                      rules={[
                        {
                          required: true,
                          message: "Please input the office telephone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Office Tel" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Title level={4}>Residence in Google Map</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="latitude"
                      label="Latitude"
                      rules={[
                        {
                          required: true,
                          message: "Please input the latitude!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Latitude" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="longitude"
                      label="Longitude"
                      rules={[
                        {
                          required: true,
                          message: "Please input the longitude!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Longitude" />
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
