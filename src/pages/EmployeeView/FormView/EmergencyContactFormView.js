import {
  Table,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";

const EmergencyContactFormView = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getEmpContact = () => {
    setLoading(true);
    request("info/emergencyContact/ByEmId?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setLoading(false);
          var result = res.data;
          setData(result);
        }
      }
    );
  };


  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpContact();
  }, []);


  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Office Address",
      dataIndex: "officeAddress",
      key: "officeAddress",
    },
    {
      title: "Office Tel",
      dataIndex: "officeTel",
      key: "officeTel",
    },

  ];


  return (
    <>
      <Spin spinning={loading}>
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default EmergencyContactFormView;
