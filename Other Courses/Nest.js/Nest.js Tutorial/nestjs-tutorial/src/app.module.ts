import { Module } from "@nestjs/common";
import { CustomersModule } from "./customers/customers.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import entities from "./typeorm";
import { PassportModule } from "@nestjs/passport";
import { DataSource } from "typeorm";
import { PaymentsModule } from "./payments/payments.module";

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "testuser",
      password: "testuser123",
      database: "tutorial_db",
      entities,
      synchronize: true
    }),
    AuthModule,
    PassportModule.register({
      session: true
    }),
    PaymentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  getDataSource() {
    return this.dataSource;
  }
}
