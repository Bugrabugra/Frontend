/* eslint-disable no-unused-vars */
import { Button, Spin } from "antd";
import React, { useEffect, useState } from 'react'

const AntSpin = () => {
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
  
  return (
    <div>
      <p>Spin</p>
      <Spin spinning={isLoading} />
      <Button onClick={() => setIsLoading((preValue) => !preValue)}>
        Toggle Spin
      </Button>
      <Spin spinning={isLoading}>
        <p>P tag 1</p>
        <p>P tag 2</p>
        <p>P tag 3</p>
      </Spin>
    </div>
  );
}

export default AntSpin
