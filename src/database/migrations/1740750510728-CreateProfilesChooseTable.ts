import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesChooseTable1740750510728
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'profiles_choose' AND xtype = 'U')
            BEGIN
            CREATE TABLE profiles_choose (
                id INT IDENTITY(1,1) PRIMARY KEY,
                profile_id INT NOT NULL,
                profile_choose_id INT NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME,
                FOREIGN KEY (profile_id) REFERENCES  profiles(id),
                FOREIGN KEY (profile_choose_id) REFERENCES profiles(id)
            )
            END
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS profiles_choose`);
  }
}
