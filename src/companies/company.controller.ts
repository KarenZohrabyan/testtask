import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './company.service';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Permission } from './schemas/company.schema';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AddCompanyDto } from './dto/add-company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(Permission.ADMIN)
  @Post(':companyId/permissions')
  @ApiOperation({ summary: 'Add permissions for a user in a company' })
  @ApiResponse({ status: 201, description: 'Permissions added' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  addPermission(
    @Param('companyId') companyId: string,
    @Body() addPermissionDto: AddPermissionDto,
  ) {
    return this.companiesService.addPermission(companyId, addPermissionDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(Permission.ADMIN)
  @Delete(':companyId/permissions')
  @ApiOperation({ summary: 'Remove permissions for a user in a company' })
  @ApiResponse({ status: 200, description: 'Permissions removed' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  removePermission(
    @Param('companyId') companyId: string,
    @Body() removePermissionDto: RemovePermissionDto,
  ) {
    return this.companiesService.removePermission(
      companyId,
      removePermissionDto,
    );
  }

  @Post('')
  addCompany(
    @Body() addCompanyDto: AddCompanyDto,
  ) {
    return this.companiesService.addCompany(addCompanyDto);
  }
}
