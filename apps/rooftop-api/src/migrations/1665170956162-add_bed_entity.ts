import { MigrationInterface, QueryRunner } from "typeorm";

export class addBedEntity1665170956162 implements MigrationInterface {
    name = 'addBedEntity1665170956162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_2212ae7113d85a70dc65983e742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "bed_id" uuid`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_b46baa5b7f2e4179bff0b071206" FOREIGN KEY ("bed_id") REFERENCES "beds"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_b46baa5b7f2e4179bff0b071206"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "bed_id"`);
        await queryRunner.query(`DROP TABLE "beds"`);
    }

}
