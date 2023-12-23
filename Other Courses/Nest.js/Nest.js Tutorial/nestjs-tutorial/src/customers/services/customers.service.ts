import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import { Customer } from "../types/Customer";

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: "danny@gmail.com",
      name: "Danny"
    },
    {
      id: 2,
      email: "adam@gmail.com",
      name: "Adam"
    },
    {
      id: 3,
      email: "spencer@gmail.com",
      name: "Spencer"
    }
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  getCustomers() {
    return this.customers;
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
