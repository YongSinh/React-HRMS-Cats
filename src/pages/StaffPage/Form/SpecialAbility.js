import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Table,
  Button,
  Space,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";

const HistoryForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    const storedId = localStorage.getItem("employeeId");
    if (storedId) {
      setSubmittedId(storedId);
    }
  }, []);

  const save = (body) => {
    let url = "info/specialAbility/add";
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

  const onFinish = (item) => {
    let body;
    if (isEmptyOrNull(submittedId)) {
      Swal.fire({
        title: "Enter your IP address",
        input: "text",
        inputLabel: "Your IP address",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to input employee id!";
          }
        },
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const id = result.value;
          setSubmittedId(id);
          body = {
            foreignLanguages: item.foreignLanguage,
            speaking: item.speaking,
            listening: item.listening,
            writing: item.writing,
            reading: item.reading,
            empId: id,
          };
          setData((prevData) => [...prevData, body]);
          save(body);
        }
      });
    } else {
      body = {
        foreignLanguages: item.foreignLanguage,
        speaking: item.speaking,
        listening: item.listening,
        writing: item.writing,
        reading: item.reading,
        empId: submittedId,
      };
      save(body);
      setData((prevData) => [...prevData, body]);
    }
  };

  const columns = [
    {
      title: "Foreign Languages",
      dataIndex: "foreignLanguages",
      key: "foreignLanguages",
    },
    {
      title: "Speaking",
      dataIndex: "speaking",
      key: "speaking",
    },
    {
      title: "Listening",
      dataIndex: "listening",
      key: "listening",
    },
    {
      title: "Writing",
      dataIndex: "writing",
      key: "writing",
    },
    {
      title: "Reading",
      dataIndex: "reading",
      key: "reading",
    },
  ];
  
  const onCancel = () => {
    form.resetFields();
    setData([]);
  };

  const option = [
    {
      value: "Basic",
      label: "Basic",
    },
    {
      value: "Beginner",
      label: "Beginner",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
    },
    {
      value: "Advanced",
      label: "Advanced",
    },
    {
      value: "Fluent",
      label: "Fluent",
    },
  ];
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
              <Select
                showSearch
                placeholder="Select a Level"
                optionFilterProp="label"
                options={option}
              />
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
              <Select
                showSearch
                placeholder="Select a Level"
                optionFilterProp="label"
                options={option}
              />
            </Form.Item>
          </Col>

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
              <Select
                showSearch
                placeholder="Select a Level"
                optionFilterProp="label"
                options={option}
              />
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
              <Select
                showSearch
                placeholder="Select a Level"
                optionFilterProp="label"
                options={option}
              />
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
      <Divider />
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default HistoryForm;
