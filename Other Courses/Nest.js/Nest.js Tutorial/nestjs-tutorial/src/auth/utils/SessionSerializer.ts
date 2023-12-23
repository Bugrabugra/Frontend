import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../../users/services/users.service";
import { User } from "../../typeorm";
import { Inject } from "@nestjs/common";

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log("serialize");
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log("deserialize");
    console.log(this.userService);
    const userDb = await this.userService.findUserById(user.id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
