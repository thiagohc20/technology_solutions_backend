import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEmployees1741021768054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              INSERT INTO [dbo].[employees] 
      ([cpf], [created_at], [email], [locality], [name], [neighborhood], [public_place], [telephone], [uf], [updated_at], [user_id], [zipcode]) 
      VALUES
      ('11111111111', '2025-03-03T04:40:58.683Z', 'administrador@hotmail.com',  'Maceió', 'Administrador', 'Ponta Grossa', 'Rua X', '(99)99999-9999', 'AL', NULL, NULL, '57014510'),
      ('11532063407', '2025-03-01T16:00:11.177Z', 'joao@exemplo.com', 'Perto da igreja', 'João', 'Vergel', 'ali', '82999883654', 'AL', NULL, NULL, '57015561'),
      ('12345678901', '2025-02-15T10:00:00.000Z', 'maria@teste.com',  'São Paulo', 'Maria', 'Centro', 'Avenida Brasil', '(11)9988776655', 'SP', NULL, NULL, '01001000'),
      ('10987654321', '2025-01-20T12:10:00.000Z', 'carla@exemplo.com', 'Rio de Janeiro', 'Carla', 'Copacabana', 'Rua do Ouvidor', '(21)9876543210', 'RJ', NULL, NULL, '22040030'),
      ('11223344556', '2025-02-10T14:30:45.000Z', 'pedro@teste.com',  'Salvador', 'Pedro', 'Pituba', 'Rua 7 de Setembro', '(71)9887766555', 'BA', NULL, NULL, '40020260'),
      ('11335577991', '2025-03-01T08:30:00.000Z', 'lucas@teste.com',  'Fortaleza', 'Lucas', 'Meireles', 'Avenida Beira Mar', '(85)9999887766', 'CE', NULL, NULL, '60110001'),
      ('12121212121', '2025-01-15T16:45:30.000Z', 'ana@exemplo.com',  'Recife', 'Ana', 'Boa Viagem', 'Rua Conselheiro Aguiar', '(81)9888776655', 'PE', NULL, NULL, '51020010'),
      ('12233445566', '2025-03-03T10:00:00.000Z', 'gabriela@teste.com',  'Belo Horizonte', 'Gabriela', 'Savassi', 'Rua Dos Três', '(31)9999777888', 'MG', NULL, NULL, '30130030'),
      ('13334445556', '2025-02-25T11:40:00.000Z', 'claudio@teste.com',  'Porto Alegre', 'Cláudio', 'Cidade Baixa', 'Rua Lima e Silva', '(51)9887766555', 'RS', NULL, NULL, '90010010'),
      ('14445566778', '2025-03-05T09:30:00.000Z', 'juliana@exemplo.com',  'Curitiba', 'Juliana', 'Batel', 'Rua João Negrão', '(41)9988776655', 'PR', NULL, NULL, '80430010');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
