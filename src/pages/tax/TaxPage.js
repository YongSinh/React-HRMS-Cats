import { Space, Table, Tag, Button, Form, Input } from "antd";
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
import { ImOpt } from "react-icons/im";

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
    dataIndex: "amount",
    key: "aMount",
  },
  {
    title: "Amout",
    dataIndex: "amount",
    key: "aMount",
  },
  {
    title: "Lower Limit",
    dataIndex: "amount",
    key: "aMount",
  },
  {
    title: "Upper Limit",
    dataIndex: "amount",
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
    description: "John Brown",
    amount: "150$",
  },
  {
    key: "description",
    No: 2,
    description: "John Brown",
    amount: "250$",
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