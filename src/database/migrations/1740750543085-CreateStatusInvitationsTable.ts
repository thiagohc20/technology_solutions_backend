import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusInvitationsTable1740750543085
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'status_invitation' AND xtype = 'U')
            BEGIN
            CREATE TABLE status_invitation (
                id INT IDENTITY(1,1) PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                status_id INT NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME,       
                FOREIGN KEY (status_id) REFERENCES status(id)
            )
            END
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS status_invitation`);
  }
}
