import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// A extensão vem do TIPO já validado, nunca do nome que o cliente mandou.
// (Nomes originais podem ter acento/espaço, e o Supabase recusa chaves assim.)
const EXTENSAO_POR_TIPO: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
};

@Injectable()
export class StorageService {
  private cliente?: SupabaseClient;

  // Cliente criado sob demanda: a API sobe normalmente mesmo sem o .env do
  // Supabase, e o erro (claro) só aparece quando alguém tenta enviar um arquivo.
  private get supabase(): SupabaseClient {
    if (!this.cliente) {
      const url = process.env.SUPABASE_URL;
      const chave = process.env.SUPABASE_SERVICE_KEY;
      if (!url || !chave) {
        throw new InternalServerErrorException(
          'Storage não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_KEY no .env',
        );
      }
      // Estamos no servidor: não há sessão de usuário para persistir.
      this.cliente = createClient(url, chave, { auth: { persistSession: false } });
    }
    return this.cliente;
  }

  private get bucket(): string {
    return process.env.SUPABASE_BUCKET || 'anexos';
  }

  // Envia o arquivo (que está em memória, em arquivo.buffer) e devolve a URL pública.
  async enviar(arquivo: Express.Multer.File): Promise<string> {
    const extensao = EXTENSAO_POR_TIPO[arquivo.mimetype] ?? '';
    const caminho = `tarefas/${randomUUID()}${extensao}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(caminho, arquivo.buffer, { contentType: arquivo.mimetype });
    if (error) {
      const causa = (error as any).originalError?.cause;
      console.error('Erro do Supabase Storage:', error, causa ?? '');
      throw new InternalServerErrorException(
        `Falha ao enviar para o bucket "${this.bucket}": ${error.message}` +
          (causa ? ` (${causa.code ?? causa.message})` : ''),
      );
    }

    const { data } = this.supabase.storage.from(this.bucket).getPublicUrl(caminho);
    return data.publicUrl;
  }
}
