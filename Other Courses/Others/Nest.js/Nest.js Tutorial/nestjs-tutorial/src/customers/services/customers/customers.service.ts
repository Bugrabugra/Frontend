import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
      email: "danny@gmail.com",
      createdAt: new Date(),
    },
    {
      id: 2,
      email: "adam@gmail.com",
      createdAt: new Date(),
    },
    {
      id: 3,
      email: "spencer@gmail.com",
      createdAt: new Date(),
    },
  ];

  findCustomerById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
