import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { UsersRepository } from "./users.repository";
import { DatabaseModule } from "../common/database/database.module";
import { User, UserEntity } from "./entities/user.entity";

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserEntity }])
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
