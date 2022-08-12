import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardSensorsAddId1659551463707 implements MigrationInterface {
    name = 'alterBoardSensorsAddId1659551463707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_624ff385febdcf6e25ce06f2857"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_09bf3b11a772b48eb2103f8aa95" PRIMARY KEY ("deviceId", "sensorId", "id")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_09bf3b11a772b48eb2103f8aa95"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_03abee3f08da9e5b0d272be14e4" PRIMARY KEY ("sensorId", "id")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_03abee3f08da9e5b0d272be14e4"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_02b114cdb25ba233187963850a9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "configurations"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_02b114cdb25ba233187963850a9"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_03abee3f08da9e5b0d272be14e4" PRIMARY KEY ("sensorId", "id")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_03abee3f08da9e5b0d272be14e4"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_09bf3b11a772b48eb2103f8aa95" PRIMARY KEY ("deviceId", "sensorId", "id")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "configurations"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "PK_09bf3b11a772b48eb2103f8aa95"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "PK_624ff385febdcf6e25ce06f2857" PRIMARY KEY ("deviceId", "sensorId")`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP COLUMN "id"`);
    }

}
