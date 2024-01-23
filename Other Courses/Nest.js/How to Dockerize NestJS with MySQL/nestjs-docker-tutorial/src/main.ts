import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Running API on MODE: ${process.env.NODE_ENV} on Port: ${PORT}`);
  });
}

bootstrap();
