import { DataSource } from 'typeorm';

export const datasource = new DataSource({
  type: 'postgres',
  host: '10.8.0.1',
  port: 5432,
  username: 'rooftop',
  password: 's8v8qYMkdMJcaF3g',
  database: 'rooftop_dev',
  entities: ['apps/rooftop-api/src/**/*.entity.ts'],
  migrations: ['apps/rooftop-api/src/migrations/*.ts'],
});
