import { Space, Table, Button, Form, Input,Modal, Popconfirm } from "antd";
import React, { useState , useEffect } from "react";
import PageTitle from "../../components/Title_Page/TitlePage";
import {
  SaveFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { request } from "../../share/request";
import Swal from "sweetalert2";
const DeductionPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleAdd = () => {
    setEdit(false)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getList = () => {
    setLoading(true);
    request("payrolls/deductions", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      }
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const onReset = () => {
    form.resetFields();
    setEdit(false);
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "deId",
      key:"deId"
    },
    {
      title: "Deduction Name",
      dataIndex: "deduction",
      key: "deduction",
    },
    {
      title: "Deduction information",
      dataIndex: "description",
      key: "description",
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
            title="Delete the deduction"
            description="Are you sure to delete this deduction?"
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
  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item);
    setEdit(true);
  };
  
  const onDelete = (Item) => {
    request("payrolls/deductions/deleteDeductionById?id=" + Item.deId, "delete", {}).then(
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
          getList();
          setLoading(false);
        }
      }
    );
  };
  const onFinish = (Item) =>{
    var param = {
      "deduction": Item.dedName,
      "description": Item.description
    };

    let url = "payrolls/deductions/addDeduction";
    let method = "post";
    // case update
    if (edit) {
      url = "payrolls/deductions/updateDeduction?id=" + item.deId;
      method = "put";
    }
    //console.log(param);
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
        getList();
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
        getList()     
       }
    });
  }
  const handleClickView = (Item) => {
    //console.log("Failed:", Item);
    setIsModalOpen(true);
    form.setFieldsValue({
      dedName: Item.deduction,
      description: Item.description
    });
  };
  return (
    <>
      <PageTitle PageTitle="Deduction List" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
        onClick={handleAdd}
      >
        Add Deduction
      </Button>
      <Modal
        title={edit? "Edit Deduction": "Add Deduction" }
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
            name="dedName"
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

export default DeductionPage;
