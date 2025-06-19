import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor(private readonly tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id']?.toString();

    if (!tenantId) {
      throw new BadRequestException('X-TENANT_ID not provided');
    }

    const tenantExists = await this.tenantsService.getTenantById(tenantId);

    if (!tenantExists) {
      throw new NotFoundException('Tenant not found');
    }

    req['tenantId'] = tenantId;
    next();
  }
}
