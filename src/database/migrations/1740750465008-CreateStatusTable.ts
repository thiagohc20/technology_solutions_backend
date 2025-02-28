import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusTable1740750465008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'status' AND xtype = 'U')
      BEGIN
        CREATE TABLE status (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME
        )
      END
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS status`);
  }
}
