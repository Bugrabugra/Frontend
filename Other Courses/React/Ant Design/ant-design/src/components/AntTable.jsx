import { Table } from "antd";
import React, { useEffect, useState } from 'react'


const AntTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setDataSource(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  
  const tableData = [
    { name: "Name 1", age: 10, address: "Address 1", key: "1" },
    { name: "Name 2", age: 34, address: "Address 2", key: "2" },
    { name: "Name 3", age: 8, address: "Address 3", key: "3" },
  ];

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
      render: (name) => <a href="https://www.google.com">{name}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "key",
      sorter: (a, b) => a.age - b.age,
    },
    { title: "Address", dataIndex: "address", key: "key" },
    {
      title: "Graduated",
      key: "key",
      render: (payload) => <p>{payload.age > 20 ? "True" : "False"}</p>,
    },
  ];

  const sortingColumns = [
    { key: "1", title: "ID", dataIndex: "id" },
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (record1, record2) => record1.userId - record2.userId,
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => <p>{completed ? "Complete" : "In Progress"}</p>,
      filters: [
        { text: "Complete", value: true },
        { text: "In Progress", value: false },
      ],
      onFilter: (value, record) => record.completed === value,
    },
  ];
  
  return (
    <div>
      <p>Table</p>
      <Table dataSource={tableData} columns={tableColumns} rowKey="id" />

      {/*------------------table sorting--------------*/}
      <Table
        loading={isLoading}
        columns={sortingColumns}
        dataSource={dataSource}
        rowKey="key"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: 500,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
            // make the api call here with page and page size
          },
        }}
      />
    </div>
  );
}

export default AntTable;
