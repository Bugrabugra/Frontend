import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import React, { useState } from 'react'

const AntTableCRUD = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  }
  
  const [dataSource, setDataSource] = useState([
    { id: 1, name: "John", email: "john@gmail.com", address: "john address" },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      address: "david address",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      address: "james address",
    },
    { id: 4, name: "Sam", email: "sam@gmail.com", address: "sam address" },
  ]);
  
  const crudColumns = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "2", title: "Name", dataIndex: "name" },
    { key: "3", title: "Email", dataIndex: "email" },
    { key: "4", title: "Address", dataIndex: "address" },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditStudent(record)}/>
            <DeleteOutlined onClick={() => onDeleteStudent(record)} style={{ color: "red", marginLeft: 12 }} />
          </>
        );
      }
    },
  ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };

      setDataSource((pre) => {
        return [...pre, newStudent];
      });
  };
  
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) =>
          prev.filter((student) => student.id !== record.id)
        );
      }
    });
  };
  
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({...record});
  };

  
  return (
    <div>
      <p>CRUD</p>
      <Button onClick={onAddStudent}>Add a new student</Button>
      <Table columns={crudColumns} dataSource={dataSource} rowKey="id"></Table>
      <Modal 
        title="Edit student" 
        visible={isEditing} 
        okText="Save"
        onCancel={resetEditing} 
        onOk={() => {
          setDataSource(prev => {
            return prev.map(student => {
              if (student.id === editingStudent.id) {
                return editingStudent;
              } else {
                return student;
              }
            })
          })
          resetEditing();
        }}
      >
        <Input 
          value={editingStudent?.name} 
          onChange={e => setEditingStudent(pre => {
            return { ...pre, name: e.target.value };
          })}
        />
        <Input 
          value={editingStudent?.email} 
          onChange={e => setEditingStudent(pre => {
            return { ...pre, email: e.target.value };
          })}
        />
        <Input 
          value={editingStudent?.address} 
          onChange={e => setEditingStudent(pre => {
            return { ...pre, address: e.target.value };
          })}
        />
      </Modal>
    </div>
  );
}

export default AntTableCRUD;
