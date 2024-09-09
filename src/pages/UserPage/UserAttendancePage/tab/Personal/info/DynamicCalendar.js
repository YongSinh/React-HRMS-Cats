import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd"; // Import Ant Design Modal
import "./DynamicCalendar.css"; // Import the CSS styles

const DynamicCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState({
    checkInTime: "08:00 AM",
    checkOutTime: "05:00 PM",
    deduct: "$0",
    earlyCheckOut: "No",
    lateCheckIn: "No",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    const days = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <li key={`prev-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";

      const isSunday =
        new Date(currYear, currMonth, i).getDay() === 0
          ? { color: "red" }
          : {};

      days.push(
        <li
          key={`curr-${i}`}
          className={isToday}
          style={isSunday}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    return days;
  };

  const handlePrevNextClick = (direction) => {
    const newMonth = direction === "prev" ? currMonth - 1 : currMonth + 1;
    if (newMonth < 0 || newMonth > 11) {
      const newDate = new Date(currYear, newMonth, date.getDate());
      setDate(newDate);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    } else {
      setCurrMonth(newMonth);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons">
          <span
            id="prev"
            className="material-symbols-rounded"
            onClick={() => handlePrevNextClick("prev")}
          >
            <LeftOutlined />
          </span>
          <span
            id="next"
            className="material-symbols-rounded"
            onClick={() => handlePrevNextClick("next")}
          >
            <RightOutlined />
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li style={{ color: "red" }}>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">{renderCalendar()}</ul>
      </div>

      <Modal
  title={`Attendance Details for ${months[currMonth]} ${selectedDay}, ${currYear}`}
  visible={isModalVisible}
  onCancel={handleCloseModal}
  footer={null} // Hide the Cancel and OK buttons
 width={300} // Centers the modal itself on the screen
>
  <div style={{ textAlign: "" }}>
    <p>-Check-in time: {attendanceDetails.checkInTime}</p>
    <p>-Check-Out time: {attendanceDetails.checkOutTime}</p>
    <p>-Deduct: {attendanceDetails.deduct}</p>
    <p>-Early Check-Out: {attendanceDetails.earlyCheckOut}</p>
    <p>-Late Check-In: {attendanceDetails.lateCheckIn}</p>
  </div>
</Modal>
    </div>
  );
};

export default DynamicCalendar;
