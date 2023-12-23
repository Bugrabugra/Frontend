import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  // burada jwt yazan yerdeki deger ile controller UseGuards
  // decoratorundeki jwt yazan yerdeki deger ayni olmali
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("AT_SECRET")
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
