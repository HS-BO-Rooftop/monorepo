import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardSensorsRenamePinColumn1659647258715 implements MigrationInterface {
    name = 'alterBoardSensorsRenamePinColumn1659647258715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_8fde03a4b8d8b5ac1c4089a086f"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" RENAME COLUMN "pin" TO "pinId"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ALTER COLUMN "pinId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_45de0136ac68c17a098cf203cf8" FOREIGN KEY ("pinId") REFERENCES "board_pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_sensors" DROP CONSTRAINT "FK_45de0136ac68c17a098cf203cf8"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ALTER COLUMN "pinId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_sensors" RENAME COLUMN "pinId" TO "pin"`);
        await queryRunner.query(`ALTER TABLE "board_sensors" ADD CONSTRAINT "FK_8fde03a4b8d8b5ac1c4089a086f" FOREIGN KEY ("pin") REFERENCES "board_pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
