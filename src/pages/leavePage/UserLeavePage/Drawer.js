import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  InputNumber,
  TimePicker,
} from "antd";
import { InboxOutlined, SaveFilled } from "@ant-design/icons";
import { message, Upload } from "antd";
import Editor from "../Editor/Editor";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { Dragger } = Upload;

const Drawerleave = ({ open = false, onClose, onFinish, leaevType, edit = false }) => {
  const [file, setFile] = useState(null);
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [duration, setDuration] = useState(0.5);
  const [form] = Form.useForm();

  const onChangeDuration = (value) => {
    setDuration(value);
    if (value % 1 === 0.5) {
      setIsHalfDay(true);
    } else {
      setIsHalfDay(false);
    }
  };

  const props = {
    name: "file",
    maxCount:1,
    multiple: false, // Disable multiple uploads, can be enabled if needed
    beforeUpload: (file) => {
      // Before the file is uploaded, store it in the state
      setFile(file);
      message.success(`${file.name} file is ready for upload.`);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "removed") {
        setFile(null);
        message.info("File removed.");
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleEditorChange = (content) => {
    console.log(content); // Log the plain text content
  };

  const handleCancel = () => {
    onClose();
    form.resetFields(); // clear data in form
  };

  const onChangeDate = (value, dataSrting) => {
    console.log(dataSrting[0]);
    console.log(dataSrting[1]);
  };

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };


  return (
    <>
      <Drawer
        title="Request Leave"
        width={720}
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
          initialValues={{
            status: 1,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="emId" label="Employee ID">
                <Input placeholder="Employee ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaveType"
                label="Leave Type"
                rules={[
                  {
                    required: true,
                    message: "Leave Type",
                  },
                ]}
              >
                <Select
                  Select
                  placeholder="Leave Type"
                  optionFilterProp="children"
                  options={leaevType}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[
                  {
                    required: true,
                    message: "Please choose the date",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  onChange={onChangeDate}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[
                  {
                    required: isHalfDay,
                    message: "Please choose the date",
                  },
                ]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  disabled={!isHalfDay}
                  onChange={onChangeTime}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="duration"
                label="Leave Duration"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Duration",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  value={duration}
                  min={0.5}
                  max={10}
                  step={0.5} // Increment by 0.5
                  onChange={onChangeDuration}
                />
              </Form.Item>
            </Col>
            <Form.Item 
            name={"reason"} 
            label="Reason"
            rules={[
              {
                required: true,
                message: "Please Input the reason",
              },
            ]}
            >
              <Editor
                // value={editorContent}
                // onChange={handleEditorChange}
                placeholder="Start typing..."
              />
            </Form.Item>
            <Form.Item name={"remark"} label="Remark">
              <Editor
                //value={editorContent}
                // onChange={handleEditorChange}
                placeholder="Start typing..."
              />
            </Form.Item>
            <Form.Item name="upload" label="Upload">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  <SaveFilled />
                  submit
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default Drawerleave;
