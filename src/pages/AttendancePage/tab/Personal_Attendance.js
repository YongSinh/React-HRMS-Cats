import React, { useState } from "react";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import "./personal_attendance.css";
import {
  Table,
  Space,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Tag,
} from "antd";
const { Option } = Select;
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    render: (_, { ID }) => {
      return (
        <>
          <div>
            <text style={{ fontSize: 13 }}>{ID}</text>
          </div>
        </>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "address",
    // render: (_, { address }) => {
    //   let color = 'green';
    //   return(
    //     <>
    //     <div >
    //     <Tag style={{fontSize:30}} color={color}>
    //           {address}
    //         </Tag>
    //     </div>

    //   </>
    //   )
    // }
  },
  {
    title: "Time In",
  },
  {
    title: "Time Out",
  },
  {
    title: "Position",
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (_, { Status }) => {
      let color;
      switch(Status) {
        case 'Active':
          color = 'Green';
          break;
        case 'Late':
          color = 'Yellow';
          break;
        case 'Unactive':
          color = 'Red';
          break;
      }
      return (
        <>
          <div>
            <Tag style={{ fontSize: 13 }} color={color}>
              {Status}
            </Tag>
          </div>
        </>
      );
    },
  },
  {
    title: "Remark",
  },
  {
    title: "Action",
    key: "action",
    render: (_) => (
      <Space class="icon-container">
        <Button className="fas fa-home" icon={<EyeFilled />} />
      </Space>
    ),
  },
];


const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    ID: `001${i}`,
    Status: `Unactive`,
   
  });
}




const Personal_Attendace = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [timeSwitch, setTimeSwitct] = useState(1)
const handleChange = (value) => {
  setTimeSwitct(value)
  console.log(`selected ${value}`);
};
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button 
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7, }}
      >
        Mark Attendance
      </Button>
      <Drawer 
        title="Create Your Attendance "
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        
      >
        <Form className="drawer-content" layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>

                {timeSwitch === 1 ?
                (            <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="DateTime"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the dateTime",
                      },
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{
                        width: "100%",
                      }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                    />
                  </Form.Item>
                </Col>):(
                              <Col span={12}>
                              <Form.Item
                                name="dateTimeOut"
                                label="DateTimeTimeOUt"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please choose the dateTime",
                                  },
                                ]}
                              >
                                <DatePicker.RangePicker
                                  style={{
                                    width: "100%",
                                  }}
                                  getPopupContainer={(trigger) => trigger.parentElement}
                                />
                              </Form.Item>
                            </Col>
                )}
          
            <Select
      style={{
        width: 120,
      }}
     // disabled
      onChange={handleChange}
      options={[
        {
          value: 1,
          label: 'Time-In',
        },
        {
          value: 2,
          label: 'Time-out',
        },
      ]}/>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />

                
              </Form.Item>
              
       
        
            </Col>

            <Space className="btn_s-c" style={{marginBottom: 120}}>
            <Button onClick={onClose}>
              Cancel
              </Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
          </Row>
          

        </Form>
      
      </Drawer>
      <Table 
      rowSelection={rowSelection} 
      columns={columns}
       dataSource={data} />
    </>
  );
};
export default Personal_Attendace;