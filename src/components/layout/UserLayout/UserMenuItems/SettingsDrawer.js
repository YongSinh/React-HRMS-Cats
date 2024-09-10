import React from "react";
import { Drawer, Switch, Button } from "antd";

const SettingsDrawer = ({
  visible,
  onClose,
  darkMode,
  toggleDarkMode,
  openNotificationModal,
}) => (
  <Drawer
    title="Settings"
    width={236}
    placement="right"
    onClose={onClose}
    visible={visible}
    bodyStyle={styles.settingsDrawerBody}
    headerStyle={styles.settingsDrawerHeader}
  >
    <div style={styles.settingItem}>
      <span style={styles.darkModeS}>Dark Mode</span>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
    </div>
    {/* <Button
      type="primary"
      onClick={openNotificationModal}
      style={{ marginTop: "10px" }}
    >
      Manage Notifications
    </Button> */}
  </Drawer>
);

export default SettingsDrawer;

const styles = {
  darkModeS: {
    // color: "#f0f2f5",
    fontWeight: "bold",
    marginRight: "auto",
  },
  settingsDrawerHeader: {
    padding: "19.5px",
    backgroundColor: "#001529",
    color: "#fff",
  },
  settingItem: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    marginBottom: "5px",
  },
};
