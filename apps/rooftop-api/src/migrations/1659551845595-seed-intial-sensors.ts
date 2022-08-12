import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedIntialSensors1659551845595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Create Interfaces I2C, SPI and ADC
      await queryRunner.query(
        `INSERT INTO "sensor_interfaces" VALUES(DEFAULT, 'I2C')`
      );
      await queryRunner.query(
        `INSERT INTO "sensor_interfaces" VALUES(DEFAULT, 'SPI')`
      );
      await queryRunner.query(
        `INSERT INTO "sensor_interfaces" VALUES(DEFAULT, 'ADC')`
      );

      /**
       * Create Sensor Types
       * Temperature
       * Humidity
       * Light
       * Water_Level
       */
      await queryRunner.query(
        `INSERT INTO "sensor_types" VALUES(DEFAULT, 'Temperature')`
      );
      await queryRunner.query(
        `INSERT INTO "sensor_types" VALUES(DEFAULT, 'Humidity')`
      );
      await queryRunner.query(
        `INSERT INTO "sensor_types" VALUES(DEFAULT, 'Light')`
      );
      await queryRunner.query(
        `INSERT INTO "sensor_types" VALUES(DEFAULT, 'Water_Level')`
      );
      queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Delete all Sensor Types
      await queryRunner.query(
        `DELETE FROM "sensor_types" WHERE "name" IN ('Temperature', 'Humidity', 'Light', 'Water_Level')`
      );
      // Delete all Sensor Interfaces
      await queryRunner.query(
        `DELETE FROM "sensor_interfaces" WHERE "name" IN ('I2C', 'SPI', 'ADC')`
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
