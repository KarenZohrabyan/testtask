import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Query,
  Request,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Permission } from '../companies/schemas/company.schema';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Projects')
@Controller('companies/:companyId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(Permission.READ)
  @Get()
  @ApiOperation({ summary: 'Get all projects for a company' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({ status: 200, description: 'List of projects' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(
    @Param('companyId') companyId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req
  ) {
    return this.projectsService.findAllByCompany(companyId, page, limit);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(Permission.WRITE)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(companyId, id, updateProjectDto);
  }


  @Post('')
  @ApiOperation({ summary: 'Create a project' })
  createProject(
    @Param('companyId') companyId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(companyId, createProjectDto);
  }
}
