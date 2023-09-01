import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import { UserType } from "@prisma/client";
import { SigninDto, SignupDto } from "../dtos/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(
    { email, password, phone, name, productKey }: SignupDto,
    userType: UserType
  ) {
    if (userType !== UserType.BUYER) {
      if (!productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        productKey
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }

    const userExists = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        name,
        user_type: userType
      }
    });

    return this.generateJWT(name, user.id);
  }

  async signin({ email, password }: SigninDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new HttpException("Invalid credentials", 400);
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException("Invalid credentials", 400);
    }

    return this.generateJWT(user.name, user.id);
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }

  private async generateJWT(name: string, id: number) {
    return jwt.sign(
      {
        name,
        id
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: 3600000
      }
    );
  }
}
