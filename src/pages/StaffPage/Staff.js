import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Form, Table } from "antd";
import { UserAddOutlined, EditFilled, DeleteOutlined } from "@ant-design/icons";
import StaffDrawer from "./StaffDrawer";
import { request } from "../../share/request";
import { Link } from "react-router-dom";
import "./Staff.css";
import Swal from "sweetalert2";
import getColumnSearchProps from "../../share/ColumnSearchProps";
const Staff = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const getList = () => {
    setLoading(true);
    request("info/employee/listEmployee", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };

  const onDelete = (Item) => {
    setLoading(true);
    request(
      "info/employee/delete?emId=" + Item.empId,
      "delete",
      {}
    ).then((res) => {
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
    });
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "sex",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date Join",
      dataIndex: "joinDate",
    },
    {
      title: "Department",
      dataIndex: "depId",
      ...getColumnSearchProps("depId"),
    },
    {
      title: "Position",
      dataIndex: "posId",
      ...getColumnSearchProps("posId"),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
    {
      title: "Action",
      key: "Action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`/edit-employee/${record.empId}`}>
            <Button
              type="primary"
              icon={<EditFilled />}
              style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
            />
          </Link>
          <Popconfirm
            title="Delete the Data"
            description="Are you sure to delete?"
            onConfirm={() => onDelete(record)}
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
  useEffect(() => {
    getList(); // Only fetch data when this tab is active
  }, []);
  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Space style={{ marginBottom: 15, marginTop: 7 }}>
        <Link to={`/add-employee`}>
          <Button icon={<UserAddOutlined />} type="primary">
            Add
          </Button>
        </Link>
      </Space>
      <Table
        scroll={{
          x: "max-content",
        }}
        columns={columns}
        loading={loading}
        //pagination={false}
        dataSource={data}
      />
      <StaffDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        //onSave={handleSave}
        form={form}
      />
    </>
  );
};

export default Staff;
