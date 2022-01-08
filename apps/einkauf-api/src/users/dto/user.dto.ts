import { IsString, IsUUID } from '@hippo-oss/nest-dto/openapi';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
