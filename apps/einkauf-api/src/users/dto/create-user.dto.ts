import { IsString } from '@hippo-oss/nest-dto/openapi';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
