import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split("Bearer ")[1];
    const user = jwt.decode(token);
    request.user = user;

    return next.handle();
  }
}
