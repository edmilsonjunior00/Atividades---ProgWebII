import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

// O título é texto digitado pelo usuário e vai para dentro de um HTML:
// escapamos para ele não conseguir injetar tags/links no e-mail.
function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

@Injectable()
export class MailService {
  private cliente?: Resend;

  // Cliente criado sob demanda: `new Resend(undefined)` lança erro, então sem a
  // chave simplesmente não criamos o cliente (e o envio apenas avisa).
  private get resend(): Resend | null {
    const chave = process.env.RESEND_API_KEY;
    if (!chave) return null;
    if (!this.cliente) this.cliente = new Resend(chave);
    return this.cliente;
  }

  async tarefaCriada(para: string, titulo: string): Promise<void> {
    const resend = this.resend;
    if (!resend) {
      console.warn('RESEND_API_KEY não definida: e-mail não enviado.');
      return;
    }

    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM || 'Tarefas <onboarding@resend.dev>',
      to: para,
      subject: 'Nova tarefa criada',
      html: `<p>Sua tarefa <b>${escaparHtml(titulo)}</b> foi criada.</p>`,
    });

    // O SDK do Resend NÃO lança exceção quando a API recusa o envio: ele devolve
    // { data, error }. Se não lançarmos aqui, o .catch() de quem chamou nunca
    // veria o problema (ex.: destinatário não autorizado no modo de teste).
    if (error) throw new Error(error.message);
  }
}
