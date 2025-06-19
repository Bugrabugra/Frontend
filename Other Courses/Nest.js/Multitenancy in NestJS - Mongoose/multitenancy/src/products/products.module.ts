import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TenantsMiddleware } from '../middlewares/tenants.middleware';
import { tenantModels } from '../providers/tenant-models.provider';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, tenantModels.productModel],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes(ProductsController);
  }
}
