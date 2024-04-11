import { MiddlewareConsumer, Module, NestModule, Scope } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestService } from "./request.service";
import { AuthGuard } from "./guards/auth.guard";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { AuthenticationMiddleware } from "./middlewares/authentication.middleware";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      useClass: AuthGuard,
      provide: APP_GUARD
    },
    {
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST,
      provide: APP_INTERCEPTOR
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
    // {
    //   provide: APP_PIPE,
    //   useClass: FreezePipe
    // }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
