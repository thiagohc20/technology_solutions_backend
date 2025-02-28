import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeesTable1740750367004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'employees' AND xtype = 'U')
      BEGIN
        CREATE TABLE employees (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name VARCHAR(255),
          cpf VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          telephone VARCHAR(20) NOT NULL,
          uf VARCHAR(2) NOT NULL,
          neighborhood VARCHAR(40) NOT NULL,
          locality VARCHAR(30) NOT NULL,
          public_place VARCHAR(100) NOT NULL,
          zipcode VARCHAR(50) NOT NULL,
          created_at DATETIME NOT NULL,
          updated_at DATETIME
        )
      END
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE employees;`);
  }
}
