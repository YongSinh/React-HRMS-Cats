import { SaveFilled } from "@ant-design/icons";
import {
    Button,Form, Modal, Space,DatePicker
} from "antd"
import React from "react";

const ModalForm = ({
    open = false,
    title = null,
    footer = null,
    onCancel,
    onOk,
    onFinish
}) => {

    const [form] = Form.useForm() // 

    const handleCancel = () => {
        form.resetFields() // clear data in form
        onCancel()
    }


    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            onOk={onOk}
            footer={footer}
            maskClosable={false}
        >
            <Form
                form={form}
                name="form_category"
                layout='vertical'
                onFinish={(item) => {
                    form.resetFields()
                    onFinish(item)
                }}

                initialValues={{
                    status: 1
                }}
            >

                <Form.Item
                    label={"Select Date"}
                    name={"date"}
                    rules={[{
                        required: true, message: 'Please select date!'
                    }]}
                >
                    <DatePicker style={{width:"100%"}}/>
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType='submit'><SaveFilled />submit</Button>
                    </Space>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default ModalForm;

