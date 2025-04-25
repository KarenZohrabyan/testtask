import { IsString, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class AddCompanyDto {
  @ApiProperty({ description: 'Company Name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Company industry' })
  @IsString()
  industry: string;

  @ApiProperty({ description: 'Company industry' })
  permissions: any;
}
