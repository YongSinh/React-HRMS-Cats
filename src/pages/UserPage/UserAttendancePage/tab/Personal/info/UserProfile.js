import React from "react";
import { Card, Row, Col, Avatar, Form, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  PhoneOutlined,
  CalendarOutlined,
  HomeOutlined,
  BorderlessTableOutlined
} from "@ant-design/icons"; // Import Ant Design icons

const { Title } = Typography;

// Default user data in case props are missing
const defaultUser = {
  id: "001",
  name: "John Doe",
  email: "Testing@gmail.com",
  personalPhone: "012345678",
  position: "Software Engineer",
  joiningDate: "10-10-2024",
  department: "IT",
  address: "#168, St168,Phnom Penh,Phnom Penh,Phnom Penh,Cambodia ",
  imageUrl: "https://randomuser.me/api/portraits/men/30.jpg",
};

// Reusable FormItem component for cleaner code
const ProfileFormItem = ({ label, value, bold, isEmail, icon }) => (
  <Form.Item style={{ marginBottom: 2 }}>
    <div
      style={{
        fontSize: bold ? "20px" : isEmail ? "15px" : "13px", // Font size for email
        fontWeight: bold ? "bold" : isEmail ? "500" : "normal", // Font weight for email
        color: isEmail ? "#1657ff" : "inherit", // Font color for email
        textAlign: label ? "left" : "center", // Center the name, align others to the left
        display: icon ? "flex" : "center",
      }}
    >
      {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
      {label ? `${label}: ${value}` : value}
    </div>
  </Form.Item>
);

const UserProfile = ({ user = defaultUser }) => (
  <Card style={styles.card}>
    <Row gutter={12} justify="center">
      <Col span={24} style={styles.avatarCol}>
        <Avatar size={150} src={user.imageUrl} />
      </Col>
    </Row>
    <Form layout="vertical">
      <ProfileFormItem value={user.name} bold={true} />
      <ProfileFormItem  value={user.email} isEmail={true} /> {/* Custom styling without label */}

      {/* Employee Info Header */}
      <Row>
        <Col span={24}>
          <Title level={4} style={{ marginTop: '20px', marginBottom: '10px', fontSize:"14px" }}>
            Employee Info
          </Title>
        </Col>
      </Row>
      <ProfileFormItem label="ID" value={user.id} icon={<BorderlessTableOutlined />} />
      <ProfileFormItem label="Position" value={user.position} icon={<UserOutlined />} />
      <ProfileFormItem label="Department" value={user.department} icon={<TeamOutlined />} />
      <ProfileFormItem label="Personal Phone" value={user.personalPhone} icon={<PhoneOutlined />} />
      <ProfileFormItem label="Joining Date" value={user.joiningDate} icon={<CalendarOutlined />} />
      <ProfileFormItem label="Address" value={user.address} icon={<HomeOutlined />} />
    </Form>
  </Card>
);

const styles = {
  card: {
    marginBottom: 20,
    // marginTop: -35,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  avatarCol: {
    textAlign: "center",
    marginBottom: 5,
  },
};

export default UserProfile;
