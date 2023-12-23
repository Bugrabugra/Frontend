import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN") {
    return this.usersService.findAll(role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  // @Get("intern") order matters
  // fondAllInterns() {
  //   return [];
  // }

  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: "INTERN" | "ENGINEER" | "ADMIN";
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: "INTERN" | "ENGINEER" | "ADMIN";
    },
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
