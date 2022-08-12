import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardPinsAddAutogenerateId1659791106897 implements MigrationInterface {
    name = 'alterBoardPinsAddAutogenerateId1659791106897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_45de0136ac68c17a098cf203cf8"`);
        await queryRunner.query(`ALTER TABLE "board_pins" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_45de0136ac68c17a098cf203cf8" FOREIGN KEY ("pinId") REFERENCES "board_pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_45de0136ac68c17a098cf203cf8"`);
        await queryRunner.query(`ALTER TABLE "board_pins" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_45de0136ac68c17a098cf203cf8" FOREIGN KEY ("pinId") REFERENCES "board_pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
