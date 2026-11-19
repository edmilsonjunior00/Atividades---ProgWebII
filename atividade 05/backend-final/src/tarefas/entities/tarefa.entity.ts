import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ default: false })
  concluida: boolean;

  // URL pública do anexo no bucket (Supabase Storage). Nula enquanto não há anexo.
  @Column({ nullable: true })
  anexoUrl?: string;
}
