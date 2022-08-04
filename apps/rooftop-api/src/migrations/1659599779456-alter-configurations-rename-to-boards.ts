import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterConfigurationsRenameToBoards1659599779456
  implements MigrationInterface
{
  name = 'alterConfigurationsRenameToBoards1659599779456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`
    );
    await queryRunner.query(
      `CREATE TABLE "boards" ("deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "deviceName" character varying, CONSTRAINT "PK_bd7a5feaaf9cfb2409675e514da" PRIMARY KEY ("deviceId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "boards"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`
    );
    await queryRunner.query(`DROP TABLE "boards"`);
    await queryRunner.query(
      `ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "configurations"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
