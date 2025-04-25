// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// // import { RolesService } from '../../roles/roles.service';

// @Injectable()
// export class PermissionGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     // private rolesService: RolesService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredPermission = this.reflector.get<string>(
//       'permission',
//       context.getHandler(),
//     );
//     if (!requiredPermission) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       throw new ForbiddenException('No user found');
//     }

//     const hasPermission = await this.rolesService.hasPermission(
//       user.user_id,
//       requiredPermission,
//     );
//     if (!hasPermission) {
//       throw new ForbiddenException('Insufficient permissions');
//     }

//     return true;
//   }
// }
