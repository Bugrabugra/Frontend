import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MICROSERVICES } from '../constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES.PRODUCT_REDIS_CLIENT)
    private productRedisClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  createOrder(order: any) {
    console.log('Order received: ', order);
    this.productRedisClient.emit('order.created', order);
    // return { message: 'Create Order', order };

    return this.productRedisClient.send('get_product', {});
  }
}
