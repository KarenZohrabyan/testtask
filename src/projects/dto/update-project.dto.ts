import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ProjectStatus } from '../schemas/project.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ required: false, description: 'Project name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, description: 'Project description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: ProjectStatus,
    required: false,
    description: 'Project status',
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiProperty({ required: false, description: 'Project tags' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
