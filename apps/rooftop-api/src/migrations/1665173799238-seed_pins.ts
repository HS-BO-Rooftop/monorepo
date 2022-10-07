import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPins1665173799238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO board_pins(pin) VALUES('K3'), ('K4'), ('K5'), ('K6'), ('K7'), ('K8')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM board_pins WHERE pin IN ('K3', 'K4', 'K5', 'K6', 'K7', 'K8')`
    );
  }
}
