import { Injectable } from "@nestjs/common";

@Injectable()
export class RiderService {
  getHello(): string {
    return "Hello World!";
  }
}
