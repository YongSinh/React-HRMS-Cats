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

const DeductionPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
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
  const columns = [
    {
      title: "No",
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
      title: "Deduction information",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
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

  return (
    <>
      <PageTitle PageTitle="Deduction List" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
        onClick={showModal}
      >
        Add Deduction
      </Button>
      <Modal
        title="Add Deduction"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" hideRequiredMark>
          <Form.Item
            name="depId"
            label="Deduction ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="depName"
            label="Deduction Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default DeductionPage;
