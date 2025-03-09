import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user.request";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    await this.usersService.create(request);
  }
}
