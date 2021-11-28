import "antd/dist/antd.css";
import './App.css';
import {
  Alert, Button, DatePicker, Divider, Form, Input, message, Progress, Select, Spin, Table, Tag, TimePicker
} from "antd";
import {useEffect, useState} from "react";
import Icon, {
  AppleFilled, BankTwoTone, LoadingOutlined, LogoutOutlined, PieChartFilled, PoweroffOutlined, UserOutlined
} from "@ant-design/icons";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const fruits = ["Banana", "Mango", "Orange", "Cherry"];
  const [showAlert, setShowAlert] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [alreadySelectedRows, setAlreadySelectedRows] = useState(["1", "3"]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(data => setDataSource(data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }, []);


  // button
  const onButtonClick = (e) => {
    console.log("Button clicked");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  };

  // form
  const onFinish = (e) => {
    console.log(e);
    setTimeout(() => {
      setShowAlert(true);
      message.error("Login failed");
    }, 2000)
  };

  // table
  const tableData = [
    {name: "Name 1", age: 10, address: "Address 1", key: "1"},
    {name: "Name 2", age: 34, address: "Address 2", key: "2"},
    {name: "Name 3", age: 8, address: "Address 3", key: "3"},
  ];

  const tableColumns = [
    {title: "Name", dataIndex: "name", key: "key", render: name => <a>{name}</a>},
    {title: "Age", dataIndex: "age", key: "key", sorter: (a, b) => a.age - b.age},
    {title: "Address", dataIndex: "address", key: "key"},
    {title: "Graduated", key: "key", render: payload => <p>{payload.age > 20 ? "True" : "False"}</p>},
  ];

  const sortingColumns = [
    {key: "1", title: "ID", dataIndex: "id"},
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (record1, record2) => record1.userId - record2.userId
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: completed => <p>{completed ? "Complete" : "In Progress"}</p>,
      filters: [
        {text: "Complete", value: true},
        {text: "In Progress", value: false},
      ],
      onFilter: (value, record) => record.completed === value
    },
  ]

  const selectingColumns = [
    {title: "Student ID", dataIndex: "id"},
    {title: "Student Name", dataIndex: "name"},
    {
      title: "Student Grade",
      dataIndex: "grade",
      render: tag => {
        const color = tag.includes("A") ? "Green" : tag.includes("B") ? "blue" : "red"
        return <Tag color={color} key={tag}>{tag}</Tag>;
      }
    },
  ];

  const selectingDataSource = [
    {key: "1", id: 1, name: "Student Name 1", grade: "A+"},
    {key: "2", id: 2, name: "Student Name 2", grade: "A"},
    {key: "3", id: 3, name: "Student Name 3", grade: "B"},
    {key: "4", id: 4, name: "Student Name 4", grade: "C"},
    {key: "5", id: 5, name: "Student Name 5", grade: "A"},
  ];

  // icons
  const HeartIcon = (props) => {
    return (
      <Icon
        component={() => <svg></svg>}
      />
    )
  };

  return (
    <div className="App">
      <header className="App-header">
        {/*------------button--------------*/}
        <div>
          <p>Button</p>
          <Button
            type="primary"
            block
            loading={isLoading}
            icon={<PoweroffOutlined/>}
            className="my-button"
            onClick={onButtonClick}
          >
            My First Button
          </Button>
        </div>

        {/*-------------input-------------*/}
        <div>
          <p>Input</p>
          <Input.Search
            placeholder="Name"
            maxLength={10}
            prefix={<UserOutlined/>}
            allowClear
          />
        </div>

        {/*--------------select--------------*/}
        <p>Which is your favorite fruits?</p>
        <Select
          mode="multiple"
          placeholder="Select fruit"
          style={{width:"50%"}}
          maxTagCount={2}
        >
          {fruits.map((fruit, index) => {
            return (
              <Select.Option key={index} value={fruit}>
                {fruit}
              </Select.Option>
            )
          })}
        </Select>

        {/*----------------form---------------*/}
        <p>Form</p>
        <Form onFinish={onFinish}>
          <Form.Item label="User Name" name="username">
            <Input placeholder="User name" required/>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" required/>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">Log In</Button>
          </Form.Item>
        </Form>

        {/*---------------table-------------*/}
        <p>Table</p>
        <Table
          dataSource={tableData}
          columns={tableColumns}
        />

        {/*------------------table sorting--------------*/}
        <Table
          loading={isLoading}
          columns={sortingColumns}
          dataSource={dataSource}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: 500,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
              // make the api call here with page and page size
            }
          }}
        />

        {/*---------------table select------------------*/}
        <Table
          columns={selectingColumns}
          dataSource={selectingDataSource}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: alreadySelectedRows,
            onChange: keys => {
              setAlreadySelectedRows(keys);
            },
            onSelect: record => {
              console.log({record})
            },
            getCheckboxProps: record => ({
              // disabled: record.grade === "C"
            }),
            // hideSelectAll: true,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_NONE,
              Table.SELECTION_INVERT,
              {
                key: "even",
                text: "Select Even Rows",
                onSelect: allKeys => {
                  const selectedKeys = allKeys.filter(key => key %2 === 0);
                  setAlreadySelectedRows(selectedKeys);
                }
              },
              {
                key: "excellent",
                text: "Students with excellent grades",
                onSelect: allKeys => {
                  const selectedKeys = allKeys.filter(key => {
                    const isExcellent = selectingDataSource.find(student => {
                      return student.key === key && student.grade.includes("A");
                    });
                    return isExcellent;
                  });
                  setAlreadySelectedRows(selectedKeys);
                }
              }
            ]
          }}
        />



        {/*alert*/}
        <p>Alert</p>
        {showAlert && (
          <Alert
            closable
            type="error"
            message="Error"
            description="There was an error"
          />
        )}

        {/*-------------date picker------------*/}
        <p>Date picker</p>
        <DatePicker picker="month"/>
        <DatePicker.RangePicker/>
        <TimePicker/>

        {/*-------------spin---------------*/}
        <p>Spin</p>
        <Spin spinning={isLoading}/>
        <Button onClick={() => setIsLoading(preValue => !preValue)}>
          Toggle Spin
        </Button>
        <Spin spinning={isLoading}>
          <p>P tag 1</p>
          <p>P tag 2</p>
          <p>P tag 3</p>
        </Spin>

        {/*-------------progress---------------*/}
        <p>Progress</p>
        <Progress percent={33}/>
        <Progress percent={33} type="circle"/>
        <Progress percent={33} type="line" strokeColor="red"/>
        <Progress percent={33} type="line" strokeColor="red" strokeWidth={20}/>
        <Progress percent={33} status="success"/>
        <Progress percent={33} type="circle" status="exception"/>
        <Progress percent={33} type="line" status="exception" steps={3}/>

        {/*------------------icons-----------------*/}
        <p>Icons</p>
        <div>
          <PieChartFilled style={{color: "purple", fontSize: 100}}/>
          <AppleFilled style={{color: "green", fontSize: 100}}/>
          <LoadingOutlined style={{color: "green", fontSize: 100}}/>
          <AppleFilled rotate={45} style={{color: "orange", fontSize: 100}}/>
          <BankTwoTone twoToneColor="green" style={{fontSize: 100}}/>
          <Divider/>
          <Button icon={
            <LogoutOutlined style={{color: "blue", fontSize: 14}}/>
          }>
            Button wth Custom Icon
          </Button>
          <Divider/>
        </div>

      </header>
    </div>
  );
}

export default App;
