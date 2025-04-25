import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { PermissionGuard } from './auth/guards/permission.guard';

@Controller()
export class AppController {
  @Get('dashboard')
  // @UseGuards(JwtAuthGuard, PermissionGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', 'view_dashboard')
  getDashboard() {
    return { message: 'Welcome to the dashboard!' };
  }
}
