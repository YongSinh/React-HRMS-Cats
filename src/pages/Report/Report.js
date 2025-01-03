import React, { useState, useCallback, useEffect } from "react";
import {
  Space,
  Table,
  Button,
} from "antd";
import dayjs from "dayjs";
import {
  DownloadOutlined,
} from "@ant-design/icons";
import { isEmptyOrNull } from "../../share/helper";
import { request, config } from "../../share/request";
import getColumnSearchProps from "../../share/ColumnSearchProps";
function Report({ activeKey }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
    },
    {
      title: "Ref No",
      dataIndex: "ref_no",
      key: "ref_no",
    },
    {
      title: "Payment Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Allownace",
      dataIndex: "allowances",
      key: "allowances",
    },
    {
      title: "Allownace Amount",
      dataIndex: "total_allowances",
      key: "total_allowances",
    },
    {
      title: "Deductios",
      dataIndex: "deductions",
      key: "deductions",
    },
    {
      title: "Deduction Amount",
      dataIndex: "total_deductions",
      key: "total_deductions",
    },
    {
      title: "tax Rate",
      dataIndex: "tax_rate",
      key: "tax_rate",
      render: (text) => `${text * 100}%`,
    },
    {
      title: "total Earning",
      dataIndex: "total_earning",
      key: "ntotal_earninget",
    },

    {
      title: "Net Pay",
      dataIndex: "net",
      key: "net",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleDownloadFile(record)}
            type="primary"
            icon={<DownloadOutlined />}
          />
        </Space>
      ),
    },
  ];
  const getList = () => {
    setLoading(true);
    request("payrolls/payslips/report", "get", {}).then((res) => {
      if (res) {
        setData(res.data);
        setLoading(false);
        //console.log(res.data);
      }
    });
  };
  const handleDownloadFile = (value) => {
    setLoading(true);
    var url =
      config.base_server + "payrolls/v2/report/payslip?refNo=" + value.ref_no;
    request("payrolls/v2/report/payslip?refNo=" + value.ref_no, "get", {}).then(
      (res) => {
        if (res) {
          setLoading(false);
          window.open(url, "_blank");
        }
      }
    );
  };
  useEffect(() => {
    if (activeKey === "1") {
      getList(); // Only fetch data when this tab is active
    }
  }, [activeKey]);

  return (
    <>
      <Table
        scroll={{
          x: "max-content",
        }}
        columns={columns}
        loading={loading}
        //pagination={false}
        dataSource={data}
      />
    </>
  );
}

export default Report;
