import { IsString, IsArray, IsEnum } from 'class-validator';
import { Permission } from '../schemas/company.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class AddPermissionDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: Types.ObjectId;

  @ApiProperty({
    enum: Permission,
    isArray: true,
    description: 'Permissions to add',
  })
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
