import React, { useState } from "react";
import { EyeFilled, DeleteOutlined, EditFilled } from "@ant-design/icons";
import {
  Select,
  Table,
  Space,
  Button,
  Form,
  Input,
  Drawer,
  Tabs,
  Typography,
  Row,
  Col,
  Divider,
  DatePicker,
} from "antd";
import "./Staff.css";
const { Title } = Typography;
const columns = [
  {
    title: "ID",
    // dataIndex: "employeeId",
    dataIndex: "ID",
    render: (_, { ID }) => (
      <div>
        <span style={{ fontSize: 13 }}>{ID}</span>
      </div>
    ),

    key: "employeeId",
    width: 100,
    fixed: 'left',
    
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: 120,
    fixed: 'left',
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: 100,
    fixed: 'left',
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 100,
    fixed: 'left',
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 100,
    fixed: 'left',
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 150,
  },
  {
    title: "Work Type",
    dataIndex: "workType",
    key: "workType",
    width: 150,
  },
  {
    title: "Working Site",
    dataIndex: "workingSite",
    key: "workingSite",
    width: 150,
  },
  {
    title: "Dapartment",
    dataIndex: "department",
    key: "department",
    width: 150,
  },
  {
    title: "Section",
    dataIndex: "section",
    key: "section",
    width: 150,
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    width: 150,
  },
  {
    title: "Sart Date",
    dataIndex: "sartDate",
    key: "sartDate",
    width: 150,
  },
  {
    title: "Stop Date",
    dataIndex: "stopDate",
    key: "stopDate",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 150,
  },
  {
    title: "Live In",
    dataIndex: "liveIn",
    key: "liveIn",
    width: 150,
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    width: 150,
  },
  {
    title: "Height(cm)",
    dataIndex: "height(Cm)",
    key: "height(Cm)",
    width: 150,
  },
  {
    title: "Weigtht(Kg)",
    dataIndex: "weigtht(Kg)",
    key: "weigtht(Kg)",
    width: 150,
  },
  {
    title: "Race",
    dataIndex: "race",
    key: "race",
    width: 150,
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    key: "nationality",
    width: 150,
  },
  {
    title: "Religion",
    dataIndex: "religion",
    key: "religion",
    width: 150,
  },
  {
    title: "Place Of Birth",
    dataIndex: "placeOfBirth",
    key: "placeOfBirth",
    width: 150,
  },
  {
    title: "ID Card No.",
    dataIndex: "IdCardno.",
    key: "IdCardno.",
    width: 150,
  },
  {
    title: "Issued Place",
    dataIndex: "issuedPlace",
    key: "issuedPlace",
    width: 150,
  },
  {
    title: "Issued Date",
    dataIndex: "issuedDate",
    key: "issuedDate",
    width: 150,
  },
  {
    title: "Exp.Date",
    dataIndex: "exp.Date",
    key: "exp.Date",
    width: 150,
  },
  {
    title: "Driving License",
    dataIndex: "drivingLicense",
    key: "drivingLicense",
    width: 150,
  },
  {
    title: "Passport ID",
    dataIndex: "passportId",
    key: "passportId",
    width: 150,
  },
  {
    title: "Passport Exp.Date",
    dataIndex: "passportExp.Date",
    key: "passportExp.Date",
    width: 150,
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: 150,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 150,
  },
  {
    title: "Education",
    dataIndex: "education",
    key: "education",
    width: 150,
  },
  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "occupation",
    width: 150,
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    width: 150,
  },
  {
    title: "Office",
    dataIndex: "office",
    key: "office",
    width: 150,
  },
  {
    title: "Action",
    key: "Action",
    fixed: 'right',
    width: 150,
    render: () => <a>action</a>,
    render: () => (
      <Space>
        <Button
          type="primary"
          icon={<EyeFilled />}
          style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
        ></Button>
        <Button
          type="primary"
          icon={<EditFilled />}
          style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
        ></Button>
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          style={{ backgroundColor: "#F44336", borderColor: "#F44336" }}
        ></Button>
      </Space>
    ),
  },

];

const initialData = [];
for (let i = 1; i < 28; i++) {
  initialData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    Status: `Active`,
    ID: `KH007${i.toString().padStart(2, "0")}`,
    department: `Department ${i % 5}`,
    position: `Position ${i % 3}`,
  });
}


