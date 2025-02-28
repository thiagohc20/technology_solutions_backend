import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesChooseTable1740750510728
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE profiles_choose (
                id INT IDENTITY(1,1) PRIMARY KEY,
                profileId INT NOT NULL,
                profileChooseId INT NOT NULL,
                FOREIGN KEY (profileId) REFERENCES  profiles(id),
                FOREIGN KEY (profileChooseId) REFERENCES profiles(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS profiles_choose`);
  }
}
