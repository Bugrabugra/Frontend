import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @SkipThrottle()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
