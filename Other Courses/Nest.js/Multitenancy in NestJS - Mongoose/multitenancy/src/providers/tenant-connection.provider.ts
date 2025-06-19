import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { FactoryProvider, InternalServerErrorException } from '@nestjs/common';

export const TenantConnectionProvider: FactoryProvider = {
  provide: 'TENANT_CONNECTION',
  useFactory: (request: { tenantId?: string }, connection: Connection) => {
    if (!request.tenantId) {
      throw new InternalServerErrorException(
        'Make sure to apply tenants middleware',
      );
    }

    return connection.useDb(`tenant_${request.tenantId}`);
  },
  inject: [REQUEST, getConnectionToken()],
  // scope: Scope.REQUEST, no need cause REQUEST is injected
};
