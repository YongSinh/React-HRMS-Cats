import { Space, Table, Tag,Button,Form,Input } from 'antd';
import React, { useState } from 'react';
import PageTitle from '../../../components/Title_Page/TitlePage';
import {  Modal } from 'antd';
import { EyeFilled, DeleteOutlined,EditFilled,PlusOutlined,PlusCircleOutlined} from "@ant-design/icons";
import { ImOpt } from 'react-icons/im';

const columns = [
  {
    title: "No",
    dataIndex: "No",
    render: (_, { No }) => {
      return (
        <>
          <div>
            <text style={{ fontSize: 13}} >
              {No}
            </text>
          </div>
        </>
      );
    },
  },
  {
    title: 'Type Name',
    dataIndex: 'type_name',
    key: 'type_name',

  },
  {
    title: 'Total Leave Day',
    dataIndex: 'total_leave',
    key: 'total_leave',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (_, ) => (
      <Space>

        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
  
];
const data = [
    {
      
      No:1,
      type_name: 'Special Leave',
      total_leave:'4'
    },
    {
        
        No:2,
        type_name: 'Sick Leave',
        total_leave:'5'
    },
  ]






const Leave_TypePage = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    return(
        <>
         <PageTitle
         PageTitle='Leave Type List'
      
      />
      <Button 

        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7, }}
        onClick={showModal}>

        Add Leave Type
        </Button>
      <Modal title="Add Leave Type" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="vertical" hideRequiredMark>
      <Form.Item
                name="leave_type"
                label="Leave Type"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                name="num"
                label="Number of Leave"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
              <Input />
              </Form.Item>
              
              </Form>
      </Modal>




        <Table columns={columns} dataSource={data} />;
        </>
        
    )
}
export default Leave_TypePage;