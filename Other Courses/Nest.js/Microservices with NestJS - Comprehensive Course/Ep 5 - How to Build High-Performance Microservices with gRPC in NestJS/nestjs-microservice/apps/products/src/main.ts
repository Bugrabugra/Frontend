/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PRODUCTS_PACKAGE_NAME } from '../../../types/products';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCTS_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/products.proto'),
      },
    },
  );

  await app.listen();

  Logger.log(`🚀 Application is running on gRPC channel`);
}

bootstrap();
