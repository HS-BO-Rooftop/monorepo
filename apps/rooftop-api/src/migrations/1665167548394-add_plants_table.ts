import { MigrationInterface, QueryRunner } from "typeorm";

export class addPlantsTable1665167548394 implements MigrationInterface {
    name = 'addPlantsTable1665167548394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_de" character varying NOT NULL, "name_en" character varying NOT NULL, "imageUrl" character varying(1024) NOT NULL, CONSTRAINT "PK_7056d6b283b48ee2bb0e53bee60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "plant_id" uuid`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_9617ad0b7950ad805c178ab03cc" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_9617ad0b7950ad805c178ab03cc"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "plant_id"`);
        await queryRunner.query(`DROP TABLE "plants"`);
    }

}
