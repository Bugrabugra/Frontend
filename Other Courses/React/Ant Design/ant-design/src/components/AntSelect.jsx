import { Select } from "antd";
import React from 'react'

const fruits = ["Banana", "Mango", "Orange", "Cherry"];

const AntSelect = () => {
  return (
    <div>
      <p>Which is your favorite fruits?</p>
      <Select
        mode="multiple"
        placeholder="Select fruit"
        style={{ width: "50%" }}
        maxTagCount={2}
      >
        {fruits.map((fruit, index) => {
          return (
            <Select.Option key={index} value={fruit}>
              {fruit}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}

export default AntSelect
