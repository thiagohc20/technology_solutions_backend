import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertProfiles1740751751683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO profiles (name) values ('Administrador')
            INSERT INTO profiles (name) values ('Gente e Cultura')
            INSERT INTO profiles (name) values ('Colaborador Comum')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE profiles`);
  }
}
