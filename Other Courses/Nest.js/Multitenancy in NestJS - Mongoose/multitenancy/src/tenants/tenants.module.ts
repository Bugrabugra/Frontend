import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant, TenantSchema } from './tenant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantConnectionProvider } from '../providers/tenant-connection.provider';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  controllers: [],
  providers: [TenantsService, TenantConnectionProvider],
  exports: [TenantsService, TenantConnectionProvider],
})
export class TenantsModule {}
