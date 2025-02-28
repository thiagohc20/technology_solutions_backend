import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertStatus1740750572828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             INSERT INTO status (name) values ('Finalizado')
             INSERT INTO status (name) values ('Em Aberto')
             INSERT INTO status (name) values ('Vencido')
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE status`);
  }
}
