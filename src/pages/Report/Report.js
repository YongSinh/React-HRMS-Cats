
import { Space, Table, Tag,Button,Form,Input } from 'antd';
import React, { useState } from 'react';
import PageTitle from '../../components/Title_Page/TitlePage';
import {  Modal } from 'antd';
import { EyeFilled, DeleteOutlined,EditFilled,PlusOutlined,PlusCircleOutlined,DownloadOutlined} from "@ant-design/icons";
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (_, ) => (
      <Space>

        <Button type="primary" icon={<DownloadOutlined />} />
       
      </Space>
    ),
  },
  
];
const data = [
    {
      key: '1',
      No:1,
      name: 'John Brown',
      detail:'150$'
    },
    {
        key: '2',
        No:2,
        name: 'John Brown',
        detail:'250$'
    },
  ]



const ReportPage = () =>{

    
    
    return(
        <>
         <PageTitle
         PageTitle='Report'
      
      />
      



        <Table columns={columns} dataSource={data} />;
        </>
        
    )
}

export default ReportPage;