import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { SerializedUser } from "../types";
import { UserNotFoundException } from "../exceptions/UserNotFound.exception";
import { HttpExceptionFilter } from "../filters/HttpException.filter";
import { CreateUserDto } from "../dto/CreateUser.dto";
import { AuthenticatedGuard } from "../../auth/utils/LocalAuthGuard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("")
  getUsers(): SerializedUser[] {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/username/:username")
  getByUsername(@Param("username") username: string) {
    const user = this.usersService.getUserByUsername(username);

    if (user) {
      return new SerializedUser(user);
    } else {
      throw new HttpException("user not found", HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get("id/:id")
  getById(@Param("id", ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);

    if (user) {
      return new SerializedUser(user);
    } else {
      throw new UserNotFoundException();
    }
  }

  @Post("create")
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
