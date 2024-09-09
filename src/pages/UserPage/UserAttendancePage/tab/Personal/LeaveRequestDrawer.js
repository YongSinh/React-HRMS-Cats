import React from "react";
import { Button, Col, DatePicker, Drawer, Form, Row, Select, Space, Upload, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const uploadProps = {
  name: 'file',
  action: 'For API',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: (file) => {
    const isAllowedType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isAllowedType) {
      message.error('You can only upload JPG/PNG files!');
    }
    return isAllowedType || Upload.LIST_IGNORE; // Prevents upload if type not allowed
  },
  onChange(info) {
    if (info.file.status === 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const LeaveRequestDrawer = ({ form, visible, onClose, onSubmit }) => {
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const dateRange = values.dateTime
        ? `${values.dateTime[0].format("YYYY-MM-DD")} - ${values.dateTime[1].format("YYYY-MM-DD")}`
        : "";

      const newLeaveRequest = {
        key: Date.now(),
        ID: `KH${Date.now()}`,
        name: values.name || "John Doe",  
        dateRange,
        leaveType: values.leaveType,      
        leaveDuration: values.leaveDuration, 
        status: "Active",
        remark: values.remark,           
        reason: values.reason,           
        upload: values.upload ? values.upload[0].name : null, // Use first file from the fileList
      };

      onSubmit(newLeaveRequest);
    }).catch((error) => {
      console.log('Validation Failed:', error);
    });
  };

  return (
    <Drawer
      title="Create Request Leave"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'left',
          }}
        >
          <Space >
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="leaveType"
              label="Leave Type"
              rules={[{ required: true, message: 'Please select the leave type' }]}
            >
              <Select placeholder="Please select leave type">
                <Option value="Annual Leave">Annual Leave</Option>
                <Option value="Sick Leave">Sick Leave</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="leaveDuration"
              label="Leave Duration"
              rules={[{ required: true, message: 'Please select the leave duration' }]}
            >
              <Select placeholder="Please select leave duration">
                <Option value="half_day">Half Day</Option>
                <Option value="full_day">Full Day</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="Date Range"
              rules={[{ required: true, message: 'Please select the date range' }]}
            >
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="remark"
          label="Remark"
          rules={[{ required: true, message: "Please enter remark" }]}
        >
          <Input.TextArea rows={2} placeholder="Enter remark" />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: "Please enter reason" }]}
        >
          <Input.TextArea rows={2} placeholder="Enter reason" />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload File Info"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default LeaveRequestDrawer;