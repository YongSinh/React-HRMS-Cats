import { Table, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
const EducationFormView = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpEdu();
  }, []);

  const getEmpEdu = () => {
    setLoading(true);
    request("info/education/getListEducationByEmId?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          console.log(res.data);
          setLoading(false);
          var result = res.data;
          setData(result);
        }
      }
    );
  };

  const columns = [
    {
      title: "Institution",
      dataIndex: "eduInstitution",
      key: "eduInstitution",
    },
    {
      title: "Level",
      dataIndex: "eduLevel",
      key: "eduLevel",
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
    },
    {
      title: "Year End",
      dataIndex: "yearEnd",
      key: "yearEnd",
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

export default EducationFormView;
