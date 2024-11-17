import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Select,
  Image,
  Spin,
} from "antd";
import { request } from "../../../share/request";
import { isEmptyOrNull } from "../../../share/helper";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Title } = Typography;
const picture = require("../../../asset/image/missing-picture.jpg");
const PersonalDetailFormView = ({ activeKey, id }) => {
  const [form] = Form.useForm();
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [position2, setPosition2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileIforId] = useState("");
  const [empInfor, setEmpInfor] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(picture);
  const getListDep = () => {
    setLoading(true);
    request("info/department/department", "get", {}).then((res) => {
      if (res) {
        //console.log(res.data);
        const arrTmpP = res.data.map((dep) => ({
          label: dep.depName,
          value: dep.depId,
        }));
        setLoading(false);
        setDepartment(arrTmpP);
      }
    });
  };

  const onChangePos = (value) => {
    if (!isEmptyOrNull(value)) {
      const result = position2.find((item) => item.id === value);
      form.setFieldsValue({
        section: result.poSection,
        mangerId: result.poLevel,
      });
    }
  };

  const onchangeDep = (value) => {
    getListPos(value);
  };

  const getListFile = (date) => {
    request(
      `files/ByEmIdAndTypeServiceDate?emId=${id}&type=1&date=${date}&service=1`,
      "get",
      {}
    ).then((res) => {
      if (res) {
        if (res.length !== 0) {
          setFileIforId(res[0].fileId);
          setPreviewImage(res[0].url);
        }
        //setData(res);
      }
    });
  };

  const getListPos = (value) => {
    if (!isEmptyOrNull(value)) {
      setLoading(true);
      request(
        "info/position/getPositionByDepId?depId=" + value,
        "get",
        {}
      ).then((res) => {
        if (res) {
          const arrTmpP = res.data.map((dep) => ({
            label: dep.posName,
            value: dep.id,
          }));
          setPosition(arrTmpP);
          setPosition2(res.data);
          setLoading(false);
        }
      });
    }
  };

  const getEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmployeeById/" + id, "get", {}).then((res) => {
      if (res) {
        //console.log(res.data);
        setLoading(false);
        var result = res.data;
        setEmpInfor(result);
      }
    });
  };

  useEffect(() => {
    getEmpInfo();
    getListDep(); // Only fetch data when this tab is active
  }, [activeKey]);

  useEffect(() => {
    if (empInfor) {
      const departmentMatch = department.find(
        (item) => item.label === empInfor.depId
      );
      if (departmentMatch && !isEmptyOrNull(departmentMatch.value)) {
        console.log(departmentMatch);
        getListPos(departmentMatch.value);
      }
      getListFile(empInfor.empDate);
      // Setting form fields based on empInfor
      form.setFieldsValue({
        empId: empInfor.empId,
        firstName: empInfor.firstName,
        lastName: empInfor.lastName,
        email: empInfor.email,
        phone: empInfor.phone,
        birthDate: empInfor.birthDate ? dayjs(empInfor.birthDate) : null,
        placeOfBirth: empInfor.placeOfBirth,
        age: empInfor.age,
        gender: empInfor.sex,
        height: empInfor.height,
        address: empInfor.address,
        empDate: empInfor.empDate ? dayjs(empInfor.empDate) : null,
        joinDate: empInfor.joinDate ? dayjs(empInfor.joinDate) : null,
        mangerId: empInfor.mangerId,
        location: empInfor.location,
        maritalStats: empInfor.maritalStats,
        nationality: empInfor.nationality,
        workType: empInfor.workType,
        religion: empInfor.religion,
        idCard: empInfor.idCard,
        passportId: empInfor.passportId,
        remark: empInfor.remark,
        govOfficer: empInfor.govOfficer,
        govTel: empInfor.govTel,
        govAddress: empInfor.govAddress,
        govPosition: empInfor.govPosition,
        department: empInfor.depId,
        position: empInfor.posId,
        weight: empInfor.weight,
        section: empInfor.section,
      });
    }
  }, [empInfor]);

  return (
    <>
      <Spin spinning={loading} tip="Loading" size="middle">
        <Title level={4}>Personal Imformation:</Title>
        <Form
          name="basic"
          initialValues={{
            status: 1,
          }}
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            //onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={20}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="empId"
                    label="Employee ID"
                    rules={[
                      {
                        required: true,
                        message: "Please input the employee ID!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Employee ID!" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the first name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Last Name!",
                      },
                    ]}
                  >
                    <Input placeholder="E.g., Doe" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Please input the age!",
                      },
                    ]}
                  >
                    <Input placeholder="E.g., 19" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input the gender!",
                      },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Marital Stats"
                    name="maritalStats"
                    rules={[
                      {
                        required: true,
                        message: "Please input the marital stats!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a Marital Stats"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "Single",
                          label: "Single",
                        },
                        {
                          value: "Married",
                          label: "Married",
                        },
                        {
                          value: "Separated",
                          label: "Separated",
                        },
                        {
                          value: "Divorced",
                          label: "Divorced",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={4}
            style={{textAlign:"center"}}>
              <Image
                width={140}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible,
                }}
                src={previewImage}
              />
            </Col>

            <Col span={8}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input the phone!",
                  },
                ]}
              >
                <Input placeholder="E.g., +1 234 567 890" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input the Email!",
                  },
                ]}
              >
                <Input placeholder="E.g., john.doe@example.com" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="workType"
                label="Work Type"
                rules={[
                  {
                    required: true,
                    message: "Please input the employeeID!",
                  },
                ]}
              >
                <Input placeholder="E.g., Full-time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="location"
                label="Working Site"
                rules={[
                  {
                    required: true,
                    message: "Please input Working Site!",
                  },
                ]}
              >
                <Input placeholder="E.g., New York Office" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please select Department!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Department"
                  optionFilterProp="label"
                  options={department}
                  onChange={onchangeDep}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="position"
                label="Position"
                rules={[
                  {
                    required: true,
                    message: "Please select Position!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Position"
                  optionFilterProp="label"
                  options={position}
                  allowClear
                  onChange={onChangePos}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="mangerId"
                label="Position Level"
                rules={[
                  {
                    required: true,
                    message: "Please input Position Level!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="section" label="Section">
                <Input placeholder="E.g., HR" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[
                  {
                    required: true,
                    message: "Please select Start Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Start Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="empDate"
                label="End Date"
                rules={[
                  {
                    required: true,
                    message: "Please select Stop Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Stop Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input Address!",
                  },
                ]}
              >
                <Input placeholder="E.g., 123 Main St" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="birthDate"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please select Date of Birth!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Date of Birth"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="height" label="Height (cm)">
                <Input placeholder="E.g., 180" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="weight" label="Weight (kg)">
                <Input placeholder="E.g., 75" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[
                  {
                    required: true,
                    message: "Please input Nationality!",
                  },
                ]}
              >
                <Input placeholder="E.g., American" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="religion"
                label="Religion"
                rules={[
                  {
                    required: true,
                    message: "Please input Religion!",
                  },
                ]}
              >
                <Input placeholder="E.g., Christian" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="placeOfBirth"
                label="Place of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please input Place of Birth!",
                  },
                ]}
              >
                <Input placeholder="E.g., New York" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCardNo" label="ID Card No.">
                <Input placeholder="E.g., 123456789" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="passportId" label="Passport ID">
                <Input placeholder="E.g., P12345678" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="remark" label="remark">
                <TextArea placeholder="Remark" autoSize />
              </Form.Item>
            </Col>
          </Row>
          <Divider variant="dashed" dashed>
            Government Officer
          </Divider>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item name="govOfficer" label="Government Officer">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="govPosition" label="Position">
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item name="govAddress" label="Address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="govTel" label="Tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export default PersonalDetailFormView;
