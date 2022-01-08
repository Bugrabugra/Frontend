import { DatePicker, TimePicker } from "antd";
import React from 'react'

const AntDatePicker = () => {
  return (
    <div>
      <p>Date picker</p>
      <DatePicker picker="month" />
      <DatePicker.RangePicker />
      <TimePicker />
    </div>
  );
}

export default AntDatePicker