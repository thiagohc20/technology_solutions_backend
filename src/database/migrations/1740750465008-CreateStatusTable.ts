import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusTable1740750465008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE status (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS status`);
  }
}
