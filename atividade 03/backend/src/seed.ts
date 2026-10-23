import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

async function seed() {
  await dataSource.initialize();

  const tarefasRepository = dataSource.getRepository(Tarefa);
  const projetosRepository = dataSource.getRepository(Projeto);

  await tarefasRepository.clear();
  await projetosRepository.clear();

  await tarefasRepository.save([
    { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false },
    { titulo: 'Preparar a aula de hoje', concluida: true },
  ]);

  await projetosRepository.save([
    { nome: 'Faculdade', cor: 'azul', descricao: 'Projeto da faculdade' },
    { nome: 'Trabalho', cor: 'verde', descricao: 'Projeto de trabalho' },
  ]);

  console.log('Dados iniciais inseridos!');
  await dataSource.destroy();
}

seed().catch((erro) => {
  console.error('Erro ao inserir dados iniciais:', erro);
  process.exitCode = 1;
});
