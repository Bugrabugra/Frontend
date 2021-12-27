import React from 'react'
import {Card, Typography} from "antd";
const {Text, Title} = Typography;


const UserCard = (props) => {
  return (
    <Card style={{ width: 300, backgroundColor: "#ffe", border: "2px solid black"}}>
      <Title level={4}>{props.user.name}</Title>
      <Title level={5}>{props.user.company.name}</Title>
      <Text>{props.user.company.catchPhrase}</Text>
    </Card>
  );
}

export default UserCard;
