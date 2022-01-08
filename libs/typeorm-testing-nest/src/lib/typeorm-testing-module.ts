import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

// eslint-disable-next-line @typescript-eslint/ban-types
export const TypeOrmTestingModule = (entities: EntityClassOrSchema[]) => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'postgres',
    dropSchema: true,
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
];