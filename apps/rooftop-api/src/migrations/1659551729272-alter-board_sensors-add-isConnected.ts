import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardSensorsAddIsConnected1659551729272 implements MigrationInterface {
    name = 'alterBoardSensorsAddIsConnected1659551729272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD "isConnected" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP COLUMN "isConnected"`);
    }

}
