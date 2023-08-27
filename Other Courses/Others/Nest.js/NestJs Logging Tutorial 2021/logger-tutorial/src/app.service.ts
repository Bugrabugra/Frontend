import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
  logger: Logger;

  constructor() {
    this.logger = new Logger(AppService.name);
  }

  // constructor(private logger: Logger) {}
  getHello(): string {
    this.logger.debug("test");
    return "Hello World!";
  }
}
