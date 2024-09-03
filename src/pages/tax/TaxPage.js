import { Space, Table, Button, Form, Input, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import PageTitle from "../../components/Title_Page/TitlePage";
import { Modal } from "antd";
import {
  EyeFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SaveFilled,
} from "@ant-design/icons";
import { request } from "../../share/request";
import Swal from "sweetalert2";

const TaxPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item);
    setEdit(true);
  };
  const onDelete = (Item) => {
    request("payrolls/tax/deleteTax/" + Item.id, "delete", {}).then(
      (res) => {
        if (res) {
          Swal.fire({
            title: "Success!",
            text: "Your has been deleted",
            icon: "success",
            showConfirmButton: true,
            //timer: 1500,
            // confirmButtonText: "Confirm",
          });
          getListTax();
          setLoading(false);
        }
      }
    );
  };
  const handleClickView = (Item) => {
    //console.log("Failed:", Item);
    setIsModalOpen(true);
    form.setFieldsValue({
      taxableSalary: Item.taxableSalary,
      rate: Item.rate,
      amount: Item.amount,
      lowerLimit: Item.lowerLimit,
      upperLimit:Item.upperLimit
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tax Able Salary",
      dataIndex: "taxableSalary",
      key: "taxableSalary",
    },
    {
      title: "Rat",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Amout",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Lower Limit",
      dataIndex: "lowerLimit",
      key: "lowerLimit",
    },
    {
      title: "Upper Limit",
      dataIndex: "upperLimit",
      key: "upperLimit",
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => handleClickView(item)}
          />
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(item)}
          />
          <Popconfirm
            title="Delete the department"
            description="Are you sure to delete this department?"
            onConfirm={() => onDelete(item)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const getListTax = () => {
    setLoading(true);
    request("payrolls/tax/listTax", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      }
    });
  };

  const onFinish = (Item) => {
    
    var param = {
      taxableSalary: Item.taxableSalary,
      rate: Item.rate,
      amount: Item.amount,
      lowerLimit: Item.lowerLimit,
      upperLimit:Item.upperLimit
    };

    let url = "payrolls/tax/addTax";
    let method = "post";
    // case update
    if (edit) {
      url = "payrolls/tax/editTax/" + item.id;
      method = "put";
    }
    console.log(param);
    //setLoading(false)

    request(url, method, param).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getListTax();
        setLoading(false);
        setEdit(false);
        onReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getListTax()     
       }
    });
  };

  const onReset = () => {
    form.resetFields();
    setEdit(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getListTax();
  }, []);
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
        title={edit? "Edit Tax": "Add Tax" }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            remember: false,
          }}
          onFinish={(item) => {
            form.resetFields();
            onFinish(item);
          }}
        >
          <Form.Item
            name="taxableSalary"
            label="Tax Able Salary"
            rules={[
              {
                required: true,
                message: "Please Tax Able Salary!",
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
                message: "Please Tax Rate!",
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
                message: "Please Tax Amount!",
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
                message: "Please Lower Limit!",
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
                message: "Please Upper Limit!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space style={{ textAlign: "right" }}>
              <Button icon={<SaveFilled />} type="primary" htmlType="submit">
                submit
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  );
};

export default TaxPage;
