import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

export const TypeOrmTestModule = TypeOrmModule.forRoot({
  type: 'postgres',
  synchronize: true,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  entities: getMetadataArgsStorage().tables.map((t) => t.target),
});
