import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompaniesService } from '../../companies/company.service';
import { Permission } from '../../companies/schemas/company.schema';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private companiesService: CompaniesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const companyId = request.params.companyId || request.body.companyId;

    const company = await this.companiesService.findOne(companyId);
    const userPermissions =
      company.permissions.find((p) => p.user.toString() === userId)
        ?.permissions || [];
console.log(userPermissions);

    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
