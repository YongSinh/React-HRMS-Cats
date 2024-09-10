import React, { useState } from "react";
import {
  Dropdown,
  Badge,
  Menu,
  Button,
  Modal,
  Form,
  List,
  Popconfirm,
  Typography,
  Empty,
  Divider,
  Upload,
} from "antd";
import {
  BellOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment"; // For formatting dates
const { Text } = Typography;

const NotificationMenu = ({
  notifications,
  unreadCount,
  onNotificationClick,
  onManageNotifications,
  onAddNotification,
  onEditNotification,
  onDeleteNotification,
  notificationModalVisible,
  setNotificationModalVisible,
  notificationForm,
  isEditing,
  setIsEditing,
  editingKey,
  setEditingKey,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload by Ant Design
  };

  const handleNotificationClick = (key) => {
    const notification = notifications.find((item) => item.key === key);
    if (notification) {
      setSelectedNotification(notification);
      setDetailModalVisible(true);
      onNotificationClick(key); // Mark as read or perform other actions
    }
  };

  const notificationMenu = (
    <div>
      <div style={styles.titleRow}>
        <Text style={styles.titleText}>Notifications</Text>
      </div>
      <div style={styles.menuContainer}>
        {notifications.length > 0 ? (
          <Menu style={styles.menu}>
            {notifications.map((item, index) => (
              <Menu.Item
                key={item.key}
                onClick={() => handleNotificationClick(item.key)}
                style={{
                  backgroundColor: item.read ? "#f9f9f9" : "#fff",
                  padding: "10px 15px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="Notification"
                    style={styles.notificationImage}
                  />
                )}
                <div style={{ marginLeft: item.image ? "10px" : "0" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.label }}
                    style={styles.notificationLabel}
                  />
                  <Text style={styles.timestamp}>
                    {moment(item.timestamp).fromNow()}
                  </Text>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <div style={styles.emptyContainer}>
            <Empty description="No Notifications" />
          </div>
        )}
      </div>
    </div>
  );

  const editorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: { matchVisual: false },
  };

  const editorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <Dropdown
        overlay={notificationMenu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Badge
          count={unreadCount}
          overflowCount={99}
          style={styles.notificationBadge}
        >
          <BellOutlined style={styles.notificationIcon} />
        </Badge>
      </Dropdown>

      {/* Add/Edit Notification Modal */}
      <Modal
        title={isEditing ? "Edit Notification" : "Add Notification"}
        visible={notificationModalVisible}
        onCancel={() => {
          setNotificationModalVisible(false);
          setIsEditing(false);
          setEditingKey(null);
          setUploadedImage(null); // Reset uploaded image on cancel
          notificationForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={notificationForm}
          onFinish={(values) => {
            const newNotification = {
              ...values,
              label: values.notificationText,
              image: uploadedImage, // Pass the uploaded image
              key: editingKey || Date.now(), // Use existing key or create a new one
              timestamp: Date.now(), // Set the current timestamp
              read: false, // Set as unread by default
            };
            if (isEditing) {
              onEditNotification(newNotification);
            } else {
              onAddNotification(newNotification);
            }
            setUploadedImage(null); // Reset the uploaded image after adding
            setNotificationModalVisible(false); // Close modal after submission
            notificationForm.resetFields();
          }}
          layout="vertical"
          initialValues={{ notificationText: "" }}
        >
          <Form.Item
            label="Notification Text"
            name="notificationText"
            rules={[
              { required: true, message: "Please enter a notification!" },
            ]}
          >
            <ReactQuill
              theme="snow"
              modules={editorModules}
              formats={editorFormats}
            />
          </Form.Item>
          <Form.Item label="Notification Image">
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={styles.uploadedImagePreview}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Submit"}
            </Button>
            <Button
              onClick={() => {
                setNotificationModalVisible(false);
                setIsEditing(false);
                setEditingKey(null);
                setUploadedImage(null); // Reset uploaded image on cancel
                notificationForm.resetFields();
              }}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsEditing(true);
                    setEditingKey(item.key);
                    setNotificationModalVisible(true);
                    notificationForm.setFieldsValue({
                      notificationText: item.label,
                    });
                    setUploadedImage(item.image || null); // Set the image for editing
                  }}
                />,
                <Popconfirm
                  title="Are you sure you want to delete this notification?"
                  onConfirm={() => onDeleteNotification(item.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>,
              ]}
              onClick={() => handleNotificationClick(item.key)}
              style={{
                cursor: "pointer",
                backgroundColor: item.read ? "#f9f9f9" : "#fff",
                padding: "10px 15px",
              }}
            >
              <List.Item.Meta
                avatar={
                  item.image && (
                    <img
                      src={item.image}
                      alt="Notification"
                      style={styles.listNotificationImage}
                    />
                  )
                }
                title={
                  <div
                    dangerouslySetInnerHTML={{ __html: item.label }}
                    style={styles.notificationLabel}
                  />
                }
                description={
                  <Text style={styles.timestamp}>
                    {moment(item.timestamp).fromNow()}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <Modal
          visible={detailModalVisible}
          title="Notification Details"
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
          ]}
          onCancel={() => setDetailModalVisible(false)}
        >
          <div>
            {selectedNotification.image && (
              <img
                src={selectedNotification.image}
                alt="Notification"
                style={styles.detailImage}
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: selectedNotification.label }}
              style={styles.detailText}
            />
            <Text style={styles.detailTimestamp}>
              {moment(selectedNotification.timestamp).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationMenu;

const styles = {
  titleText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  titleRow: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    borderBottom: "1px solid #f0f0f0",
    borderRadius: "8px 8px 0 0",
  },
  notificationBadge: {
    backgroundColor: "#ff4d4f",
    marginRight: "12px",
    boxShadow: "0 0 0 1px #d9d9d9 inset",
  },
  notificationIcon: {
    fontSize: "26px",
    color: "#f0f2f5",
    cursor: "pointer",
    marginRight: "18px",
  },
  menuContainer: {
    maxHeight: "500px",
    overflowY: "auto",
    minWidth: "350px",
  },
  menu: {
    border: "none",
  },
  notificationImage: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  notificationLabel: {
    fontSize: "14px",
    color: "#000",
    marginBottom: "4px",
  },
  timestamp: {
    fontSize: "12px",
    color: "#8c8c8c",
  },
  uploadedImagePreview: {
    width: "100%",
    height: "auto",
    marginTop: "10px",
    borderRadius: "4px",
  },
  emptyContainer: {
    padding: "40px 0",
    textAlign: "center",
  },
  listNotificationImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  detailImage: {
    width: "100%",
    height: "auto",
    marginBottom: "16px",
    borderRadius: "4px",
  },
  detailText: {
    fontSize: "14px",
    color: "#000",
    marginBottom: "8px",
  },
  detailTimestamp: {
    fontSize: "12px",
    color: "#8c8c8c",
  },
};
