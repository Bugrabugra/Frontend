import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, JwtPayloadWithRefreshTokenType } from "../types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  // burada jwt-refresh yazan yerdeki deger ile controller UseGuards
  // decoratorundeki jwt-refresh yazan yerdeki deger ayni olmali
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("RT_SECRET"),
      passReqToCallback: true
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshTokenType {
    const refreshToken = req?.get("authorization").replace("Bearer", "").trim();

    if (!refreshToken) {
      throw new ForbiddenException("Refresh token malformed");
    }

    return { ...payload, refreshToken };
  }
}
