import { Inject, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { comparePasswords } from "../../utils/bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  async validateUser(username: string, password: string) {
    const userDb = await this.userService.findUserByUsername(username);

    if (userDb) {
      const matched = comparePasswords(password, userDb.password);

      if (matched) {
        console.log("validation success");
        return userDb;
      } else {
        return null;
      }
    }
    console.log("validation failed");
    return null;
  }
}
