import { CSVWriter } from "./6-csv-writer-refactor1";

interface Employee {
  id: number
  name: string
  role: string
  salary: number
}

const employeeWriter = new CSVWriter<Employee>(["id", "name", "role", "salary"])

employeeWriter.addRows([
  { id: 1, name: "shaun", salary: 50000, role: "web developer" }
])

employeeWriter.save("data/employees.csv")
