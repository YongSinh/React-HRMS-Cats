import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Editor from './Editor/Editor';
const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const { Option } = Select;
const Drawerleave = ({
    open=false,
    onClose
}) => {
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
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Leave Type"
                label="Leave Type"
                rules={[
                  {
                    required: true,
                    message: 'Leave Type',
                  },
                ]}
              >
                <Select placeholder="Please select Leave Type">
                  <Option value="al">AL</Option>
                  <Option value="sl">SL</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Leave Duration:"
                label="Leave Duration:"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder=" ">
                 
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
           
          </Row>
          <Form.Item
                name="remark"
                label="Remark"
                
              >
          <Editor>
          <Row gutter={16}>
            <Col span={24}>
            
               
              
            </Col>

          </Row>
          </Editor>
          </Form.Item>
          <Form.Item
                name="reason"
                label="Reason"
                
              >
          <Editor>
          <Row gutter={16}>
            <Col span={24}>
            
                
            </Col>

          </Row>
          </Editor>
          </Form.Item>
          <Form.Item
                name="upload"
                label="Upload"
               
              >
          
          <Row gutter={16}>
            <Col span={24}>
            <Upload {...props}>
                 <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
              
            </Col>

          </Row>
          
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default Drawerleave;