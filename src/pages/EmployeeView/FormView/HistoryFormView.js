import React, { useState, useEffect } from "react";
import {
  Form,
  Spin,
  Typography,
  Table,
} from "antd";
import { request } from "../../../share/request";
const { Title } = Typography;

const HistoryFormView = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
      getEmpHistory();
      getEmpInfo();
    // Retrieve employee ID from local storage when the component mounts
  }, []);


  const getEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmployeeById/" + id, "get", {}).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        form.setFieldsValue({
          name: result.firstName + " " + result.lastName,
        });
      }
    });
  };

  const getEmpHistory = () => {
    setLoading(true);
    request(
      "info/jobHistory/getListJobHistoryByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        setData(result);
      }
    });
  };

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

  ];

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <>
      <Spin spinning={loading} tip="Loading" size="middle">
        {/* <Title level={4}> History Imformation</Title> */}
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default HistoryFormView;
