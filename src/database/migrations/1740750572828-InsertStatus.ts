import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertStatus1740750572828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             INSERT INTO status (name, created_at) values ('Finalizado', GETDATE())
             INSERT INTO status (name, created_at) values ('Em Aberto', GETDATE())
             INSERT INTO status (name, created_at) values ('Vencido', GETDATE())
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE status`);
  }
}
