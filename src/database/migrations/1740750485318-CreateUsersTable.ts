import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1740750485318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users (
                id INT IDENTITY (1,1) PRIMARY KEY,
                employeeId INT,
                profileId INT,
                password NVARCHAR(255),
                FOREIGN KEY (employeeId) REFERENCES employees(id),
                FOREIGN KEY (profileId) REFERENCES profiles(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
