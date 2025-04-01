import { NestFactory } from "@nestjs/core";
import { LoggingModule } from "./logging.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(LoggingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.port ?? 3002);
}

bootstrap();
