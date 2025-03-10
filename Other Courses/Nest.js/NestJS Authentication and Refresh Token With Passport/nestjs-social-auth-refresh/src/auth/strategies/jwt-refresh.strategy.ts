import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh
      ]),
      secretOrKey: configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET"),
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    return this.authService.verifyUserRefreshToken(
      request.cookies?.Refresh,
      payload.userId
    );
  }
}
