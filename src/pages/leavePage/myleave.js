import React, { useState } from 'react';
import { PlusOutlined,EyeFilled,EditFilled,DeleteOutlined,SendOutlined } from '@ant-design/icons';
import { Button,Select,Space,DatePicker,Table } from 'antd';
import { Link } from 'react-router-dom';
import Drawerleave from './Drawer';
import PageTitle from '../../components/Title_Page/TitlePage';
const { RangePicker } = DatePicker;
const LeaveRequest = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
    },

    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: ' Action',
      dataIndex: 'action',
      render: (_, ) => (
        <Space>
          <Button icon={<EyeFilled />} />
          <Button type="primary" icon={<EditFilled />} />
          <Button type="primary" icon={<SendOutlined />} />
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      no:1,
      name: 'John Brown',
      department: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      no:2,
      name: 'Jim Green',
      department: 98,
      math: 66,
      english: 89,
    },
  ]
  return (
    <>
     <PageTitle
                PageTitle='Leave Request'
            />
  

    
    <Space  >
        
        <Select
        style={{
          width: 180,
          height: 30,

        }}
        Select
        showSearch
        placeholder="Leave Type"
        
       
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
      <Select
        style={{
          width: 180,
          height: 30,

        }}
        Select
        showSearch
        placeholder="Status"
        
       
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
        
        <RangePicker />
        <Button style={{width:180, height: 30}} type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Request Leave
      </Button>
      <Drawerleave
      open={open}
      onClose={onClose}
      />
      </Space>
      
     
        
      <Table style={{marginTop:10}} dataSource={data} columns={columns} />;
      
    </>
  );
};
export default LeaveRequest;