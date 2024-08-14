import "./style/personaldetail.css";
import dayjs from "dayjs";
import { useState } from "react";

//Componets form MUI
import Grid from "@mui/material/Unstable_Grid2";

//Componets form antd
import {
  Collapse,
  DatePicker,
  Space,
  Button,
  List,
  Checkbox,
  Form,
  Input,
  Select,
  Tag,
  Radio,
} from "antd";
import {
  EyeOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "antd/dist/antd"; // or 'antd/dist/antd.less'
// or 'antd-button-color/dist/css/style.less'
import PageTitle from "../../../components/Title_Page/TitlePage";
import { Box } from "@mui/material";
const { CheckableTag } = Tag;

const PersonalDetail = () => {
  const [form] = Form.useForm();
  const now = Date.now();
  const Today = dayjs(now).format("DD/MM/YYYY");
  const dateFormat = "YYYY-MM-DD";
  const date2 = dayjs(now).format("YYYY-MM-DD");
  const [open, setOpen] = useState(false);

  const data = ["24/10/2023", "25/10/2023", "26/10/2023"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const items = [
    {
      key: "1",
      label: `${Today}`,
      children: (
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <CheckableTag
                key={item}
                checked={selectedTags.includes(item)}
                onChange={(checked) => handleChange(item, checked)}
              >
                <EyeOutlined /> {item}
              </CheckableTag>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "2",
      label: `${Today}`,
      children: (
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <CheckableTag
                key={item}
                checked={selectedTags.includes(item)}
                onChange={(checked) => handleChange(item, checked)}
              >
                <EyeOutlined /> {item}
              </CheckableTag>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "3",
      label: `${Today}`,
      children: (
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <CheckableTag
                key={item}
                checked={selectedTags.includes(item)}
                onChange={(checked) => handleChange(item, checked)}
              >
                <EyeOutlined /> {item}
              </CheckableTag>
            </List.Item>
          )}
        />
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {
    console.log("Form values: ", values);
    // Handle form submission
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="charge">
      <span className="span-case1"> Personal Info:</span>
      <div style={{ minWidth: "100%" }}>
        <Grid container spacing={{ xs: 2 }}>
          <Grid xs={9}>
            <Grid container spacing={{ xs: 2 }}>
              <div className="border-box form-entry">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Grid container spacing={1}>
                    <Grid xs={4}>
                      <Form.Item label="Employee ID" name="id">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="First Name" name="first_name">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Last Name" name="last_name">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Gender" name="gender">
                        <Radio.Group>
                          <Radio value="male">Male</Radio>
                          <Radio value="female">Female</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Phone" name="phone">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Email" name="email">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Work Type" name="work_type">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Working Site" name="working_site">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Department" name="department">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={6}>
                      <Form.Item label="Section" name="section">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={6}>
                      <Form.Item label="Position" name="position">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={6}>
                      <Form.Item label="Start Date" name="start_date">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={6}>
                      <Form.Item label="Stop Date" name="stop_date">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={12}>
                      <Form.Item label="Address" name="address">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Live In" name="live">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="Date of Birth" name="dob">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                      <Form.Item label="Height (cm)" name="height">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Weight (kg)" name="weight">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Race" name="race">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Nationality" name="nationality">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Religion" name="religion">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={9}>
                      <Form.Item label="Place of Birth" name="placeofbirth">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                      <Form.Item label="ID Card No." name="idcard">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Issued Place" name="issued_place">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Issued Date" name="issued_date">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Exp. Date" name="exp_date">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                      <Form.Item label="Driving License" name="drive_license">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Passport ID" name="pass_id">
                        <Input />
                      </Form.Item>
                    </Grid>
                    <Grid xs={3}>
                      <Form.Item label="Exp. Date" name="exp_date1">
                        <DatePicker format={dateFormat} />
                      </Form.Item>
                    </Grid>
                    <div className="case">
                      <span className="span-case">Government Officer:</span>
                      <Grid container spacing={1}>
                        <Grid xs={9}>
                          <Form.Item
                            label="Government Officer"
                            name="gov_officer"
                          >
                            <Input />
                          </Form.Item>
                        </Grid>
                        <Grid xs={3}>
                          <Form.Item label="Position" name="position1">
                            <Input />
                          </Form.Item>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid xs={3}>
                          <Form.Item label="Office Tel" name="office_tel">
                            <Input />
                          </Form.Item>
                        </Grid>
                        <Grid xs={9}>
                          <Form.Item
                            label="Office Address"
                            name="office_address"
                          >
                            <Input />
                          </Form.Item>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PersonalDetail;



