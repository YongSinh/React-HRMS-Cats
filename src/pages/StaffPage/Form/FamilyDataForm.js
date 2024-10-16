import React, { useState, useEffect } from "react";
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
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const HistoryForm = ({ onSave }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    const storedId = localStorage.getItem("employeeId");
    if (storedId) {
      setSubmittedId(storedId);
    }
  }, []);

  const onFinish = (item) => {
    var body = {
      fatherName: item.fatherName,
      fatherAddress: item.fatherAddress,
      fatherOccupation: item.fatherOccupation,
      fatherPhoneNum: item.fatherPhone,
      motherName: item.motherName,
      motherAddress: item.motherAddress,
      motherOccupation: item.motherOccupation,
      motherPhoneNum: item.motherPhone,
      emId: 2431,
    };
    let url = "info/familyData/addFamilyData";
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

  const onFinish2 = (item) => {
    var body = {
      empId: 2431,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      sex: item.gender,
      education: item.education,
      occupation: item.occupation,
      position: item.position,
      office: item.office,
      maritalStats: item.maritalStats,
    };
    let url = "info/siblingData/addSiblingData";
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

  const onCancel = () => {
    form.resetFields();
  };

  const onCancel2 = () => {
    form2.resetFields();
  };
  return (
    <>
      <Title level={4}>Family Information</Title>
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
            <Form.Item name="fatherName" label="Father's Name">
              <Input placeholder="Enter Father's Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fatherOccupation" label="Father's Occupation">
              <Input placeholder="Enter Father's Occupation" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="fatherAddress" label="Father's Permanent Address">
              <Input placeholder="Enter Father's Permanent Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fatherPhone" label="Father's Phone Number">
              <Input placeholder="Enter Father's Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="motherName" label="Mother's Name">
              <Input placeholder="Enter Mother's Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="motherOccupation" label="Mother's Occupation">
              <Input placeholder="Enter Mother's Occupation" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="motherAddress" label="Mother's Permanent Address">
              <Input placeholder="Enter Mother's Permanent Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="motherPhone" label="Mother's Phone Number">
              <Input placeholder="Enter Mother's Phone Number" />
            </Form.Item>
          </Col>
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
        </Row>
      </Form>
      <Divider>Sibling Information</Divider>
      <Form
        name="basic"
        form={form2}
        layout={"vertical"}
        onFinish={(item) => {
          //form.resetFields();
          onFinish2(item);
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="Enter Sibling's First Name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Enter Sibling's Last Name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="gender" label="Gender">
              <Select placeholder="Select Gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="age" label="Age">
              <Input placeholder="Enter Sibling's Age" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="education" label="Education">
              <Input placeholder="Enter Sibling's Education" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="occupation" label="Occupation">
              <Input placeholder="Enter Sibling's Occupation" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="position" label="Position">
              <Input placeholder="Enter Sibling's Position" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="office" label="Office">
              <Input placeholder="Enter Sibling's Office" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Marital Stats"
              name="maritalStat"
              rules={[
                {
                  required: true,
                  message: "Please input the marital stats!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Marital Stats"
                optionFilterProp="label"
                options={[
                  {
                    value: "Single",
                    label: "Single",
                  },
                  {
                    value: "Married",
                    label: "Married",
                  },
                  {
                    value: "Separated",
                    label: "Separated",
                  },
                  {
                    value: "Divorced",
                    label: "Divorced",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button danger onClick={onCancel2}>
              Clean
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default HistoryForm;
