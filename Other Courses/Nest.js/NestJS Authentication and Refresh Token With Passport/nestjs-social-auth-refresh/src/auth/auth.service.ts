import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare, hash } from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/schema/user.schema";
import { TokenPayload } from "./interfaces/token-payload.interface";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            "JWT_ACCESS_TOKEN_EXPIRATION_MS"
          )
        )
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            "JWT_REFRESH_TOKEN_EXPIRATION_MS"
          )
        )
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString()
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: `${this.configService.getOrThrow("JWT_ACCESS_TOKEN_EXPIRATION_MS")}ms`
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: `${this.configService.getOrThrow("JWT_REFRESH_TOKEN_EXPIRATION_MS")}ms`
    });

    await this.userService.updateUser(
      { _id: user._id },
      {
        $set: { refreshToken: await hash(refreshToken, 10) }
      }
    );

    response.cookie("Authentication", accessToken, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      expires: expiresAccessToken
    });

    response.cookie("Refresh", refreshToken, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      expires: expiresRefreshToken
    });
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({
        email
      });

      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Credentials are not valid");
    }
  }

  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.getUser({ _id: userId });
      const authenticated = await compare(refreshToken, user.refreshToken!);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException("Refresh token is not valid");
    }
  }
}
