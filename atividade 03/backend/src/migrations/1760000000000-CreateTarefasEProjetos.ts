import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTarefasEProjetos1760000000000 implements MigrationInterface {
  name = 'CreateTarefasEProjetos1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_tarefas_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying(60) NOT NULL, "descricao" text, "cor" character varying(20) NOT NULL, CONSTRAINT "PK_projetos_id" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "projetos"');
    await queryRunner.query('DROP TABLE "tarefas"');
  }
}
