import { NestFactory } from "@nestjs/core";
import { RiderModule } from "./rider.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RiderModule,
    { transport: Transport.TCP }
  );
  await app.listen();
}

bootstrap();
