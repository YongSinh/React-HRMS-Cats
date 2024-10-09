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
  InputNumber,
} from "antd";
import { SaveFilled } from "@ant-design/icons";

export default function DeductionModel({
  open = false,
  handleClose,
  onFinish,
  handleOk,
  item,
  deduction,
  edit = false,
  handleDeduction,
  handleType,
  detValue,
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
        deduction:item.deductions,
        type:item.type,
        amount:item.amount,
        effectiveDate:item.effectiveDate
      });
    }
  }, [item]);

  const onChangeTyep = (value) => {
    handleType(value)
  };

  const onChangeDeduction = (value) => {
    //console.log(value)
    handleDeduction(value); // Call the parent handler to update allowances state
  };
  return (
    <>
      <Modal
        title={edit ? "Edit Deduction" : "Add Deduction"}
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
                label="Deduction"
                name={"deduction"}
                rules={[
                  {
                    required: true,
                    message: "Please select Deduction !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Deduction "
                  allowClear
                  optionFilterProp="label"
                  //mode="multiple"
                  value={detValue}
                  onChange={onChangeDeduction}
                  options={deduction}
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
                  disabled={type !== "3" ? true : false}
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
