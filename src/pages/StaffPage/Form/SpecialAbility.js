import React from "react";
import { Form, Input, Row, Col, Divider, Typography, Button, Space,Select } from "antd";

const { Title } = Typography;

const HistoryForm = ({ onSave, onCancel }) => {
  return (
    <>
  <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="foreignLanguage"
                      label="Foreign Language"
                      rules={[
                        {
                          required: true,
                          message: "Please input a foreign language!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Foreign Language" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="reading"
                      label="Reading"
                      rules={[
                        {
                          required: true,
                          message: "Please select reading proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Reading Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="speaking"
                      label="Speaking"
                      rules={[
                        {
                          required: true,
                          message: "Please select speaking proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Speaking Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="listening"
                      label="Listening"
                      rules={[
                        {
                          required: true,
                          message: "Please select listening proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Listening Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="writing"
                      label="Writing"
                      rules={[
                        {
                          required: true,
                          message: "Please select writing proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Writing Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
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
