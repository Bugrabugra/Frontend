import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new object instead of mutating the input
    const newUser = {
      ...createUserDto,
      password: hashedPassword
    };

    return newUser;
  }
}
