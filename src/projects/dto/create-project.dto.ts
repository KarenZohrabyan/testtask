import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ProjectStatus } from '../schemas/project.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @ApiProperty({ required: false, description: 'Project name' })
  @IsString()
  name: string;

  @ApiProperty({ required: false, description: 'Project description' })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ProjectStatus,
    required: false,
    description: 'Project status',
  })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @ApiProperty({ required: false, description: 'Project tags' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
