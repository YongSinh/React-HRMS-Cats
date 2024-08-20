import { Space, Table,  Button, Form, Input } from "antd";
import React, { useState } from "react";
import PageTitle from "../../components/Title_Page/TitlePage";
import { Modal } from "antd";
import {
  EyeFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "No",
    render: (_, { No }) => {
      return (
        <>
          <div>
            <text style={{ fontSize: 13 }}>{No}</text>
          </div>
        </>
      );
    },
  },
  {
    title: "Tax Able Salary",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Rat",
    dataIndex: "rat",
    key: "aMount",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "aMount",
  },
  {
    title: "Lower Limit",
    dataIndex: "l_amount",
    key: "aMount",
  },
  {
    title: "Upper Limit",
    dataIndex: "u_mount",
    key: "aMount",
  },
  {
    title: "Action",
    key: "action",
    render: (_) => (
      <Space>
        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];
const data = [
  {
    key: "description",
    No: 1,
    description: "400$",
    rat: "5%",
    amount:"4.97$",
    l_amount:"3.5$",
    u_mount:"9.9$",
  },
  {
    key: "description",
    No: 2,
    description: "600$",
    rat: "15%",
    amount:"5.9$",
    l_amount:"3.5$",
    u_mount:"9.9$",
  },
];

const TaxPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle PageTitle="Tax List" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
        onClick={showModal}
      >
        Add Tax
      </Button>
      <Modal
        title="Add Tax"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" hideRequiredMark>
          <Form.Item
            name="Id"
            label="Tax ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="taxAbleSalary"
            label="Tax Able Salary"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rate"
            label="Tax Rate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Tax Amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lowerLimit"
            label="Lower Limit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="upperLimit"
            label="Upper Limit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TaxPage;