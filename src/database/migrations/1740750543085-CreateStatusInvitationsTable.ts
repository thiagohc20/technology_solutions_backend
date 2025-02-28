import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusInvitationsTable1740750543085
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE status_invitation (
                id INT IDENTITY(1,1) PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                statusId INT NOT NULL,
                createdAt DATETIME NOT NULL,
                createdFor INT NOT NULL,
                updatedAt DATETIME,
                updatedFor INT,
                FOREIGN KEY (createdFor) REFERENCES users(id),         
                FOREIGN KEY (updatedFor) REFERENCES users(id),         
                FOREIGN KEY (statusId) REFERENCES status(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS status_invitation`);
  }
}
