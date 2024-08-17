import React, { useState } from "react";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import "./personal_attendance.css";
import {
  Table,
  Space,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Tag,
  TimePicker,
} from "antd";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    render: (text) => <div style={{ fontSize: 13 }}>{text}</div>,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Start Date - End Date",
    dataIndex: "dateRange",
  },
  {
    title: "Time In",
    dataIndex: "timeIn",
  },
  {
    title: "Time Out",
    dataIndex: "timeOut",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (Status) => {
      let color;
      switch (Status) {
        case "Active":
          color = "green";
          break;
        case "Late":
          color = "yellow";
          break;
        case "Unactive":
          color = "red";
          break;
        default:
          color = "grey";
      }
      return (
        <Tag style={{ fontSize: 13 }} color={color}>
          {Status}
        </Tag>
      );
    },
  },
  {
    title: "Remark",
    dataIndex: "remark",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space>
        <Button
          type="primary"
          icon={<EyeFilled />}
          style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
        />
      </Space>
    ),
  },
];

const initialData = [];
for (let i = 0; i < 6; i++) {
  initialData.push({
    key: i,
    name: `Edward King ${i}`,
    dateRange: `2023-08-01 - 2023-08-07`,
    timeIn: "08:00 AM",
    timeOut: "05:00 PM",
    position: "Developer",
    description: `Worked on Project ${i}`,
    ID: `0${i}`,
    Status: `Unactive`,
    remark: `Remark ${i}`,
  });
}

const Personal_Attendance = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(initialData);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onSubmit = () => {
    form.validateFields().then((values) => {
      const dateRange = values.dateTime
        ? `${values.dateTime[0].format("YYYY-MM-DD")} - ${values.dateTime[1].format("YYYY-MM-DD")}`
        : "";
      const newAttendance = {
        key: data.length + 1,
        ID: `KH0${data.length + 1}`,
        name: values.name,
        dateRange: dateRange,
        timeIn: values.timeIn ? values.timeIn.format("HH:mm A") : "",
        timeOut: values.timeOut ? values.timeOut.format("HH:mm A") : "",
        Status: "Active",
        description: values.description,
        position: "Employee", // This can be dynamic
        remark: "New Remark", // This can be dynamic
      };
      // Prepend the new record to the data array
      setData([newAttendance, ...data]);
      onClose();
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7 }}
      >
        Mark Attendance
      </Button>
      <Drawer
        title="Create Your Attendance"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Date Range"
                rules={[
                  {
                    required: true,
                    message: "Please choose the date range",
                  },
                ]}
              >
                <RangePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="timeIn"
                label="Time In"
                rules={[
                  {
                    required: true,
                    message: "Please select time in",
                  },
                ]}
              >
                <TimePicker
                  style={{
                    width: "100%",
                  }}
                  format="HH:mm A"
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeOut"
                label="Time Out"
                rules={[
                  {
                    required: true,
                    message: "Please select time out",
                  },
                ]}
              >
                <TimePicker
                  style={{
                    width: "100%",
                  }}
                  format="HH:mm A"
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter description",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Please enter description" />
              </Form.Item>
            </Col>
          </Row>
          <Space style={{ marginBottom: 120 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        </Form>
      </Drawer>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
};

export default Personal_Attendance;





