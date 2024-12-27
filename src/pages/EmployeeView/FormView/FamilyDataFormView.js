import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  Select,
  Table,
  Spin,
  Popconfirm,
} from "antd";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const FamilyDataFormView = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [familyData, setFamilyDate] = useState("");
  const [editFamData, setEditFamData] = useState(false);
  const [editSibling, setEditSibling] = useState(true);

  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpFamilyData();
    getEmpSiblingData();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Marital Stats",
      dataIndex: "maritalStats",
      key: "maritalStats",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Office",
      dataIndex: "office",
      key: "office",
    },
  ];

  const columns2 = [
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Father Phone",
      dataIndex: "fatherPhoneNum",
      key: "fatherPhoneNum",
    },
    {
      title: "Father Occupation",
      dataIndex: "fatherOccupation",
      key: "fatherOccupation",
    },
    {
      title: "Father Address",
      dataIndex: "motherAddress",
      key: "motherAddress",
    },
    {
      title: "Mother Name",
      dataIndex: "motherName",
      key: "motherName",
    },
    {
      title: "Mother Phone",
      dataIndex: "motherPhoneNum",
      key: "motherPhoneNum",
    },
    {
      title: "Mother Occupation",
      dataIndex: "motherOccupation",
      key: "motherOccupation",
    },
    {
      title: "Mother Address",
      dataIndex: "motherAddress",
      key: "fatherAddress",
    },
   
   
  ];


  const getEmpFamilyData = () => {
    setLoading(true);
    request(
      "info/familyData/getListFamilyDataByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        setFamilyDate(result);
        isEmptyOrNull(result) ? setEditFamData(true) : setEditFamData(false);
        if (!isEmptyOrNull(result)) {
          form.setFieldsValue({
            fatherName: result.fatherName,
            fatherAddress: result.fatherAddress,
            fatherOccupation: result.fatherOccupation,
            fatherPhone: result.fatherPhoneNum,
            motherName: result.motherName,
            motherAddress: result.motherAddress,
            motherOccupation: result.motherOccupation,
            motherPhone: result.motherPhoneNum,
          });
        }
      }
    });
  };

  const getEmpSiblingData = () => {
    setLoading(true);
    request(
      "info/siblingData/getListSiblingDataByEmId?emId=" + id,
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




  return (
    <>
      <Spin spinning={loading}>
        {/* <Title level={4}>Family Information</Title> */}
        {/* <Form
          name="basic"
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            //onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="fatherName" label="Father's Name">
                <Input placeholder="Enter Father's Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fatherOccupation" label="Father's Occupation">
                <Input placeholder="Enter Father's Occupation" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="fatherAddress"
                label="Father's Permanent Address"
              >
                <Input placeholder="Enter Father's Permanent Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fatherPhone" label="Father's Phone Number">
                <Input placeholder="Enter Father's Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherName" label="Mother's Name">
                <Input placeholder="Enter Mother's Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherOccupation" label="Mother's Occupation">
                <Input placeholder="Enter Mother's Occupation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="motherAddress"
                label="Mother's Permanent Address"
              >
                <Input placeholder="Enter Mother's Permanent Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherPhone" label="Mother's Phone Number">
                <Input placeholder="Enter Mother's Phone Number" />
              </Form.Item>
            </Col>
          </Row>
        </Form> */}
         <Table pagination={false} dataSource={[familyData]} columns={columns2} />
        <Divider>Sibling Information</Divider>
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default FamilyDataFormView;
