import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { StorageService } from '../storage/storage.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepo: Repository<Tarefa>,
    private readonly storage: StorageService,
    private readonly mail: MailService,
  ) {}

  findAll(): Promise<Tarefa[]> {
    return this.tarefaRepo.find();
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepo.findOneBy({ id });
    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return tarefa;
  }

  async create(dto: CreateTarefaDto, emailUsuario?: string): Promise<Tarefa> {
    const tarefa = await this.tarefaRepo.save(this.tarefaRepo.create(dto));

    // Dispara o e-mail SEM await: a resposta HTTP não espera o Resend.
    // Se o envio falhar, só registramos no log — a tarefa já foi criada.
    if (emailUsuario) {
      this.mail
        .tarefaCriada(emailUsuario, tarefa.titulo)
        .catch((e) => console.error('Falha ao enviar e-mail:', e.message));
    }

    return tarefa;
  }

  async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.findOne(id);
    Object.assign(tarefa, dto);
    return this.tarefaRepo.save(tarefa);
  }

  async remove(id: number): Promise<void> {
    const tarefa = await this.findOne(id);
    await this.tarefaRepo.remove(tarefa);
  }

  async anexar(id: number, arquivo: Express.Multer.File): Promise<Tarefa> {
    // findOne primeiro: se a tarefa não existe, respondemos 404 sem enviar nada ao bucket.
    const tarefa = await this.findOne(id);
    tarefa.anexoUrl = await this.storage.enviar(arquivo);
    return this.tarefaRepo.save(tarefa);
  }
}
