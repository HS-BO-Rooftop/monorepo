import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardPinsAddUniqueConstraint1659706359206 implements MigrationInterface {
    name = 'alterBoardPinsAddUniqueConstraint1659706359206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_pins" ADD CONSTRAINT "UQ_b29b42871ceb3cb797da47c51aa" UNIQUE ("pin")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_pins" DROP CONSTRAINT "UQ_b29b42871ceb3cb797da47c51aa"`);
    }

}
