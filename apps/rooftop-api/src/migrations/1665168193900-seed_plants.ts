import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPlants1665168193900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO plants (name_de, name_en, image_url) VALUES ('Spinat', 'Spinache', 'https://images.unsplash.com/photo-1653842648037-2e449847a78d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
    );
    await queryRunner.query(
      `INSERT INTO plants (name_de, name_en, image_url) VALUES ('Tomaten', 'Tomatoes', 'https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
    );
    await queryRunner.query(
      `INSERT INTO plants (name_de, name_en, image_url) VALUES ('Karotten', 'Carrots', 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1599&q=80')`
    );
    await queryRunner.query(
      `INSERT INTO plants (name_de, name_en, image_url) VALUES ('Gurken', 'Cucumbers', 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM plants WHERE name_de IN ('Spinat', 'Tomaten', 'Karotten', 'Gurken')`
    );
  }
}
