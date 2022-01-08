import { Progress } from "antd";
import React from 'react'

const AntProgress = () => {
  return (
    <div>
      <p>Progress</p>
      <Progress percent={33} />
      <Progress percent={33} type="circle" />
      <Progress percent={33} type="line" strokeColor="red" />
      <Progress percent={33} type="line" strokeColor="red" strokeWidth={20} />
      <Progress percent={33} status="success" />
      <Progress percent={33} type="circle" status="exception" />
      <Progress percent={33} type="line" status="exception" steps={3} />
    </div>
  );
}

export default AntProgress
