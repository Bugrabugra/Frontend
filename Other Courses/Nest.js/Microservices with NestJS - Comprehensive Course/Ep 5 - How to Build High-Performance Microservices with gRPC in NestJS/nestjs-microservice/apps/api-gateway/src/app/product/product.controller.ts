import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  PRODUCT_SERVICE_NAME,
  PRODUCTS_PACKAGE_NAME,
  ProductServiceClient,
} from '../../../../../types/products';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('product')
export class ProductController implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Get()
  findOne() {
    return this.productService.getProduct({ productId: 12 });
  }
}
