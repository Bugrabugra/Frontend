import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productModel.find();
  }
}
