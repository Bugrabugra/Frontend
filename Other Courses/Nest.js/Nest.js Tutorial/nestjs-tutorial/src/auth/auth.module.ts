import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersService } from "../users/services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../typeorm";
import { LocalStrategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: "USER_SERVICE",
      useClass: UsersService
    },
    LocalStrategy,
    SessionSerializer
  ]
})
export class AuthModule {}
