import { MigrationInterface, QueryRunner } from "typeorm";

export class alterSensorConfigurationsRenameI2cAddressColumn1659647811315 implements MigrationInterface {
    name = 'alterSensorConfigurationsRenameI2cAddressColumn1659647811315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_configurations" RENAME COLUMN "i2c_address" TO "i2cAddress"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_configurations" RENAME COLUMN "i2cAddress" TO "i2c_address"`);
    }

}
