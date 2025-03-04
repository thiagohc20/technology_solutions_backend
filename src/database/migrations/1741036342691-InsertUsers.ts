import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1741036342691 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (1,1,GETDATE(),'$2b$13$ISAbPPCZAxJxDMvAAugVKei.haEAKsTlpxhuvjQfYIGhsnXZ9nwWC',null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (2,2,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (3,3,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (4,3,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (5,3,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (6,3,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (7,2,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (8,1,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (9,3,GETDATE(),null,null)
            INSERT INTO users (employee_id,profile_id,created_at,password,updated_at) values (10,2,GETDATE(),null,null)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
