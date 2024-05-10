import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./interface/token-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow("JWT_EXPIRATION")
    );

    const tokenPayload: TokenPayload = {
      ...user,
      _id: user._id.toHexString()
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie("Authentication", token, {
      httpOnly: true,
      expires
    });
  }

  logout(response: Response) {
    response.cookie("Authentication", "", {
      httpOnly: true,
      expires: new Date()
    });
  }

  verifyWs(request: Request): TokenPayload {
    const cookies: string[] = request.headers.cookie.split("; ");
    const authCookie = cookies.find((cookie) => {
      return cookie.includes("Authentication");
    });

    const jwt = authCookie.split("Authentication=")[1];

    return this.jwtService.verify(jwt);
  }
}
