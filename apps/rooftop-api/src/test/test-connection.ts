import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from '../applications/entities/application.entity';
import { RefreshTokenEntity } from '../auth/entities/refresh-token.entity';
import { UserEntity } from '../user/entities/user.entity';

export const TypeOrmTestModule = TypeOrmModule.forRoot({
  type: 'postgres',
  synchronize: true,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  entities: [UserEntity, ApplicationEntity, RefreshTokenEntity],
});
