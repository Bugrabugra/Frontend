import { Injectable, Logger } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user.request";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "./events/user-created.event";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async createUser(body: CreateUserRequest) {
    this.logger.log("Creating new user...", body);
    const userId = "123";
    this.eventEmitter.emit(
      "user.created",
      new UserCreatedEvent(userId, body.email),
    );
    const establishWsTimeout = setTimeout(
      () => this.establishWsConnection(userId),
      5000,
    );
    this.schedulerRegistry.addTimeout(
      `${userId}.establish.ws`,
      establishWsTimeout,
    );
  }

  @OnEvent("user.created")
  welcomeNewUSer(payload: UserCreatedEvent) {
    this.logger.log("Welcoming new user...", payload.email);
  }

  @OnEvent("user.created", { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log("Sending welcome gift...", payload.email);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.logger.log("Sent welcome gift...", payload.email);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: "delete.expired.users" })
  deleteExpiredUsers() {
    this.logger.log("Deleting expired user...");
  }

  private establishWsConnection(userId: string) {
    this.logger.log("Creating ws connection...", userId);
  }
}
