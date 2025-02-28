import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1740750485318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'users' AND xtype = 'U')
            BEGIN
            CREATE TABLE users (
                id INT IDENTITY (1,1) PRIMARY KEY,
                employee_id INT,
                profile_id INT,
                password NVARCHAR(255),
                created_at DATETIME NOT NULL,
                updated_at DATETIME,
                FOREIGN KEY (employee_id) REFERENCES employees(id),
                FOREIGN KEY (profile_id) REFERENCES profiles(id)
            )
            END
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
