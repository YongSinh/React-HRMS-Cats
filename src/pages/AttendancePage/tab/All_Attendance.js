import React, { useState } from "react";
import { EyeFilled, DeleteOutlined,EditFilled} from "@ant-design/icons";
import { Select, Table, Tag, Space, Button } from "antd";
const columns =[ 

{
    title: "ID",
    dataIndex: "ID",
    render: (_, { ID }) => {
      return (
        <>
          <div>
            <text style={{ fontSize: 13}} >
              {ID}
            </text>
          </div>
        </>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "age",
  },
  {
    title:"Department"

  },
  {
    title: "Position",
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (_, { Status }) => {
      let color = "green";
      return (
        <>
          <div>
            <Tag style={{ fontSize: 13 }} color={color}>
              {Status}
            </Tag>
          </div>
        </>
      );
    },
  },
  {
    title: "Remark",
  },
  {
    title: "Action",
    key: "Action",
    render: (_, ) => (
      <Space>
        <Button icon={<EyeFilled />} />
        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },

   
];

const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    Status: `Active`,
    ID: `001${i}`,
  });
}
const All_Attendance = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  //Selett Position //
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Select 
        showSearch
        style={{ marginBottom: 15, marginTop: 7}}
        placeholder="Select Position"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
      
      <Table  rowSelection={rowSelection } columns={columns} dataSource={data} />
    </>
  );
};
export default All_Attendance;
