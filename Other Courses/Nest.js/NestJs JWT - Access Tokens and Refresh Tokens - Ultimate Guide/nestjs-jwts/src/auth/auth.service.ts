import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload, Tokens } from "./types";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await bcrypt.hash(dto.password, 10);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      throw error;
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new ForbiddenException("Access Denied");
    }

    const isPasswordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!isPasswordMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.update({
      where: {
        id: userId,
        hashedRt: {
          not: null
        }
      },
      data: {
        hashedRt: null
      }
    });

    return true;
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user?.hashedRt) {
      throw new ForbiddenException("Access Denied");
    }

    const isRefreshTokensMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRt
    );

    if (!isRefreshTokensMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hashedRt: hash
      }
    });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: "15m"
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "7d"
      })
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }
}
