import { MigrationInterface, QueryRunner } from "typeorm";

export class userAddAdmin1680451557179 implements MigrationInterface {
    name = 'userAddAdmin1680451557179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
