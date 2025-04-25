import { IsString, IsArray, IsEnum } from 'class-validator';
import { Permission } from '../schemas/company.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class RemovePermissionDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({
    enum: Permission,
    isArray: true,
    description: 'Permissions to remove',
  })
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
