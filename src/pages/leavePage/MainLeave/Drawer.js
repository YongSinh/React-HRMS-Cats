import React, { useState, useEffect } from "react";
import {
  Badge,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Alert,
  Space,
  Button,
  Tooltip
} from "antd";
import Editor from "../Editor/Editor";
import dayjs from "dayjs";
import { FileOutlined } from "@ant-design/icons";
import { request } from "../../../share/request";
import { isEmptyOrNull } from "../../../share/helper";
const { RangePicker } = DatePicker;
const Drawerleave = ({ open = false, onClose, items }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const start = dayjs(items.startDate);
  const end = dayjs(items.endDate);
  const [data, setData] = useState([]);
  const [editorContent, setEditorContent] = useState("Hello");

  const handleEditorChange = (content) => {
    setEditorContent(content); // Update the state with the plain text content
    console.log(content); // Log the plain text content
  };

  let status = items.approved ? "success" : "error";
  let text = items.approved ? "Approved" : "No";

  const getListFile = () => {
    let date = items.createdAt;
    let  empId =items.empId;
    request(
      `files/ByEmIdAndTypeServiceDate?emId=${empId}&type=2&date=${date}&service=2`,
      "get",
      {}
    ).then((res) => {
      if (res) {
        console.log(res);
        setData(res);
      }
    });
  };

  const handleViewFile = (value) => {
    window.open(value.filePreviewUri, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    getListFile();
    form.setFieldsValue({
      id: items.empId,
      lType: items.leaveType,
      duration: items.dayOfLeave,
      reason: items.reason,
      remark: items.remark,
    });
  }, [items]);
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title="Create Request Leave"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          layout="vertical"
          form={form}
          name="basic"
          initialValues={{
            remember: false,
          }}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="id" label="Employee ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lType" label="Leave Type">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="dateTime" label="DateTime">
                <RangePicker
                  defaultValue={[
                    dayjs(start, dateFormat),
                    dayjs(end, dateFormat),
                  ]}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="duration" label="Leave Duration">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="approver" label="Status">
                <Badge status={status} text={text} />
              </Form.Item>
            </Col>
            <Form.Item name={"reason"} label="Reason">
              <Editor
                value={editorContent}
                onChange={handleEditorChange}
                placeholder="Start typing..."
              />
            </Form.Item>
            <Form.Item name={"remark"} label="Remark">
              <Editor
                value={editorContent}
                onChange={handleEditorChange}
                placeholder="Start typing..."
              />
            </Form.Item>

            <Col span={24}>
              <Form.Item name="upload" label="Upload">
                {isEmptyOrNull(data) ? (
                  <Space wrap>
                    {data.map((items) => (
                      <Tooltip title={items.name}>
                        <Button icon={<FileOutlined />} onClick={(()=> handleViewFile(items))}>view</Button>
                      </Tooltip>
                    ))}
                  </Space>
                ) : (
                  <Alert
                    message="There is no file Upload!"
                    type="info"
                    showIcon
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default Drawerleave;
