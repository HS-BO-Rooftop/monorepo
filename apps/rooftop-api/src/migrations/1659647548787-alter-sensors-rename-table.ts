import { MigrationInterface, QueryRunner } from "typeorm";

export class alterSensorsRenameTable1659647548787 implements MigrationInterface {
    name = 'alterSensorsRenameTable1659647548787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b"`);
        await queryRunner.query(`CREATE TABLE "sensor_configurations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "i2c_address" integer, "sensor_type_id" uuid, "sensor_interface_id" uuid, CONSTRAINT "UQ_dde06f6707095d3e5647e25b45b" UNIQUE ("name"), CONSTRAINT "PK_cbb81f7c8de4e0ca3548b1429ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_dae8c38eeaa3b7d4a8444a87279" FOREIGN KEY ("sensor_type_id") REFERENCES "sensor_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_87aefbfcae9d5def2ee4ceffab6" FOREIGN KEY ("sensor_interface_id") REFERENCES "sensor_interfaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b" FOREIGN KEY ("sensorId") REFERENCES "sensor_configurations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_87aefbfcae9d5def2ee4ceffab6"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_dae8c38eeaa3b7d4a8444a87279"`);
        await queryRunner.query(`DROP TABLE "sensor_configurations"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_d2d5eb3b5e8d807e201ddefa52b" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
