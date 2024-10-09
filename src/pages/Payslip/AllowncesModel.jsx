import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Select,
  Col,
  Row,
  DatePicker,
  Input,
  InputNumber,
} from "antd";
import { SaveFilled } from "@ant-design/icons";
import dayjs from "dayjs";

export default function AllowncesModel({
  open = false,
  handleClose,
  onFinish,
  handleOk,
  item,
  allownces,
  edit = false,
  handleAllowances,
  handleType,
  allValue,
  typeOption,
  type
}) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields(); // clear data in form
    handleClose();
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        allownces:item.allowances,
        type:item.type,
        amount:item.amount,
        effectiveDate:item.effectiveDate
      });
    }
  }, [item]);

  const onChangeTyep = (value) => {
    handleType(value)
  };

  const onChangeAllowances = (value) => {
    //console.log(value)
    handleAllowances(value); // Call the parent handler to update allowances state
  };

  return (
    <>
      <Modal
        title={edit ? "Edit Allowance" : "Add Allowance"}
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        footer={false}
        maskClosable={false}
      >
        <Form
          form={form}
          name="form_category"
          layout="vertical"
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Allownces"
                name={"allownces"}
                rules={[
                  {
                    required: true,
                    message: "Please select allownces !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a allownces"
                  allowClear
                  optionFilterProp="label"
                  //mode="multiple"
                  value={allValue}
                  onChange={onChangeAllowances}
                  options={allownces}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Option Type"
                name={"type"}
                rules={[
                  {
                    required: true,
                    message: "Please select Option !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Option"
                  allowClear
                  optionFilterProp="label"
                  //mode="multiple"
                  value={type}
                  onChange={onChangeTyep}
                  options={typeOption}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Amount"
                name={"amount"}
                rules={[
                  {
                    required: true,
                    message: "Please input the amount !",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} addonAfter="$" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Effective Date" name={"effectiveDate"}>
                <DatePicker
                  disabled={type != "3" ? true : false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button type="primary" onClick={handleCancel} danger>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                <SaveFilled />
                submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
