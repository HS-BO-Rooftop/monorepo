import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBoardAddLastSeenAtColumn1664962635712 implements MigrationInterface {
    name = 'alterBoardAddLastSeenAtColumn1664962635712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset_codes" RENAME COLUMN "createdAt" TO "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "last_seen_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "password_reset_codes" ALTER COLUMN "expiresAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset_codes" ALTER COLUMN "expiresAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "last_seen_at"`);
        await queryRunner.query(`ALTER TABLE "password_reset_codes" RENAME COLUMN "expiresAt" TO "createdAt"`);
    }

}
