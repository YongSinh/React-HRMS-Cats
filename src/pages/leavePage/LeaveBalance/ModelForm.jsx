import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Select,
  Col,
  Row,
  Divider,
  DatePicker,
  Input,
} from "antd";
import { SendOutlined, DownloadOutlined } from "@ant-design/icons";

const SELECT_ALL_OPTION = {
  label: "Select All",
  value: "_SELECT_ALL_OPTION",
};
function useSelectAllOption(options) {
  const optionsWithAllOption = useMemo(
    () => [SELECT_ALL_OPTION, ...options],
    [options]
  );

  /** pass this to Form.Item's getValueFromEvent prop */
  const getValueFromEvent = useCallback(
    (value, selections) => {
      if (!selections?.length) return selections;
      if (!selections?.some((s) => s.value === SELECT_ALL_OPTION.value)) {
        return selections;
      }
      const labelInValue = typeof value[0]?.label === "string";
      // if "Select All" option selected, set value to all options
      // also keep labelInValue in consideration
      return labelInValue ? options : options.map((o) => o.value);
    },
    [options]
  );

  return [getValueFromEvent, optionsWithAllOption];
}

export default function ModelForm({
  open = false,
  handleClose,
  onFinish,
  title,
  handleOk,
  conutry,
  items,
  view,
  status,
  disabled = false,
}) {
  const options = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
    { label: "three", value: "three" },
  ];
  const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(options);
  const [form] = Form.useForm();

  const onFinish2 = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
      >
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          form={form}
          layout={"vertical"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please select department!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Department"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  allowClear
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                 rules={[
                    {
                      required: true,
                      message: "Please select Employees!",
                    },
                  ]}
                label="Employees"
                getValueFromEvent={getValueFromEvent}
                name="selectWithAllOption"
              >
                <Select
                  showSearch
                  placeholder="Select a Employees"
                  allowClear
                  mode="multiple"
                  options={optionsWithAllOption}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Leave Type"
                name={"type"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Type!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Leave Type"
                  allowClear
                  mode="multiple"
                  options={optionsWithAllOption}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date"
                name={"date"}
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  style={{width:"100%"}}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={onOk}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button icon={<SendOutlined />} type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
