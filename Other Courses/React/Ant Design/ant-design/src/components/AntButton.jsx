/* eslint-disable no-unused-vars */
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from 'react'

const AntButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setDataSource(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const onButtonClick = (e) => {
    console.log("Button clicked");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div>
      <p>Button</p>
      <Button
        type="primary"
        block
        loading={isLoading}
        icon={<PoweroffOutlined />}
        className="my-button"
        onClick={onButtonClick}
      >
        My First Button
      </Button>
    </div>
  );
}

export default AntButton;