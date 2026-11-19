import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TarefasModule } from './tarefas/tarefas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // Seção 4: serve a pasta ./uploads em http://localhost:3000/uploads/<arquivo>
    // (só para desenvolvimento; em produção o arquivo mora no bucket).
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TarefasModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
