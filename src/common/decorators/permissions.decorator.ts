import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../companies/schemas/company.schema';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
