import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  Table,
} from "antd";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const HistoryForm = ({id}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  const [data, setData] = useState([]);

  const onFinish = (item) => {
    let body;
    var url = "info/emergencyContact/add";
    var method = "post";
    if (isEmptyOrNull(submittedId)) {
      Swal.fire({
        title: "Enter your Employee Id",
        input: "text",
        inputLabel: "Employee Id",
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
            fullName: item.fullName,
            relationship: item.relationship,
            address: item.address,
            tel: item.tel,
            officeAddress: item.officeAddress,
            officeTel: item.officeTel,
            empId: id,
          };
          setData((prevData) => [...prevData, body]);
          save(body, url, method);
        }
      });
    } else {
      body = {
        fullName: item.fullName,
        relationship: item.relationship,
        address: item.address,
        tel: item.tel,
        officeAddress: item.officeAddress,
        officeTel: item.officeTel,
        empId: submittedId,
      };
      save(body, url, method);
      setData((prevData) => [...prevData, body]);
    }
  };

  const save = (body, url, method) => {
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

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Office Address",
      dataIndex: "officeAddress",
      key: "officeAddress",
    },
    {
      title: "Office Tel",
      dataIndex: "officeTel",
      key: "officeTel",
    },
  ];

  const onCancel = () => {
    form.resetFields();
  };
  return (
    <>
    <h1>{id}</h1>
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
              name="fullName"
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
              name="address"
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
              name="tel"
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
            <Form.Item name="officeAddress" label="Office Address">
              <Input placeholder="Enter Office Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="officeTel" label="Office Tel">
              <Input placeholder="Enter Office Tel" />
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
      <Divider />
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default HistoryForm;
