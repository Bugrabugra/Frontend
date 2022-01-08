import { Button, DatePicker, Input, Progress, Slider, Space, Spin } from "antd";
import React from 'react'

const AntTheme = () => {
  return (
    <div>
      <Space direction="vertical">
        <Button type="primary">Button</Button>
        <Input placeholder="Type here..."/>
        <Progress percent={50} type="circle"/>
        <Spin spinning/>
        <DatePicker/>
        <Slider/>
      </Space>
    </div>
  )
}

export default AntTheme;