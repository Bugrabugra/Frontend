import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GenerateProductKeyDto, SigninDto, SignupDto } from "../dtos/auth.dto";
import { UserType } from "@prisma/client";
import { User, UserInfo } from "../decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup/:userType")
  async signup(
    @Body() body: SignupDto,
    @Param("userType", new ParseEnumPipe(UserType)) userType: UserType
  ) {
    return this.authService.signup(body, userType);
  }

  @Post("signin")
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post("key")
  generateProductKey(@Body() { email, userType }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(email, userType);
  }

  @Get("/me")
  me(@User() user: UserInfo) {
    return user;
  }
}
