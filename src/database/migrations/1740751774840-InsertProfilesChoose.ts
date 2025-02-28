import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertProfilesChoose1740751774840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO profiles_choose (profileId,profileChooseId) values (1,1)
            INSERT INTO profiles_choose (profileId,profileChooseId) values (1,2)
            INSERT INTO profiles_choose (profileId,profileChooseId) values (1,3)
            INSERT INTO profiles_choose (profileId,profileChooseId) values (2,2)
            INSERT INTO profiles_choose (profileId,profileChooseId) values (2,3)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE profiles_choose`);
  }
}
