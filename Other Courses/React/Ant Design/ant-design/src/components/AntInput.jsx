import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from 'react'

const AntInput = () => {
  return (
    <div>
      <p>Input</p>
      <Input.Search
        placeholder="Name"
        maxLength={10}
        prefix={<UserOutlined />}
        allowClear
      />
    </div>
  );
}

export default AntInput
