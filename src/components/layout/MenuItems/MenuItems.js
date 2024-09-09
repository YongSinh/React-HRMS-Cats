import React, { useState } from "react";
import {
  Avatar,
  Menu,
  Dropdown,
  Typography,
  notification,
  Form,
  message,
} from "antd";
import {
  UserOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import ProfileModal from "./ProfileModal";
import SettingsDrawer from "./SettingsDrawer";
import NotificationMenu from "./NotificationMenu";
import profileImage from "..//..//../asset/image/Untitled design (3).png";

const { Text } = Typography;

const MenuItems = ({ darkMode, toggleDarkMode }) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [notifications, setNotifications] = useState([
    {
      key: "1",
      label: "<p><strong>Notification 1</strong></p>",
      read: false,
      timestamp: new Date(),
    },
    {
      key: "2",
      label: "<p><em>Notification 2</em></p>",
      read: false,
      timestamp: new Date(),
    },
    {
      key: "3",
      label: "<p><u>Notification 3</u></p>",
      read: false,
      timestamp: new Date(),
    },
    {
      key: "4",
      label: "<p><strike>Notification 4</strike></p>",
      read: false,
      timestamp: new Date(),
    },
    {
      key: "5",
      label: "<p>Notification 5</p>",
      read: false,
      timestamp: new Date(),
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  // Define the form instance
  const [notificationForm] = Form.useForm();

  const handleMenuClick = (e) => {
    if (e.key === "settings") {
      setSettingsVisible(true);
    } else if (e.key === "logout") {
      console.log("Logging out...");
    } else if (e.key === "profile") {
      setProfileVisible(true);
    }
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

  const handleAddNotification = (values) => {
    const text = values.notificationText;
    const timestamp = new Date().toISOString(); // Get the current timestamp

    if (isEditing && editingKey) {
      const updatedNotifications = notifications.map((item) =>
        item.key === editingKey ? { ...item, label: text, timestamp } : item
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
        timestamp, // Add timestamp to new notification
      };
      setNotifications([...notifications, newNotification]);
      setUnreadCount(unreadCount + 1);

      // Show pop-up notification
      notification.open({
        message: "New Notification",
        description: <div dangerouslySetInnerHTML={{ __html: text }} />,
        placement: "topRight",
        icon: <BellOutlined style={{ color: "#108ee9" }} />,
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
      notificationForm.setFieldsValue({
        notificationText: notificationToEdit.label,
      });
      setNotificationModalVisible(true);
    }
  };

  const handleDeleteNotification = (key) => {
    const updatedNotifications = notifications.filter(
      (item) => item.key !== key
    );
    setNotifications(updatedNotifications);
    if (!notifications.find((item) => item.key === key)?.read) {
      setUnreadCount(unreadCount - 1);
    }
    message.success("Notification deleted successfully.");
  };

  const handleManageNotifications = () => {
    setNotificationModalVisible(true);
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

  return (
    <div style={styles.profileContainer}>
      <NotificationMenu
        notifications={notifications}
        unreadCount={unreadCount}
        onNotificationClick={handleNotificationClick}
        onManageNotifications={handleManageNotifications}
        onAddNotification={handleAddNotification}
        onEditNotification={handleEditNotification}
        onDeleteNotification={handleDeleteNotification}
        notificationModalVisible={notificationModalVisible}
        setNotificationModalVisible={setNotificationModalVisible}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        notificationForm={notificationForm} // Pass the form instance to NotificationMenu
      />
      <Avatar
        style={styles.avatarHeader}
        src={profileImage}
        alt="User Avatar"
        size="large"
        onClick={() => setProfileVisible(true)}
      />
      <Text style={styles.name}>Y ChanThon</Text>
      <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
        <DownOutlined style={styles.dropdownIcon} />
      </Dropdown>
      <ProfileModal
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
      />
      <SettingsDrawer
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        openNotificationModal={handleManageNotifications}
      />
    </div>
  );
};

export default MenuItems;

const styles = {
  name: {
    margin: "0",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
  },
  profileContainer: { display: "flex", alignItems: "center" },
  avatarHeader: {
    width: "50px",
    height: "50px",
    backgroundColor: "#fff",
    marginRight: "10px",
    cursor: "pointer",
  },
  dropdownIcon: { fontSize: "18px", color: "#f0f2f5", margin: "8px" },
};
