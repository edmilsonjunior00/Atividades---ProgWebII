import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// DTO = formato ESPERADO do corpo da requisição (POST /api/projetos).
// O ValidationPipe global (main.ts) aplica estas regras automaticamente.
export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  descricao?: string;

  // @IsIn aceita apenas valores que estão na lista.
  @IsIn(['vermelho', 'verde', 'azul', 'amarelo', 'roxo'], {
    message: 'A cor deve ser: vermelho, verde, azul, amarelo ou roxo.',
  })
  cor: string;
}
