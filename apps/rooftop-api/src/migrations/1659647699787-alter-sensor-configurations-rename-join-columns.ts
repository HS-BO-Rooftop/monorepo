import { MigrationInterface, QueryRunner } from "typeorm";

export class alterSensorConfigurationsRenameJoinColumns1659647699787 implements MigrationInterface {
    name = 'alterSensorConfigurationsRenameJoinColumns1659647699787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_87aefbfcae9d5def2ee4ceffab6"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_dae8c38eeaa3b7d4a8444a87279"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP COLUMN "sensor_interface_id"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP COLUMN "sensor_type_id"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD "sensorTypeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD "sensorInterfaceId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_d66349859857cef9e587c01f23d" FOREIGN KEY ("sensorTypeId") REFERENCES "sensor_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_4d7fde6a508126b066c3d89c450" FOREIGN KEY ("sensorInterfaceId") REFERENCES "sensor_interfaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_4d7fde6a508126b066c3d89c450"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP CONSTRAINT "FK_d66349859857cef9e587c01f23d"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP COLUMN "sensorInterfaceId"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" DROP COLUMN "sensorTypeId"`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD "sensor_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD "sensor_interface_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_dae8c38eeaa3b7d4a8444a87279" FOREIGN KEY ("sensor_type_id") REFERENCES "sensor_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensor_configurations" ADD CONSTRAINT "FK_87aefbfcae9d5def2ee4ceffab6" FOREIGN KEY ("sensor_interface_id") REFERENCES "sensor_interfaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
