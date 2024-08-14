import React, { useState } from "react";
import {
  Spin,
  Avatar,
  Menu,
  Dropdown,
  Typography,
  Modal,
  Descriptions,
  Switch,
  Badge,
  Drawer,
  Button,
  Space,
  Form,
  Input,
  Upload,
  message,
  notification,
  List,
  Popconfirm,
} from "antd";
import {
  UserOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  EditOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import profileImage from "../../asset/image/Untitled design (3).png";

const { Text } = Typography;

const UserProfile = ({ darkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [profileData, setProfileData] = useState({
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    address: "1234 Main St, Anytown, USA",
    bio: "Software Developer with a passion for creating amazing user experiences.",
  });
  const [notifications, setNotifications] = useState([
    { key: "1", label: "<p><strong>Notification 1</strong></p>", read: false },
    { key: "2", label: "<p><em>Notification 2</em></p>", read: false },
    { key: "3", label: "<p><u>Notification 3</u></p>", read: false },
    { key: "4", label: "<p><strike>Notification 4</strike></p>", read: false },
    { key: "5", label: "<p>Notification 5</p>", read: false },

  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage);

  const handleMenuClick = (e) => {
    if (e.key === "settings") {
      setSettingsVisible(true);
    } else if (e.key === "logout") {
      console.log("Logging out...");
    } else if (e.key === "profile") {
      setProfileVisible(true);
    }
  };

  const handleCloseProfile = () => {
    setProfileVisible(false);
    setIsEditing(false); // Exit edit mode when closing
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };
  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = (values) => {
    setProfileData(values);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleImageUpload = async (options) => {
    const { onSuccess, onError, file } = options;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
         "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  
        {
          method: "POST",
          headers: {
            authorization: "authorization-text",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
        setProfileImageUrl(URL.createObjectURL(file));
        message.success("Profile image updated successfully.");
      } else {
        onError(new Error("Failed to upload image."));
        message.error("Failed to upload image.");
      }
    } catch (error) {
      onError(error);
      message.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleAddNotification = (values) => {
    const text = values.notificationText;
    if (isEditing && editingKey) {
      const updatedNotifications = notifications.map((item) =>
        item.key === editingKey
          ? { ...item, label: text }
          : item
      );
      setNotifications(updatedNotifications);
      setIsEditing(false);
      setEditingKey(null);
      notification.success({
        message: "Notification Updated",
        description: "The notification has been updated successfully.",
        placement: "topRight",
      });
    } else {
      const newNotification = {
        key: (notifications.length + 1).toString(),
        label: text,
        read: false,
      };
      setNotifications([...notifications, newNotification]);
      setUnreadCount(unreadCount + 1);
      
      // Show pop-up notification
      notification.open({
        message: 'New Notification',
        description: <div dangerouslySetInnerHTML={{ __html: text }} />,
        placement: "topRight",
        icon: <BellOutlined style={{ color: '#108ee9' }} />,
      });
    }
    notificationForm.resetFields(); // Reset the form after submission
    setNotificationModalVisible(false);
  };

  const handleEditNotification = (key) => {
    const notificationToEdit = notifications.find((item) => item.key === key);
    if (notificationToEdit) {
      setIsEditing(true);
      setEditingKey(key);
      notificationForm.setFieldsValue({ notificationText: notificationToEdit.label });
      setNotificationModalVisible(true);
    }
  };

  const handleDeleteNotification = (key) => {
    const updatedNotifications = notifications.filter((item) => item.key !== key);
    setNotifications(updatedNotifications);
    if (!notifications.find((item) => item.key === key)?.read) {
      setUnreadCount(unreadCount - 1);
    }
    message.success("Notification deleted successfully.");
  };

  const handleNotificationClick = (key) => {
    const clickedNotification = notifications.find((item) => item.key === key);

    if (!clickedNotification.read) {
      const updatedNotifications = notifications.map((item) =>
        item.key === key ? { ...item, read: true } : item
      );
      setNotifications(updatedNotifications);
      setUnreadCount(unreadCount - 1);
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu>
      {notifications.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => handleNotificationClick(item.key)}
          style={{ backgroundColor: item.read ? "#f0f0f0" : "#fff" }}
        >
          <div dangerouslySetInnerHTML={{ __html: item.label }} />
        </Menu.Item>
      ))}
    </Menu>
  );

   // Quill editor modules configuration
   const editorModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    },
  };

  // Quill editor formats configuration
  const editorFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  return (
    <div style={styles.profileContainer}>
      <Dropdown overlay={notificationMenu} trigger={["click"]}>
        <Badge
          count={unreadCount}
          overflowCount={99}
          style={styles.notificationBadge}
        >
          <BellOutlined style={styles.notificationIcon} />
        </Badge>
      </Dropdown>
      <Avatar
        style={styles.avatarHeader}
        src={profileImageUrl}
        alt="User Avatar"
        size="large"
        onClick={() => setProfileVisible(true)}
      />
      <Text style={styles.name}>Y ChanThon</Text>
      <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
        <DownOutlined style={styles.dropdownIcon} />
      </Dropdown>
      <Modal
        title={null}
        visible={profileVisible}
        onCancel={handleCloseProfile}
        footer={null}
        centered
        width={500}
        bodyStyle={styles.modalBody}
        closeIcon={<span style={styles.hideCloseButton}>X</span>}
      >
        <div style={styles.modalContent}>
          <div style={styles.profileHeader}>
            {editMode ? (
              <div style={{ textAlign: "center" }}>
                             <Upload
              name="file"
              showUploadList={false}
              customRequest={handleImageUpload}
             >
                     {profileImageUrl && (
                      <div style={{ marginTop: "20px" }}>
                        <img
                          src={profileImageUrl}
                          alt="Profile"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                <Button
          icon={loading ? <Spin /> : <UploadOutlined />}
          style={{
            background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,205,1) 100%)",
            borderColor: "#1890ff",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "5px",
          }}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
              </Upload>
             
              </div>
 
            ) : (
              <Avatar src={profileImageUrl} style={styles.avatar} size={120} />
            )}
            <h2 style={styles.nameprofile}>Y ChanThon</h2>
            <p style={styles.department}>Department</p>
          </div>
          {editMode ? (
            <Form
              form={form}
              initialValues={profileData}
              onFinish={handleSaveProfile}
              style={styles.form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Bio"
                name="bio"
                rules={[{ required: true, message: "Please input your bio!" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          ) : (
            <Descriptions
              title={null}
              layout="vertical"
              bordered={false}
              column={1}
              style={styles.descriptions}
            >
              <Descriptions.Item
                label={<span style={styles.descriptionLabel}>Email</span>}
              >
                <span style={styles.descriptionContent}>
                  {profileData.email}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={styles.descriptionLabel}>Phone Number</span>
                }
              >
                <span style={styles.descriptionContent}>
                  {profileData.phoneNumber}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={styles.descriptionLabel}>Address</span>}
              >
                <span style={styles.descriptionContent}>
                  {profileData.address}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={styles.descriptionLabel}>Bio</span>}
              >
                <span style={styles.descriptionContent}>{profileData.bio}</span>
              </Descriptions.Item>
            </Descriptions>
          )}
          {!editMode && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={styles.editButton}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          )}
          <Button
            type="link"
            onClick={handleCloseProfile}
            style={styles.closeButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      {/* Settings Drawer */}
      <Drawer
        title="Settings"
        width={236}
        placement="right"
        onClose={handleCloseSettings}
        visible={settingsVisible}
        bodyStyle={styles.settingsDrawerBody}
        headerStyle={styles.settingsDrawerHeader}
      >
        <div style={styles.settingItem}>
          <span style={styles.username}>Dark Mode</span>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
        <Button
          type="primary"
          onClick={() => setNotificationModalVisible(true)}
          style={{ marginTop: "10px" }}
        >
          Manage Notifications
        </Button>
      </Drawer>
             {/* Notification Modal */}
            <Modal
        title={isEditing ? "Edit Notification" : "Add Notification"}
        visible={notificationModalVisible}
        onCancel={() => {
          setNotificationModalVisible(false);
          setIsEditing(false);
          setEditingKey(null);
        }}
        footer={null}
      >
        <Form
          form={notificationForm}
          onFinish={handleAddNotification}
          layout="vertical"
          initialValues={{ notificationText: "" }}
        >
          <Form.Item
            label="Notification Text"
            name="notificationText"
            rules={[{ required: true, message: "Please enter a notification!" }]}
          >
            <ReactQuill
              theme="snow"
              modules={editorModules}
              formats={editorFormats}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Update" : "Add"}
              </Button>
              <Button
                onClick={() => {
                  setNotificationModalVisible(false);
                  setIsEditing(false);
                  setEditingKey(null);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEditNotification(item.key)}
                />,
                <Popconfirm
                  title="Are you sure you want to delete this notification?"
                  onConfirm={() => handleDeleteNotification(item.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>,
              ]}
              onClick={() => handleNotificationClick(item.key)}
              style={{ cursor: "pointer", backgroundColor: item.read ? "#f0f0f0" : "#fff" }}
            >
              <List.Item.Meta
                title={<div dangerouslySetInnerHTML={{ __html: item.label }} />}
                description={item.read ? "Read" : "Unread"}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

const styles = {
  avatarHeader1: {
    marginRight: "630px",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hideCloseButton: {
    display: "none",
  },

  profileContainer: {
    display: "flex",
    alignItems: "center",
  },
  dropdownIcon: {
    fontSize: "18px",
    display: "flex",
    color: "#f0f2f5",
    margin: "8px",
  },
  avatarHeader: {
    backgroundColor: "#fff",
    marginRight: "10px",
    cursor: "pointer",
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  settingsDrawerHeader: {
    padding: "19.5px",
    backgroundColor: "#001529",
    color: "#fff",
    borderRadius: "0",
  },
  username: {
    // color: "#f0f2f5",
    fontWeight: "bold",
    marginRight: "auto",
  },
  notificationBadge: {
    backgroundColor: "#ff4d4f",
    marginRight: "25px",
  },
  notificationIcon: {
    fontSize: "26px",
    color: "#f0f2f5",
    cursor: "pointer",
    marginRight: "35px",
  },
  settingItem: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    marginBottom: "5px",
  },
  modalBody: {
    padding: "8px",
    backgroundColor: "none",
    borderRadius: "8px",
    textAlign: "center",
  },
  profileHeader: {
    marginBottom: "20px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  name: {
    margin: "0",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
  },
  nameprofile: {
    margin: "0",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  department: {
    margin: "0",
    fontSize: "16px",
    color: "#080bff",
  },
  descriptions: {
    width: "100%",
    backgroundColor: "none",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginTop: "auto",
    // marginBottom: "80px",
  },
  descriptionLabel: {
    fontWeight: "bold",
    color: "#555",
    marginRight: "10px",
  },
  descriptionContent: {
    color: "#888",
  },
  editButton: {
    marginTop: "20px",
  },
  form: {
    width: "100%",
  },
  uploadButton: {
    marginTop: "10px",
  },
  closeButton: {
    marginTop: "20px",
    color: "#ff4334", // Ant Design primary color
    border: "none",
  },
};

export default UserProfile;