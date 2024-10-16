import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  DatePicker
} from "antd";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const HistoryForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  const onFinish = (item) => {
    var body = {
      eduLevel: item.level,
      eduInstitution: item.institution,
      yearEnd: dateFormat(item.endYear),
      major: item.major,
      emID: 2431,
      gpa: item.gpa,
    };
    let url = "info/education/addEducation";
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
  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    const storedId = localStorage.getItem("employeeId");
    if (storedId) {
      setSubmittedId(storedId);
    }
  }, []);

  const onCancel = () => {
    form.resetFields();
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
              name="level"
              label="Level"
              rules={[
                {
                  required: true,
                  message: "Please input level!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="institution"
              label="Institution"
              rules={[
                {
                  required: true,
                  message: "Please input the institution!",
                },
              ]}
            >
              <Input placeholder="Enter Institution" />
            </Form.Item>
          </Col>

          <Col span={8}>
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
              <DatePicker style={{width:"100%"}}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="major"
              label="Major"
              rules={[
                {
                  required: true,
                  message: "Please input the major!",
                },
              ]}
            >
              <Input placeholder="Enter Major" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="gpa"
              label="GPA"
            >
              <Input placeholder="Enter GPA" />
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
    </>
  );
};

export default HistoryForm;
