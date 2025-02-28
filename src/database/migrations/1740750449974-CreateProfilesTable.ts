import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1740750449974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'profiles' AND xtype = 'U')
        BEGIN
          CREATE TABLE profiles (
            id INT IDENTITY(1,1) PRIMARY KEY,  
            name VARCHAR(50) NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME,
          )
        END
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS profiles`);
  }
}
