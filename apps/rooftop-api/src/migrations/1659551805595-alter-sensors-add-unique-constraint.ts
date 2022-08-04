import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterSensorsAddUniqueConstraint1659551805595
  implements MigrationInterface
{
  name = 'alterSensorsAddUniqueConstraint1659551805595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_types" ADD CONSTRAINT "UQ_e6683424ba038c8ad80470bb42d" UNIQUE ("name")`
    );
    await queryRunner.query(
      `ALTER TABLE "sensors" ADD CONSTRAINT "UQ_e35e9a861b337546d6a7f749fc5" UNIQUE ("name")`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_interfaces" ADD CONSTRAINT "UQ_6a88cfe0c58268d8213895faef7" UNIQUE ("name")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_interfaces" DROP CONSTRAINT "UQ_6a88cfe0c58268d8213895faef7"`
    );
    await queryRunner.query(
      `ALTER TABLE "sensors" DROP CONSTRAINT "UQ_e35e9a861b337546d6a7f749fc5"`
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_types" DROP CONSTRAINT "UQ_e6683424ba038c8ad80470bb42d"`
    );
  }
}
