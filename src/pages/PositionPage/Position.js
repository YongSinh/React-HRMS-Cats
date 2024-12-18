import { Space, Table, Select, Button, Form, Input, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import PageTitle from "../../components/Title_Page/TitlePage";
import Swal from "sweetalert2";
import getColumnSearchProps from "../../share/ColumnSearchProps";
import {
  EyeFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SaveFilled,
} from "@ant-design/icons";
import { request } from "../../share/request";

const PositionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [department, setDepartment] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getListPos = () => {
    setLoading(true);
    request("info/position/position", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
       // console.log(res.data);
      }
    });
  };
  const onEdit = (Item) => {
    handleClickView(Item);
    setItem(Item);
    setEdit(true);
  };

  const handleClickView = (Item) => {
    // console.log("Failed:", Item);
    setIsModalOpen(true);
    form.setFieldsValue({
      pId: Item.id,
      pName: Item.posName,
      depId: Item.depName,
      section: Item.poSection,
      poLevel: Item.poLevel,
    });
  };

  const getListDep = () => {
    request("info/department/department", "get", {}).then((res) => {
      if (res) {
        //console.log(res.data);
        const arrTmpP = res.data.map((dep) => ({
          label: dep.depName,
          value: dep.depId,
        }));
        setDepartment(arrTmpP);
      }
    });
  };


  const onFinish = (Item) => {
    console.log("Success:", item);
    const foundItem = department.find((item) => item.label === Item.depId);
    var depId = edit ? foundItem.value : Item.depId
    
    var param = {
      poId: Item.pId,
      posName: Item.pName,
      depId: depId,
      poSection: Item.section,
      poLevel: Item.poLevel,
    };

    let url = "info/position/addPosition";
    let method = "post";
    // case update
    if (edit) {
      url = "info/position/editPosition/" + item.id;
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
        getListPos();
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
        getListPos();
      }
    });
  };

  const onReset = () => {
    form.resetFields();
    setEdit(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getListPos();
    getListDep();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      render: (items, item, index) => {
        return (
          <>
            <div>
              <text style={{ fontSize: 13 }}>{index + 1}</text>
            </div>
          </>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "posName",
      key: "posName",
      ...getColumnSearchProps("posName"),
    },
    {
      title: "Department",
      dataIndex: "depName",
      key: "depName",
      ...getColumnSearchProps("depName"),
    },
    {
      title: "Level",
      dataIndex: "poLevel",
      key: "poLevel",
    },
    {
      title: "Section",
      dataIndex: "poSection",
      key: "poSection",
      ...getColumnSearchProps("poSection"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space>
          <Button
            type="info"
            icon={<EyeFilled />}
            onClick={() => handleClickView(item)}
          />
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(item)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Position" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
        onClick={showModal}
      >
        Add Position
      </Button>
      <Modal
        title="Add Position"
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
            form.resetFields();
            onFinish(item);
          }}
        >
          <Form.Item
            name="pId"
            label="Position ID"
            rules={[
              {
                required: true,
                message: "Please input Position ID!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pName"
            label="Position Name"
            rules={[
              {
                required: true,
                message: "Please input Position Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="depId"
            label="Select Department"
            rules={[
              {
                required: true,
                message: "Please Select Department!",
              },
            ]}
          >
            <Select
              showSearch
              style={{
                width: "100%",
              }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={department}
            />
          </Form.Item>
          <Form.Item name="section" label="Section">
            <Input />
          </Form.Item>
          <Form.Item
            name="poLevel"
            label="Position Level"
            rules={[
              {
                required: true,
                message: "Please input Position Level!",
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
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
export default PositionPage;
