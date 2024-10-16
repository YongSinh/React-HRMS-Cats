import { Space, Table, Tag, Button, Form, Input,  Popconfirm, } from "antd";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Swal from "sweetalert2";
import {
  EyeFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  PlusCircleOutlined,
  SaveFilled,
} from "@ant-design/icons";
import { request } from "../../share/request";

const DepartmentPage = () => {
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
  const getListDep = () => {
    setLoading(true);
    request("info/department/department", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
      }
    });
  };
  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item)
    setEdit(true);
  };

  const handleClickView = (Item) => {
    // console.log("Failed:", Item);
    setIsModalOpen(true);
    form.setFieldsValue({
      depName: Item.depName,
      fName: Item.depFullName,
    });
  };

  const onDelete = (Item) => {
    request(`info/department/deleteDepartment/${Item.depId}`, "delete", {}).then(
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
          getListDep();
          setLoading(false);
        }
      }
    );
  };
  const onFinish = (Item) => {
    console.log("Success:", item);
    var param = {
      depName: Item.depName,
      depFullName: Item.fName,
    };

    let url = "info/department/addDepartment";
    let method = "post";
    // case update
    if (edit) {
      url = "info/department/editDepartment/" + item.depId;
      method = "put";
    }

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
        getListDep();
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
        getListDep();
      }
    });
  };

  const onReset = () => {
    form.resetFields();
    setEdit(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getListDep();
  }, []);

  const columns = [
    {
      title: "depId",
      dataIndex: "depId",
      key: "depId",
    },
    {
      title: "Department Name",
      dataIndex: "depName",
      key: "depName",
    },
    {
      title: "Full Name",
      dataIndex: "depFullName",
      key: "depFullName",
    },

    // {
    //   title: "positions",
    //   key: "positions",
    //   dataIndex: "positions",
    //   ellipsis: {
    //     showTitle: true,
    //   },
    //   render: (_, { positions }) => (
    //     <>
    //       {positions.map((positions) => {
    //         let color = "green";
    //         return <Tag color={color}>{positions.posName.toUpperCase()}</Tag>;
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space>
          <Button type="primary" icon={<EyeFilled />}  onClick={() => handleClickView(item)}/>
          <Button type="primary" icon={<EditFilled />} onClick={() => onEdit(item)}/>
          <Popconfirm
            title="Delete the department"
            description="Are you sure to delete this department?"
            onConfirm={() =>onDelete(item)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button 
            type="primary"
            icon={<DeleteOutlined />}
            danger/>
          </Popconfirm>
        
        </Space>
      ),
    },
  ];

  return (
    <>
    <PageTitle PageTitle="Department" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
        onClick={showModal}
      >
        Add Department
      </Button>
      <Modal
        title="Add Department"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
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
            form.resetFields()
            onFinish(item)
        }}
        >
          <Form.Item
            name="depName"
            label="Department Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fName"
            label="Full Name"
            rules={[
              {
                required: true,
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
      <Table
      scroll={{
        x: "max-content",
      }}
      loading={loading} columns={columns} dataSource={data} />
    </>
  );
};
export default DepartmentPage;
