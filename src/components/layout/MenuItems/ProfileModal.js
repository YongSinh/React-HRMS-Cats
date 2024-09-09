import React, { useState } from "react";
import {
  Avatar,
  Modal,
  Descriptions,
  Button,
  Form,
  Input,
  Upload,
  message,
  Spin,
} from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import profileImage from "../../../asset/image/Untitled design (3).png";

const ProfileModal = ({ visible, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage);
  const [profileData, setProfileData] = useState({
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    address: "1234 Main St, Anytown, USA",
    bio: "Software Developer with a passion for creating amazing user experiences.",
  });

  const handleSaveProfile = (values) => {
    setProfileData(values);
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
        onSuccess();
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

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onClose}
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
                  style={styles.uploadButton}
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
          {!editMode && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={styles.editButton}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
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
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
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
              <span style={styles.descriptionContent}>{profileData.email}</span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span style={styles.descriptionLabel}>Phone Number</span>}
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

        {/* <Button type="link" onClick={onClose} style={styles.closeButton}>
          Close
        </Button> */}
      </div>
    </Modal>
  );
};

export default ProfileModal;

const styles = {
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hideCloseButton: { display: "none" },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  }, // Centering the profile header
  avatar: {
    marginTop: "10px",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "10px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  nameprofile: {
    margin: "0",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  department: {
    margin: "0",
    fontSize: "16px",
    color: "#080bff",
    textAlign: "center",
  },
  descriptions: {
    width: "100%",
    padding: "20px",
    marginTop: "auto",
    borderRadius: "10px",
  },
  descriptionLabel: { fontWeight: "bold", color: "#555", marginRight: "10px" },
  descriptionContent: { color: "#888" },
  editButton: { marginTop: "8px" },
  closeButton: { marginTop: "20px", color: "#ff4334", border: "none" },
  uploadButton: {
    marginTop: "10px",
    background:
      "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,205,1) 100%)",
    color: "#fff",
  },
};
