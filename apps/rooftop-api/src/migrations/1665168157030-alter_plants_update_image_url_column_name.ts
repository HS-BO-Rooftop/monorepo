import { MigrationInterface, QueryRunner } from "typeorm";

export class alterPlantsUpdateImageUrlColumnName1665168157030 implements MigrationInterface {
    name = 'alterPlantsUpdateImageUrlColumnName1665168157030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plants" RENAME COLUMN "imageUrl" TO "image_url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plants" RENAME COLUMN "image_url" TO "imageUrl"`);
    }

}
