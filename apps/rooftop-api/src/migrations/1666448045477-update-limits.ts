import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateLimits1666448045477 implements MigrationInterface {
  name = 'updateLimits1666448045477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_interfaces" ALTER COLUMN "name" type varchar(5) using "name"::varchar(5)`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_types" ALTER COLUMN "name" type varchar(100) using "name"::varchar(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_configurations" ALTER COLUMN "name" type varchar(100) using "name"::varchar(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_configurations" ALTER COLUMN "name" type varchar using "name"::varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_types" ALTER COLUMN "name" type varchar using "name"::varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_interfaces" ALTER COLUMN "name" type varchar using "name"::varchar`
    );
  }
}
