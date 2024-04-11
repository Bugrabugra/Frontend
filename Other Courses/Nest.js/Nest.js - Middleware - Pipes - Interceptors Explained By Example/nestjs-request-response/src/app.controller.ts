import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FreezePipe } from "./pipes/freeze.pipe";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseInterceptors(LoggingInterceptor)
  // @UseFilters(HttpExceptionFilter)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  // @UseGuards(FreezePipe) butun argumanlara uygulanir
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 123;
  }

  @Get("error")
  throwError() {
    throw new InternalServerErrorException();
  }
}