const Staff = () => {
  const [data, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

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
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };







  const handleSelectChange = (value, type) => {
    console.log(`selected ${value} for ${type}`);
  };

  const handleSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();

        const newEntry = {
          key: data.length + 1,
          employeeId: values.employeeId,
          firstName: values.firstName,
          lastName: values.lastName,
          fullName: values.firstName + " " + values.lastName,
          gender: values.gender,
          phone: values.phone,
          email: values.email,
          workType: values.workType,
          department: values.department,
          workingSite: values.workingSite,
          section: values.section,
          position: values.position,
          startWork: values.startWork
            ? values.startWork.format("YYYY-MM-DD")
            : null,
          endWork: values.endWork ? values.endWork.format("YYYY-MM-DD") : null,
          address: values.address,
          liveIn: values.liveIn,
          dateOfBirth: values.dateOfBirth
            ? values.dateOfBirth.format("YYYY-MM-DD")
            : null,
          height: values.height,
          weight: values.weight,
          race: values.race,
          nationality: values.nationality,
          religion: values.religion,
          placeOfBirth: values.placeOfBirth,
          idCardNo: values.idCardNo,
          issuedPlace: values.issuedPlace,
          issuedDate: values.issuedDate
            ? values.issuedDate.format("YYYY-MM-DD")
            : null,
          expDate: values.expDate ? values.expDate.format("YYYY-MM-DD") : null,
          drivingLicense: values.drivingLicense,
          passportId: values.passportId,
          passportExpDate: values.passportExpDate
            ? values.passportExpDate.format("YYYY-MM-DD")
            : null,
          emergencyContactFirstName: values.emergencyContactFirstName,
          emergencyContactLastName: values.emergencyContactLastName,
          emergencyContactGender: values.emergencyContactGender,
          emergencyContactAge: values.emergencyContactAge,
          emergencyContactEducation: values.emergencyContactEducation,
          emergencyContactOccupation: values.emergencyContactOccupation,
          emergencyContactPosition: values.emergencyContactPosition,
          emergencyContactOffice: values.emergencyContactOffice,
        };

        setData([...data, newEntry]);
        setDrawerVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Space style={{ marginBottom: 15, marginTop: 7 }}>
        <Select
          showSearch
          placeholder="Select ID"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "ID")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "0011", label: "0011" }]}
        />
        <Select
          showSearch
          placeholder="Select Position"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Position")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "Position 1", label: "Position 1" }]}
        />
        <Select
          showSearch
          placeholder="Select Department"
          optionFilterProp="children"
          onChange={(value) => handleSelectChange(value, "Department")}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={[{ value: "Department 1", label: "Department 1" }]}
        />
        <Button
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Search
        </Button>
        <Button type="primary" onClick={showDrawer}>
          Add
        </Button>
      </Space>
      <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 600,
        
      }}
      style={{
        
      }}
    />
      <>
        <Drawer
          title={<Title style={styles.addstaff}>Add New Staff</Title>}
          onClose={handleDrawerClose}
          style={styles.header}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 , height: '100vh' }}
          width="100%"
          extra={
            <Space className="btnCS">
              <Button onClick={handleDrawerClose}>Cancel</Button>
              <Button onClick={handleSave} type="primary">
                Save
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical" name="form_in_drawer">
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="Personal Detail" key="1">
                {/* <div className="fome1"> */}
                  {/* <Form layout="vertical"> */}
                    <Title level={4}>Personal Imformation:</Title>
                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="employeeID"
                          label="Employee ID"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Employee ID!" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="firstName"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter First Name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="lastName"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., Doe" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Gender">
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="phone"
                          label="Phone"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., +1 234 567 890" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., john.doe@example.com" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="workType"
                          label="Work Type"
                          rules={[
                            {
                              required: true,
                              message: "Please input the employeeID!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., Full-time" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="workingSite"
                          label="Working Site"
                          rules={[
                            {
                              required: true,
                              message: "Please input Working Site!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., New York Office" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="department"
                          label="Department"
                          rules={[
                            {
                              required: true,
                              message: "Please select Department!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Department"></Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="section"
                          label="Section"
                          rules={[
                            {
                              required: true,
                              message: "Please input Section!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., HR" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="position"
                          label="Position"
                          rules={[
                            {
                              required: true,
                              message: "Please select Position!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Position"></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="startDate"
                          label="Start Date"
                          rules={[
                            {
                              required: true,
                              message: "Please select Start Date!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Start Date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="stopDate"
                          label="Stop Date"
                          rules={[
                            {
                              required: true,
                              message: "Please select Stop Date!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Stop Date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="address"
                          label="Address"
                          rules={[
                            {
                              required: true,
                              message: "Please input Address!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., 123 Main St" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="liveIn"
                          label="Live In"
                          rules={[
                            {
                              required: true,
                              message: "Please input Live In!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., New York, USA" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="dob"
                          label="Date of Birth"
                          rules={[
                            {
                              required: true,
                              message: "Please select Date of Birth!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Date of Birth"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="height"
                          label="Height (cm)"
                          rules={[
                            { required: true, message: "Please input Height!" },
                          ]}
                        >
                          <Input placeholder="E.g., 180" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="weight"
                          label="Weight (kg)"
                          rules={[
                            { required: true, message: "Please input Weight!" },
                          ]}
                        >
                          <Input placeholder="E.g., 75" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="race"
                          label="Race"
                          rules={[
                            { required: true, message: "Please input Race!" },
                          ]}
                        >
                          <Input placeholder="E.g., Asian" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="nationality"
                          label="Nationality"
                          rules={[
                            {
                              required: true,
                              message: "Please input Nationality!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., American" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="religion"
                          label="Religion"
                          rules={[
                            {
                              required: true,
                              message: "Please input Religion!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., Christian" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="placeOfBirth"
                          label="Place of Birth"
                          rules={[
                            {
                              required: true,
                              message: "Please input Place of Birth!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., New York" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="idCardNo"
                          label="ID Card No."
                          rules={[
                            {
                              required: true,
                              message: "Please input ID Card No.! ",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., 123456789" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="issuedPlace"
                          label="Issued Place"
                          rules={[
                            {
                              required: true,
                              message: "Please input Issued Place!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., New York" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="issuedDate"
                          label="Issued Date"
                          rules={[
                            {
                              required: true,
                              message: "Please select Issued Date!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Issued Date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="expDate"
                          label="Exp. Date"
                          rules={[
                            {
                              required: true,
                              message: "Please select Exp. Date!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Exp. Date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="drivingLicense"
                          label="Driving License"
                          rules={[
                            {
                              required: true,
                              message: "Please input Driving License!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., D12345678" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="passportId"
                          label="Passport ID"
                          rules={[
                            {
                              required: true,
                              message: "Please input Passport ID!",
                            },
                          ]}
                        >
                          <Input placeholder="E.g., P12345678" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="passportExpDate"
                          label="Passport Exp. Date"
                          rules={[
                            {
                              required: true,
                              message: "Please select Passport Exp. Date!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="Select Passport Exp. Date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider />
                  {/* </Form> */}
                  <Title level={4}>Government Officer:</Title>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item name="firstName" label="First Name"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="siblingLastName" label="Last Name"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Last Name" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="siblingGender" label="Gender"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Select placeholder="Select Gender">
                          <Select.Option value="male">Male</Select.Option>
                          <Select.Option value="female">Female</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="siblingAge" label="Age"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Age" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item name="siblingEducation" label="Education"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Education" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="siblingOccupation" label="Occupation"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Occupation" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="siblingPosition" label="Position"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Position" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="siblingOffice" label="Office"
                         rules={[
                          { required: true, message: "Please input Height!", },
                        ]}>
                        <Input placeholder="Enter Sibling's Office" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                {/* </div> */}
              </Tabs.TabPane>
              <Tabs.TabPane tab="History" key="2">
                <Title level={4}> History Imformation</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="historyFullName"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input the full name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Full Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyDepartment"
                      label="Department"
                      rules={[
                        {
                          required: true,
                          message: "Please input the department!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Department" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="historySection" label="Section">
                      <Input placeholder="Enter Section" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyPosition"
                      label="Position"
                      rules={[
                        {
                          required: true,
                          message: "Please input the position!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Position" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="historyPhone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input the phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="historyEmail"
                      label="Email"
                      rules={[
                        { required: true, message: "Please input the email!" },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="startWork"
                      label="Start Work"
                      rules={[
                        {
                          required: true,
                          message: "Please select the start date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select Start Date"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endWork" label="End Work">
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select End Date"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Family Data" key="3">
                <Title level={4}>Family Information</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fatherName"
                      label="Father's Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input father's name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Father's Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="fatherOccupation"
                      label="Father's Occupation"
                    >
                      <Input placeholder="Enter Father's Occupation" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fatherAddress"
                      label="Father's Permanent Address"
                    >
                      <Input placeholder="Enter Father's Permanent Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="fatherPhone" label="Father's Phone Number">
                      <Input placeholder="Enter Father's Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="motherName"
                      label="Mother's Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input mother's name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Mother's Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="motherOccupation"
                      label="Mother's Occupation"
                    >
                      <Input placeholder="Enter Mother's Occupation" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="motherAddress"
                      label="Mother's Permanent Address"
                    >
                      <Input placeholder="Enter Mother's Permanent Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="motherPhone" label="Mother's Phone Number">
                      <Input placeholder="Enter Mother's Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="numOfSiblings"
                      label="Number of Siblings"
                      rules={[
                        {
                          required: true,
                          message: "Please input the number of siblings!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Number of Siblings" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="youAreNumber"
                      label="You are the Number"
                      rules={[
                        {
                          required: true,
                          message: "Please input your order among siblings!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Your Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="maritalStatus"
                      label="Marital Status"
                      rules={[
                        {
                          required: true,
                          message: "Please select marital status!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Marital Status">
                        <Select.Option value="single">Single</Select.Option>
                        <Select.Option value="married">Married</Select.Option>
                        <Select.Option value="divorced">Divorced</Select.Option>
                        <Select.Option value="widowed">Widowed</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Title level={4}>Sibling Information</Title>
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item name="siblingFirstName" label="First Name">
                      <Input placeholder="Enter Sibling's First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingLastName" label="Last Name">
                      <Input placeholder="Enter Sibling's Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingGender" label="Gender">
                      <Select placeholder="Select Gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="siblingAge" label="Age">
                      <Input placeholder="Enter Sibling's Age" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item name="siblingEducation" label="Education">
                      <Input placeholder="Enter Sibling's Education" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="siblingOccupation" label="Occupation">
                      <Input placeholder="Enter Sibling's Occupation" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="siblingPosition" label="Position">
                      <Input placeholder="Enter Sibling's Position" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="siblingOffice" label="Office">
                      <Input placeholder="Enter Sibling's Office" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Education" key="4">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="educationLevel"
                      label="Education Level"
                      rules={[
                        {
                          required: true,
                          message: "Please select education level!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Education Level">
                        <Select.Option value="highschool">
                          High School
                        </Select.Option>
                        <Select.Option value="bachelor">
                          Bachelor's Degree
                        </Select.Option>
                        <Select.Option value="master">
                          Master's Degree
                        </Select.Option>
                        <Select.Option value="phd">Ph.D.</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="educationInstitution"
                      label="Education Institution"
                      rules={[
                        {
                          required: true,
                          message: "Please input the education institution!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Education Institution" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="endYear"
                      label="End Year"
                      rules={[
                        {
                          required: true,
                          message: "Please input the end year!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter End Year" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="degreeMajor"
                      label="Degree/Major"
                      rules={[
                        {
                          required: true,
                          message: "Please input the degree/major!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Degree/Major" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gpa"
                      label="GPA"
                      rules={[
                        {
                          required: true,
                          message: "Please input the education institution!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter GPA" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Special Ability" key="5">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="foreignLanguage"
                      label="Foreign Language"
                      rules={[
                        {
                          required: true,
                          message: "Please input a foreign language!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Foreign Language" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="reading"
                      label="Reading"
                      rules={[
                        {
                          required: true,
                          message: "Please select reading proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Reading Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="speaking"
                      label="Speaking"
                      rules={[
                        {
                          required: true,
                          message: "Please select speaking proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Speaking Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="listening"
                      label="Listening"
                      rules={[
                        {
                          required: true,
                          message: "Please select listening proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Listening Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="writing"
                      label="Writing"
                      rules={[
                        {
                          required: true,
                          message: "Please select writing proficiency!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Writing Proficiency">
                        <Select.Option value="basic">Basic</Select.Option>
                        <Select.Option value="intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="advanced">Advanced</Select.Option>
                        <Select.Option value="fluent">Fluent</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Emergency Contact" key="6">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyFullName"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input the full name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Full Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="relationship"
                      label="Relationship"
                      rules={[
                        {
                          required: true,
                          message: "Please input the relationship!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Relationship" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyAddress"
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input the address!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="emergencyTel"
                      label="Tel"
                      rules={[
                        {
                          required: true,
                          message: "Please input the telephone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Tel" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="officeAddress"
                      label="Office Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input the office address!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Office Address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="officeTel"
                      label="Office Tel"
                      rules={[
                        {
                          required: true,
                          message: "Please input the office telephone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Office Tel" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Title level={4}>Residence in Google Map</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="latitude"
                      label="Latitude"
                      rules={[
                        {
                          required: true,
                          message: "Please input the latitude!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Latitude" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="longitude"
                      label="Longitude"
                      rules={[
                        {
                          required: true,
                          message: "Please input the longitude!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Longitude" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </Tabs.TabPane>
            </Tabs>
          </Form>
        </Drawer>
      </>
    </>
  );
};
const styles = {
  header: {
    color: "#fff",
  },
  addstaff: {
    color: "#fff",
    marginBottom: "none",
    fontSize: "1.5rem",
    padding: "none",
  },
};

export default Staff;
