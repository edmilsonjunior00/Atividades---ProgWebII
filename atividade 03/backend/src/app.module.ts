import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProjetosModule } from './projetos/projetos.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TarefasModule, ProjetosModule],
})
export class AppModule {}
