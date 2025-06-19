import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return { id, name: 'Laptop', price: 1000 };
  }
}
