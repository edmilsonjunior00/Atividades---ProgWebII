import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// PartialType deixa TODOS os campos de CreateProjetoDto opcionais
// (reaproveitando as mesmas validações) — ideal para edição.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
