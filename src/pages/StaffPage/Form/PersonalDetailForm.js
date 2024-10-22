import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Button,
  Space,
  Select,
  message,
  Image,
  Spin,
  Upload,
} from "antd";
import { request } from "../../../share/request";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { isEmptyOrNull } from "../../../share/helper";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Title } = Typography;
const { Dragger } = Upload;

const picture = require("../../../asset/image/missing-picture.jpg");
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PersonalDetailForm = ({ activeKey }) => {
  const [form] = Form.useForm();
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [position2, setPosition2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(picture);
  const formatDate = "YYYY-MM-DD";
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

  const getListPos = (value) => {
    setLoading(true);
    if (!isEmptyOrNull(value)) {
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
          console.log(res.data);
        }
      });
    }
  };

  useEffect(() => {
    if (activeKey === "1") {
      getListDep(); // Only fetch data when this tab is active
    }
  }, [activeKey]);

  const props = {
    name: "file",
    maxCount: 1,
    multiple: false, // Disable multiple uploads, can be enabled if needed
    beforeUpload: (file) => {
      // Before the file is uploaded, store it in the state
      setFile(file);
      handlePreview(file);
      message.success(`${file.name} file is ready for upload.`);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "removed") {
        setFile(null);
        setPreviewImage(picture);
        message.info("File removed.");
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || file.preview);
    //setPreviewOpen(true);
  };

  const dateFormat = (value) => {
    return dayjs(value).format(formatDate);
  };

  const onFinish = (item) => {
    console.log("success", item);

    localStorage.setItem("employeeId", item.empId);
    const body = {
      empId: item.empId,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      birthDate: dateFormat(item.birthDate),
      placeOfBirth: item.placeOfBirth,
      age: item.age,
      sex: item.gender,
      height: item.height,
      address: item.address,
      empDate: dateFormat(item.empDate),
      joinDate: dateFormat(item.joinDat),
      mangerId: item.mangerId,
      location: item.location,
      maritalStats: item.maritalStats,
      nationality: item.nationality,
      workType: item.workType,
      religion: item.religion,
      idCard: item.idCard,
      passport: item.passportId,
      remark: item.remark,
      govOfficer: item.govOfficer,
      govTel: item.govTel,
      govAddress: item.govAddress,
      govPosition: item.govPosition,
      depId: item.department,
      posId: item.position,
      weight: item.weight,
    };
    const formData = new FormData();
    const json = JSON.stringify(body);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("body", blob);
    if (file != null) {
      formData.append("file", file);
    }

    let url = "info/employee/addEmployee";
    let method = "post";

    request(url, method, formData).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
      }
    });
  };

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
            onFinish(item);
          }}
        >
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
              <Form.Item
                name="idCardNo"
                label="ID Card No."
                rules={[
                  {
                    required: true,
                    message: "Please input ID Card No.! ",
                  },
                ]}
              >
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
            <Col span={6}>
              <Image
                width={200}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible,
                }}
                src={previewImage}
              />
            </Col>
            <Col span={18}>
              <Form.Item name="upload">
                <Dragger {...props} style={{ height: 50 }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
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

          <Form.Item>
            <Space>
              <Button danger>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default PersonalDetailForm;
