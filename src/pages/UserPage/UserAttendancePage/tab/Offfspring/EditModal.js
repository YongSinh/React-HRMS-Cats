import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker, TimePicker, message } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const EditModal = ({ visible, record, onClose, setData, setFilteredData }) => {
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    if (record) {
      setEditValues({
        ...record,
        rangeDate: record.age.split(" - ").map((date) =>
          moment(date, "YYYY-MM-DD")
        ),
        timeIn: moment(record.timeIn, "hh:mm A"),
        timeOut: moment(record.timeOut, "hh:mm A"),
      });
    }
  }, [record]);

  const handleInputChange = (field, value) => {
    setEditValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleEdit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === record.key ? { ...item, ...editValues } : item
      )
    );
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.key === record.key ? { ...item, ...editValues } : item
      )
    );
    message.success("Record updated successfully!");
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onOk={handleEdit}
      onCancel={onClose}
      okText="Save"
    >
      <Input
        value={editValues.ID}
        onChange={(e) => handleInputChange("ID", e.target.value)}
        placeholder="Enter new ID"
        style={{ marginBottom: 8 }}
      />
      <Input
        value={editValues.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        placeholder="Enter new name"
        style={{ marginBottom: 8 }}
      />
      <RangePicker
        value={editValues.rangeDate}
        onChange={(dates, dateStrings) =>
          handleInputChange("age", `${dateStrings[0]} - ${dateStrings[1]}`)
        }
        format="YYYY-MM-DD"
        style={{ marginBottom: 8, width: "100%" }}
      />
      <TimePicker
        value={editValues.timeIn}
        onChange={(time, timeString) =>
          handleInputChange("timeIn", timeString)
        }
        format="hh:mm A"
        use12Hours
        style={{ marginBottom: 8, width: "100%" }}
      />
      <TimePicker
        value={editValues.timeOut}
        onChange={(time, timeString) =>
          handleInputChange("timeOut", timeString)
        }
        format="hh:mm A"
        use12Hours
        style={{ marginBottom: 8, width: "100%" }}
      />
      <Input
        value={editValues.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Enter new description"
        style={{ marginBottom: 8 }}
      />
      <Input
        value={editValues.position}
        onChange={(e) => handleInputChange("position", e.target.value)}
        placeholder="Enter new position"
        style={{ marginBottom: 8 }}
      />
      <Input
        value={editValues.Status}
        onChange={(e) => handleInputChange("Status", e.target.value)}
        placeholder="Enter new status"
        style={{ marginBottom: 8 }}
      />
      <Input
        value={editValues.remark}
        onChange={(e) => handleInputChange("remark", e.target.value)}
        placeholder="Enter new remark"
      />
    </Modal>
  );
};

export default EditModal;
