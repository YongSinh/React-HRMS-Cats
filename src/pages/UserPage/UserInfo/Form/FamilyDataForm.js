import React from "react";
import { Form, Input, Row, Col, Divider, Typography,Select } from "antd";

const { Title } = Typography;

const HistoryForm = () => {
  return (
    <>
     <Title level={4}>Family Information</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fatherName"
                      label="Father's Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input father's name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Father's Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="fatherOccupation"
                      label="Father's Occupation"
                    >
                      <Input placeholder="Enter Father's Occupation" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fatherAddress"
                      label="Father's Permanent Address"
                    >
                      <Input placeholder="Enter Father's Permanent Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="fatherPhone" label="Father's Phone Number">
                      <Input placeholder="Enter Father's Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="motherName"
                      label="Mother's Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input mother's name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Mother's Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="motherOccupation"
                      label="Mother's Occupation"
                    >
                      <Input placeholder="Enter Mother's Occupation" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="motherAddress"
                      label="Mother's Permanent Address"
                    >
                      <Input placeholder="Enter Mother's Permanent Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="motherPhone" label="Mother's Phone Number">
                      <Input placeholder="Enter Mother's Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="numOfSiblings"
                      label="Number of Siblings"
                      rules={[
                        {
                          required: true,
                          message: "Please input the number of siblings!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Number of Siblings" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="youAreNumber"
                      label="You are the Number"
                      rules={[
                        {
                          required: true,
                          message: "Please input your order among siblings!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Your Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="maritalStatus"
                      label="Marital Status"
                      rules={[
                        {
                          required: true,
                          message: "Please select marital status!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Marital Status">
                        <Select.Option value="single">Single</Select.Option>
                        <Select.Option value="married">Married</Select.Option>
                        <Select.Option value="divorced">Divorced</Select.Option>
                        <Select.Option value="widowed">Widowed</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Title level={4}>Sibling Information</Title>
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item name="siblingFirstName" label="First Name">
                      <Input placeholder="Enter Sibling's First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingLastName" label="Last Name">
                      <Input placeholder="Enter Sibling's Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingGender" label="Gender">
                      <Select placeholder="Select Gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingAge" label="Age">
                      <Input placeholder="Enter Sibling's Age" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item name="siblingEducation" label="Education">
                      <Input placeholder="Enter Sibling's Education" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="siblingOccupation" label="Occupation">
                      <Input placeholder="Enter Sibling's Occupation" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="siblingPosition" label="Position">
                      <Input placeholder="Enter Sibling's Position" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="siblingOffice" label="Office">
                      <Input placeholder="Enter Sibling's Office" />
                    </Form.Item>
                  </Col>
                </Row>
      <Divider />
    
    </>
  );
};

export default HistoryForm;
