import React from "react";
import { useState } from "react";
import "./style/family.css";

// Components from MUI
import Grid from "@mui/material/Unstable_Grid2";

// Components from antd
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
import "antd/dist/antd";

const Family = () => {
  return (
    <div className="charge">
      <span className="span-case1">Family Information:</span>
      <div className="grid-container">
        <Grid container spacing={{ xs: 1 }}>
          <Grid xs={9}>
            <Form.Item label="Father's Name:" name={"father_name"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={3}>
            <Form.Item label="Occupation:" name={"occupation"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={12}>
            <Form.Item label="Permanent Address:" name={"permanent_add"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={12}>
            <Form.Item label="Phone Number:" name={"phone_num"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={9}>
            <Form.Item label="Mother's Name:" name={"mother_name"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={3}>
            <Form.Item label="Occupation:" name={"occupation"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={12}>
            <Form.Item label="Permanent Address:" name={"permanent_add"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={12}>
            <Form.Item label="Phone Number:" name={"phone_num"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={9}>
            <Form.Item label="No. of sibling:" name={"sibling"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={3}>
            <Form.Item label="You are the number:" name={"number_of"}>
              <Input />
            </Form.Item>
          </Grid>
          <Grid xs={12}>
            <Form.Item label="Marital Status:" name={"marital_status"}>
              <Input />
            </Form.Item>
          </Grid>
        </Grid>
        <div className="sibling-container charge">
          <span className="span-case1">Sibling:</span>
          <Grid container spacing={{ xs: 1 }}>
            <Grid xs={2}>
              <Form.Item label="First Name" name={"sibling_first_name"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={2}>
              <Form.Item label="Last Name" name={"sibling_last_name"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={1}>
              <Form.Item label="Gender" name={"sibling_gender"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={1}>
              <Form.Item label="Age" name={"sibling_age"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={1}>
              <Form.Item label="Education" name={"sibling_education"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={2}>
              <Form.Item label="Occupation" name={"sibling_occupation"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={1.5}>
              <Form.Item label="Position" name={"sibling_position"}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid xs={2}>
              <Form.Item label="Office" name={"sibling_office"}>
                <Input />
              </Form.Item>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Family;
