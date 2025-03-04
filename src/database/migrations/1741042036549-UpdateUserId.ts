import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserId1741042036549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            UPDATE EMPLOYEES  SET USER_ID = 3
        `);
    await queryRunner.query(`
            
            UPDATE EMPLOYEES  SET USER_ID = 1 WHERE ID = 1
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
