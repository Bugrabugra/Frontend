import { AppleFilled, BankTwoTone, LoadingOutlined, LogoutOutlined, PieChartFilled } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React from 'react'

const AntIcons = () => {
  return (
    <div>
      <p>Icons</p>
      <div>
        <PieChartFilled style={{ color: "purple", fontSize: 100 }} />
        <AppleFilled style={{ color: "green", fontSize: 100 }} />
        <LoadingOutlined style={{ color: "green", fontSize: 100 }} />
        <AppleFilled rotate={45} style={{ color: "orange", fontSize: 100 }} />
        <BankTwoTone twoToneColor="green" style={{ fontSize: 100 }} />
        <Divider />
        <Button
          icon={<LogoutOutlined style={{ color: "blue", fontSize: 14 }} />}
        >
          Button wth Custom Icon
        </Button>
        <Divider />
      </div>
    </div>
  );
}

export default AntIcons;
