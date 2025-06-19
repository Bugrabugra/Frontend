import { Body, Controller, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Post()
  createOrder(@Body() order: any) {
    return { message: 'Order created', order };
  }
}
