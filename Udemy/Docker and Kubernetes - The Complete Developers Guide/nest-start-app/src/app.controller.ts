import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // this is a get request //
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
