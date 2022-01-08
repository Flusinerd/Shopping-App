import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: UserDto,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
    replace: CreateUserDto,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    exclude: ['password'],
  },
})
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public readonly service: UsersService) {}
}
