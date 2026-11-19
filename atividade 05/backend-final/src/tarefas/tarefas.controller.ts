import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuarioLogado } from '../auth/usuario-logado.interface';

const CINCO_MB = 5 * 1024 * 1024;

// @UseGuards protege TODAS as rotas: exige um token JWT válido no cookie.
@UseGuards(JwtAuthGuard)
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  // O e-mail do destinatário vem do token JWT (req.user.email, montado no
  // JwtStrategy) e é repassado ao service.
  @Post()
  create(@Body() dto: CreateTarefaDto, @Req() req: Request & { user: UsuarioLogado }) {
    return this.tarefasService.create(dto, req.user.email);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTarefaDto) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    // `return` é essencial: sem ele a promise fica solta, o 204 sai antes de
    // apagar e um 404 (tarefa inexistente) vira "unhandled rejection".
    return this.tarefasService.remove(id);
  }

  // ---------------------------------------------------------------------
  // Seção 5 do roteiro — VERSÃO FINAL: anexo no bucket (Supabase Storage).
  // Sem `storage` no interceptor o Multer guarda o arquivo em MEMÓRIA
  // (arquivo.buffer), que é o que enviamos ao bucket. É a rota que o
  // frontend usa (botão de clipe).
  // ---------------------------------------------------------------------
  @Post(':id/anexo')
  @UseInterceptors(FileInterceptor('arquivo'))
  anexar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: CINCO_MB }),
          new FileTypeValidator({
            fileType: /^(image\/(png|jpe?g|webp|gif)|application\/pdf)$/,
            // O Nest >= 10.4.16 passou a validar os bytes do arquivo (magic
            // numbers) por padrão, o que exige o pacote `file-type`. Aqui
            // mantemos a checagem pelo mimetype, como no roteiro.
            skipMagicNumbersValidation: true,
          }),
        ],
      }),
    )
    arquivo: Express.Multer.File,
  ) {
    return this.tarefasService.anexar(id, arquivo);
  }

  // ---------------------------------------------------------------------
  // Seção 4 do roteiro — "primeiro contato": upload em DISCO (./uploads).
  // Rota separada só para estudo/dev local; o frontend não a usa.
  // O nome é aleatório (randomUUID) — não confiamos no nome original.
  // ---------------------------------------------------------------------
  @Post(':id/anexo-disco')
  @UseInterceptors(
    FileInterceptor('arquivo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => cb(null, randomUUID() + extname(file.originalname)),
      }),
      limits: { fileSize: CINCO_MB },
    }),
  )
  anexarEmDisco(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: CINCO_MB }),
          // Com diskStorage não existe arquivo.buffer, então a validação por
          // magic numbers do Nest novo não tem o que ler: pulamos e usamos o mimetype.
          new FileTypeValidator({ fileType: 'image/png', skipMagicNumbersValidation: true }),
        ],
      }),
    )
    arquivo: Express.Multer.File,
  ) {
    return { nome: arquivo.filename, tam: arquivo.size, url: `/uploads/${arquivo.filename}` };
  }
}
