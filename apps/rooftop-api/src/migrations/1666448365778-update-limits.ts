import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateLimits1666448365778 implements MigrationInterface {
  name = 'updateLimits1666448365778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_pins" ALTER COLUMN "pin" type varchar(10) using "pin"::varchar(10)`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ALTER COLUMN "name" type varchar(100) using "name"::varchar(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "plants" ALTER COLUMN "name_de" type varchar(100) using "name_de"::varchar(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "plants" ALTER COLUMN "name_en" type varchar(100) using "name_en"::varchar(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plants" ALTER COLUMN "name_en" type varchar using "name_en"::varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "plants" ALTER COLUMN "name_de" type varchar using "name_de"::varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ALTER COLUMN "name" type varchar using "name"::varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "board_pins" ALTER COLUMN "pin" type varchar using "pin"::varchar`
    );
  }
}
