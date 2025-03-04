import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertStatusInvitation1741020148024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO status_invitation (email, status_id, created_at, updated_at, expiration) VALUES
    ('solutionstechnology887@gmail.com', 2, '2025-03-03T04:38:53.553', '2025-03-03T04:38:53.553', DATEADD(HOUR, 24, '2025-03-03T04:38:53.553')),
    ('joao@exemplo.com', 1, '2025-03-01T08:00:00.000', '2025-03-01T08:00:00.000', DATEADD(HOUR, 24, '2025-03-01T08:00:00.000')),
    ('maria@teste.com', 3, '2025-02-15T10:45:00.000', '2025-02-15T10:45:00.000', DATEADD(HOUR, 24, '2025-02-15T10:45:00.000')),
    ('carla@exemplo.com', 1, '2025-03-02T09:00:00.000', '2025-03-02T09:00:00.000', DATEADD(HOUR, 24, '2025-03-02T09:00:00.000')),
    ('pedro@teste.com', 2, '2025-02-20T12:30:00.000', '2025-02-20T12:30:00.000', DATEADD(HOUR, 24, '2025-02-20T12:30:00.000')),
    ('lucas@teste.com', 3, '2025-01-10T15:00:00.000', '2025-01-10T15:00:00.000', DATEADD(HOUR, 24, '2025-01-10T15:00:00.000')),
    ('ana@exemplo.com', 1, '2025-03-05T14:15:00.000', '2025-03-05T14:15:00.000', DATEADD(HOUR, 24, '2025-03-05T14:15:00.000')),
    ('gabriela@teste.com', 2, '2025-03-07T17:20:00.000', '2025-03-07T17:20:00.000', DATEADD(HOUR, 24, '2025-03-07T17:20:00.000')),
    ('claudio@teste.com', 3, '2025-02-25T18:00:00.000', '2025-02-25T18:00:00.000', DATEADD(HOUR, 24, '2025-02-25T18:00:00.000')),
    ('juliana@exemplo.com', 2, '2025-03-10T11:00:00.000', '2025-03-10T11:00:00.000', DATEADD(HOUR, 24, '2025-03-10T11:00:00.000'));


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
