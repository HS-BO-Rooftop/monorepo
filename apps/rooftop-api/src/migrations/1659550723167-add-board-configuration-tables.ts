import { MigrationInterface, QueryRunner } from "typeorm";

export class addBoardConfigurationTables1659550723167 implements MigrationInterface {
    name = 'addBoardConfigurationTables1659550723167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sensor_interfaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_0762b1b748097a3747eaf65fd7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensor_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_063d1815fd04605c2b2ca1a0189" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "i2c_address" integer, "sensor_type_id" uuid, "sensor_interface_id" uuid, CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "configurations" ("deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "deviceName" character varying, CONSTRAINT "PK_3010cc090e47ed034095b44d50e" PRIMARY KEY ("deviceId"))`);
        await queryRunner.query(`CREATE TABLE "board_pins" ("id" uuid NOT NULL, "pin" character varying NOT NULL, CONSTRAINT "PK_60c7c068a346f588d409a37277c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_sensors" ("deviceId" uuid NOT NULL, "sensorId" uuid NOT NULL, "pin" uuid, CONSTRAINT "PK_624ff385febdcf6e25ce06f2857" PRIMARY KEY ("deviceId", "sensorId"))`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_b3e4627155abe56be7afa23b361" FOREIGN KEY ("sensor_type_id") REFERENCES "sensor_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_eedc0647cee4bbe84148baffbbb" FOREIGN KEY ("sensor_interface_id") REFERENCES "sensor_interfaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_8fde03a4b8d8b5ac1c4089a086f" FOREIGN KEY ("pin") REFERENCES "board_pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_0546da916a49e96000b6276edae" FOREIGN KEY ("deviceId") REFERENCES "configurations"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_0546da916a49e96000b6276edae"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_8fde03a4b8d8b5ac1c4089a086f"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_eedc0647cee4bbe84148baffbbb"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_b3e4627155abe56be7afa23b361"`);
        await queryRunner.query(`DROP TABLE "board_sensors"`);
        await queryRunner.query(`DROP TABLE "board_pins"`);
        await queryRunner.query(`DROP TABLE "configurations"`);
        await queryRunner.query(`DROP TABLE "sensors"`);
        await queryRunner.query(`DROP TABLE "sensor_types"`);
        await queryRunner.query(`DROP TABLE "sensor_interfaces"`);
    }

}
