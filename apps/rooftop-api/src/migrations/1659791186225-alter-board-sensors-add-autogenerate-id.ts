import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardSensorsAddAutogenerateId1659791186225 implements MigrationInterface {
    name = 'alterBoardSensorsAddAutogenerateId1659791186225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
