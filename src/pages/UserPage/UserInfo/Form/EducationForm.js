import React from "react";
import { Form, Input, Row, Col, Divider, Typography,Select } from "antd";

const { Title } = Typography;

const HistoryForm = () => {
  return (
    <>
          <Title level={4}>Education</Title>
  <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="educationLevel"
                      label="Education Level"
                      rules={[
                        {
                          required: true,
                          message: "Please select education level!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Education Level">
                        <Select.Option value="highschool">
                          High School
                        </Select.Option>
                        <Select.Option value="bachelor">
                          Bachelor's Degree
                        </Select.Option>
                        <Select.Option value="master">
                          Master's Degree
                        </Select.Option>
                        <Select.Option value="phd">Ph.D.</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="educationInstitution"
                      label="Education Institution"
                      rules={[
                        {
                          required: true,
                          message: "Please input the education institution!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Education Institution" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="endYear"
                      label="End Year"
                      rules={[
                        {
                          required: true,
                          message: "Please input the end year!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter End Year" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="degreeMajor"
                      label="Degree/Major"
                      rules={[
                        {
                          required: true,
                          message: "Please input the degree/major!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Degree/Major" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gpa"
                      label="GPA"
                      rules={[
                        {
                          required: true,
                          message: "Please input the education institution!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter GPA" />
                    </Form.Item>
                  </Col>
                </Row>
      <Divider />
     
    </>
  );
};

export default HistoryForm;
