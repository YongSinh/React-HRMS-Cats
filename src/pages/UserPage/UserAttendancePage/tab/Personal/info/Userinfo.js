import React from "react";
import { Row, Col, Card } from "antd";
import DynamicCalendar from "./DynamicCalendar";

const Userinfo = () => (
  <Row gutter={[12, 12]} style={{ marginBottom: 5 }}>
    <Col span={12.5}>
      <DynamicCalendar />
    </Col>
    <Col span={9} >
      <Card title="Your Salary">
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Base Salary:</b></span> <span>$3000</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>OT:</b></span> <span>$200</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Holiday bonus:</b></span> <span>$150</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Excellence bonus:</b></span> <span>$100</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Unpaid:</b></span> <span style={{color:"red"}}>($50)</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Deduction:</b></span> <span style={{color:"red"}}>($30)</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Unused annual leave:</b></span> <span style={{color:"blue"}}>16 days</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Tax seniority:</b></span> <span>$80</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Total:</b></span> <span>$3450</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Tax on salary:</b></span> <span>$300</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Fringe benefit:</b></span> <span>$50</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Tax on fringe benefits:</b></span> <span>$10</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Total after-tax:</b></span> <span>$3140</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Total on NSSF:</b></span> <span>$50</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Non-tax seniority:</b></span> <span>$70</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span><b>Net salary:</b></span> <span>$3260</span>
        </p>
      </Card>
    </Col>
  </Row>
);

export default Userinfo;
