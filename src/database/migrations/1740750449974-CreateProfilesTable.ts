import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1740750449974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE profiles (
        id INT IDENTITY(1,1) PRIMARY KEY,  
        name VARCHAR(50) NOT NULL 
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS profiles`);
  }
}
