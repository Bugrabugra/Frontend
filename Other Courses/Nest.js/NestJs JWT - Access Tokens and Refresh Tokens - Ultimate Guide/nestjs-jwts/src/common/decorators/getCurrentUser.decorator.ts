import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadWithRefreshTokenType } from "../../auth/types";

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshTokenType, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }

    return request.user;
  }
);
