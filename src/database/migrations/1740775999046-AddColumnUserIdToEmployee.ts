import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnUserIdToEmployee1740775999046
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE employees 
            ADD user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
