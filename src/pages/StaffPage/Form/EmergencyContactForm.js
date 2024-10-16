import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const HistoryForm = ({ onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  const onFinish = (item) => {
    console.log(item);
  };
  return (
    <>
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
          <Divider> Residence in Google Map</Divider>
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
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default HistoryForm;
