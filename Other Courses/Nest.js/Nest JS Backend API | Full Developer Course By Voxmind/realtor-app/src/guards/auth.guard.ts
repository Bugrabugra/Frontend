import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import { PrismaService } from "../prisma/prisma.service";

type JWTPayload = {
  name: string;
  id: number;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // determine the UserTypes that can execute the called endpoint
    const roles = this.reflector.getAllAndOverride("roles", [
      context.getHandler(),
      context.getClass()
    ]);
    if (roles?.length) {
      // grab the JWT from the request header and verify it
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split("Bearer ")[1];
      try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN) as JWTPayload;

        // database request to get user by id
        const user = await this.prismaService.user.findUnique({
          where: {
            id: payload.id
          }
        });

        if (!user) {
          return false;
        }

        // determine if the user has permissions
        if (roles.includes(user.user_type)) {
          return true;
        }

        return false;
      } catch (error) {
        return false;
      }
    }

    console.log("guarda gerek yok");
    return true;
  }
}
