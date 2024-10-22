import {
  Table,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";

const SpecialAbilityView = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpSpecialAbility();
  }, []);

  const getEmpSpecialAbility = () => {
    setLoading(true);
    request(
      "info/specialAbility/getListSpecialAbilityByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        setLoading(false);
        var result = res.data;
        setData(result);
      }
    });
  };


  const columns = [
    {
      title: "Foreign Languages",
      dataIndex: "foreignLanguages",
      key: "foreignLanguages",
    },
    {
      title: "Speaking",
      dataIndex: "speaking",
      key: "speaking",
    },
    {
      title: "Listening",
      dataIndex: "listening",
      key: "listening",
    },
    {
      title: "Writing",
      dataIndex: "writing",
      key: "writing",
    },
    {
      title: "Reading",
      dataIndex: "reading",
      key: "reading",
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

export default SpecialAbilityView;
