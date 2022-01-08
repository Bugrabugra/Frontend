/* eslint-disable no-unused-vars */
import { message } from "antd";
import { Button, Form, Input } from "antd";
import React, { useState } from 'react'

const AntForm = () => {
  const [showAlert, setShowAlert] = useState(false);

  
  const onFinish = (e) => {
    console.log(e);
    setTimeout(() => {
      setShowAlert(true);
      message.error("Login failed");
    }, 2000);
  };
  
  return (
    <div>
      <p>Form</p>
      <Form onFinish={onFinish}>
        <Form.Item label="User Name" name="username">
          <Input placeholder="User name" required />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" required />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AntForm
