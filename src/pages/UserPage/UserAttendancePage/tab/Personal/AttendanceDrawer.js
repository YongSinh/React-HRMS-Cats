import React from "react";
import { Drawer, Form, Row, Col, Input, DatePicker, TimePicker, Space, Button } from "antd";

const { RangePicker } = DatePicker;
const AttendanceDrawer = ({ form, visible, onClose, onSubmit }) => {
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const dateRange = values.dateTime
        ? `${values.dateTime[0].format(
            "YYYY-MM-DD"
          )} - ${values.dateTime[1].format("YYYY-MM-DD")}`
        : "";
      const newAttendance = {
        key: Date.now(), // Unique key based on timestamp
        ID: `KH${Date.now()}`,
        name: values.name,
        dateRange,
        timeIn: values.timeIn ? values.timeIn.format("HH:mm A") : "",
        timeOut: values.timeOut ? values.timeOut.format("HH:mm A") : "",
        Status: "Active",
        description: values.description,
        position: "Employee",
        remark: "New Remark",
        imageUrl: `https://randomuser.me/api/portraits/men/${
          Math.floor(Math.random() * 100) + 1
        }.jpg`,
      };
      onSubmit(newAttendance);
    });
  };

  return (
    <Drawer
      title="Create Your Attendance"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" hideRequiredMark>
        <Row gutter={16}>
            <Col span={12}>
            <Form.Item
              name="dateTime"
              label="Date Range"
              rules={[
                { required: true, message: "Please choose the date range" },
              ]}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="timeIn"
              label="Time In"
              rules={[{ required: true, message: "Please select time in" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm A" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="timeOut"
              label="Time Out"
              rules={[{ required: true, message: "Please select time out" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm A" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter description" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default AttendanceDrawer;
