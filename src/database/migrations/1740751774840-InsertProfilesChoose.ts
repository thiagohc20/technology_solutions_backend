import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertProfilesChoose1740751774840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO profiles_choose (profile_id,profile_choose_id, created_at) values (1,1, GETDATE())
            INSERT INTO profiles_choose (profile_id,profile_choose_id, created_at) values (1,2, GETDATE())
            INSERT INTO profiles_choose (profile_id,profile_choose_id, created_at) values (1,3, GETDATE())
            INSERT INTO profiles_choose (profile_id,profile_choose_id, created_at) values (2,2, GETDATE())
            INSERT INTO profiles_choose (profile_id,profile_choose_id, created_at) values (2,3, GETDATE())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE profiles_choose`);
  }
}
