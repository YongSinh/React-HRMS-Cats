import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Button,
  Space,
  Select,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;

const PersonalDetailForm = ({ onSave, onCancel }) => {
  const handleUploadChange = ({ file }) => {
    if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };
  return (
    <>
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
        {/* Row for uploading image */}

        <Col span={12} >
          <Form.Item
            name="upload"
            label="Upload Image"
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
            <Select placeholder="Select Department">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
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
            <Select placeholder="Select Position">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
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
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="E.g., 180" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="weight"
            label="Weight (kg)"
            rules={[{ required: true, message: "Please input Weight!" }]}
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
            rules={[{ required: true, message: "Please input Race!" }]}
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

      <Title level={4}>Government Officer:</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's First Name" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="siblingLastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Last Name" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="siblingGender"
            label="Gender"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Select placeholder="Select Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="siblingAge"
            label="Age"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Age" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="siblingEducation"
            label="Education"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Education" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="siblingOccupation"
            label="Occupation"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Occupation" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="siblingPosition"
            label="Position"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Position" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="siblingOffice"
            label="Office"
            rules={[{ required: true, message: "Please input Height!" }]}
          >
            <Input placeholder="Enter Sibling's Office" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Space>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Space>
    </>
  );
};

export default PersonalDetailForm;
