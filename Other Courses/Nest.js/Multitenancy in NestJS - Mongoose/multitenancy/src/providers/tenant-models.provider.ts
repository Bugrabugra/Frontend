import { Connection } from 'mongoose';
import { Product, ProductSchema } from '../products/product.schema';

export const tenantModels = {
  productModel: {
    provide: 'PRODUCT_MODEL',
    useFactory: (tenantConnection: Connection) => {
      return tenantConnection.model(Product.name, ProductSchema);
    },
    inject: ['TENANT_CONNECTION'],
    // scope: Scope.REQUEST, no need cause REQUEST is injected
  },
};
