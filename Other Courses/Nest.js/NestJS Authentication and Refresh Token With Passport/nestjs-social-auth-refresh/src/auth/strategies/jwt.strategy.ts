import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { UsersService } from "../../users/users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication
      ]),
      secretOrKey: configService.getOrThrow("JWT_ACCESS_TOKEN_SECRET")
    });
  }

  validate(payload: TokenPayload) {
    return this.usersService.getUser({ _id: payload.userId });
  }
}
