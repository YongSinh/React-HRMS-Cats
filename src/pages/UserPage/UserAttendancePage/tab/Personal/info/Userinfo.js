import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import DynamicCalendar from "./DynamicCalendar";
import "./Userinfo.css";
const Userinfo = () => {
  const [hideSalary, setHideSalary] = useState(false);

  const toggleSalaryVisibility = () => {
    setHideSalary(!hideSalary);
  };

  const renderAmount = (amount) => {
    return hideSalary ? "****" : amount;
  };

  const baseSalary = 1000000;
  const ot = 200;
  const holidayBonus = 150;
  const excellenceBonus = 100;
  const unpaid = -50;
  const deduction = -30;
  const taxSeniority = 80;
  const taxOnSalary = 300;
  const fringeBenefit = 50;
  const taxOnFringeBenefit = 10;
  const nssf = 50;
  const nonTaxSeniority = 70;

  // Calculate total for this month's salary
  const totalSalaryThisMonth =
    baseSalary +
    ot +
    holidayBonus +
    excellenceBonus +
    unpaid +
    deduction +
    taxSeniority +
    taxOnSalary +
    fringeBenefit +
    taxOnFringeBenefit +
    nssf +
    nonTaxSeniority;

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 5 }}>
      <Col span={12.5}>
        <DynamicCalendar />
      </Col>
      <Col span={9}>
        <Card
          title="Your Salary"
          extra={
            <Button
              className="Hide-show"
              type="text"
              onClick={toggleSalaryVisibility}
              icon={hideSalary ? < EyeOutlined style={{fontSize:"1.5rem"}}/> : <EyeInvisibleOutlined style={{fontSize:"1.5rem"}} />}
              style={{
                color:"#4096ff",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
            >
              {hideSalary}
            </Button>
          }
        >
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Base Salary:</b>
            </span>{" "}
            <span>${renderAmount(baseSalary)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>OT:</b>
            </span>{" "}
            <span>${renderAmount(ot)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Holiday bonus:</b>
            </span>{" "}
            <span>${renderAmount(holidayBonus)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Excellence bonus:</b>
            </span>{" "}
            <span>${renderAmount(excellenceBonus)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Unpaid:</b>
            </span>{" "}
            <span style={{ color: "red" }}>${renderAmount(unpaid)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Deduction:</b>
            </span>{" "}
            <span style={{ color: "red" }}>${renderAmount(deduction)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Unused annual leave:</b>
            </span>{" "}
            <span style={{ color: "blue" }}>16 days</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Tax seniority:</b>
            </span>{" "}
            <span>${renderAmount(taxSeniority)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Tax on salary:</b>
            </span>{" "}
            <span>${renderAmount(taxOnSalary)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Fringe benefit:</b>
            </span>{" "}
            <span>${renderAmount(fringeBenefit)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Tax on fringe benefits:</b>
            </span>{" "}
            <span>${renderAmount(taxOnFringeBenefit)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Total after-tax:</b>
            </span>{" "}
            <span>${renderAmount(3140)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Total on NSSF:</b>
            </span>{" "}
            <span>${renderAmount(nssf)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Non-tax seniority:</b>
            </span>{" "}
            <span>${renderAmount(nonTaxSeniority)}</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Net salary:</b>
            </span>{" "}
            <span>${renderAmount(3260)}</span>
          </p>

          {/* New row for total salary */}
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              fontSize: "16px ",
              border: "1px solid #ddd",
              padding: "9px",
              borderRadius: "6px",
            }}
          >
            <span style={{textAlign:"center",display:"flex"}}>
              <b>Total for this month Salary:</b>
            </span>
            <div style={{textAlign:"center",fontWeight: "bold",display:"flex",flexDirection:"column-reverse",color:"#4096ff"}}>${renderAmount(totalSalaryThisMonth) }</div>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default Userinfo;
