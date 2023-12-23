import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type UserInfo = {
  name: string;
  id: number;
  iat: number;
  exp: number;
};

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.user;
});
