import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { SaveFilled } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const TimeInAndOut = ({ open = false, onClose, onFinish, edit = false }) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    onClose();
    form.resetFields(); // clear data in form
  };

  useEffect(() => {
    const today = dayjs();
    let remark = "";
    const dayOfWeek = today.day();
    if (dayOfWeek === 6) {
      remark = "Saturday"; // Set remark to Saturday
    } else if (dayOfWeek === 0) {
      remark = "Sunday"; // Set remark to Sunday
    }
      form.setFieldsValue({
        time: dayjs(),
        date: dayjs(),
        remark: remark,
      })
  }, []);


  return (
    <>
      <Drawer
        title={`Time ${edit ? "Out" : "In"}`}
        width={720}
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(item) => {
            //form.resetFields();
            form.setFieldsValue({
              time: dayjs(),
              date: dayjs(),
            })
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label={`Date ${edit ? "Out" : "In"}`}
                rules={[
                  {
                    required: true,
                    message: "Please choose the date!",
                  },
                ]}
              >
                <DatePicker
                  disabled
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="time"
                label={`Time ${edit ? "Out" : "In"}`}
                rules={[
                  {
                    required: true,
                    message: "Please select time!",
                  },
                ]}
              >
                <TimePicker
                  style={{
                    width: "100%",
                  }}
                  disabled
                  format="HH:mm A"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="remark"
                label="Remark"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Remark"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button type="primary" onClick={onClose} danger >Cancel</Button>
                <Button type="primary" icon={<SaveFilled />} htmlType="submit">Submit</Button>
              </Space>
            </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default TimeInAndOut;
