/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd"
import React, { useState } from 'react'

const AntTableSearch = () => {
  const [dataSource, setDataSource] = useState([
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Mark", age: 23, address: "Sydney" },
    { id: 3, name: "Patrick", age: 41, address: "London" },
    { id: 4, name: "Crissy", age: 23, address: "Sydney" },
    { id: 5, name: "Eva", age: 12, address: "Istanbul" },
  ]);

  const columns = [
    {
      title: "Name", 
      dataIndex: "name", 
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            />

            <Button type="primary" onClick={() => confirm()}>
              Search
            </Button>
            <Button type="danger" onClick={() => clearFilters()}>
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => <SearchOutlined/>,
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      }
    },
    {title: "Age", dataIndex: "age"},
    {title: "Address",dataIndex: "address"}
  ];
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        style={{display: "flex", flex: 1, margin: 10}}
      >
        
      </Table>
      
    </div>
  )
}

export default AntTableSearch
