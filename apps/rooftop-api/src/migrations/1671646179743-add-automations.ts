import { MigrationInterface, QueryRunner } from "typeorm";

export class addAutomations1671646179743 implements MigrationInterface {
    name = 'addAutomations1671646179743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "automations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, CONSTRAINT "PK_34c2cc382fc780ea36f7c478192" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "automations"`);
    }

}
