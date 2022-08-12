import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterBoardsRenameColumns1659706944755
  implements MigrationInterface
{
  name = 'alterBoardsRenameColumns1659706944755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "PK_bd7a5feaaf9cfb2409675e514da"`
    );
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "deviceId"`);
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "deviceName"`);
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`
    );
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "PK_606923b0b068ef262dfdcd18f44"`
    );
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "deviceName" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "deviceId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "PK_bd7a5feaaf9cfb2409675e514da" PRIMARY KEY ("deviceId")`
    );
    await queryRunner.query(
      `ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "boards"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
