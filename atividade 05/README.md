# Atividade 06/11 – Upload de arquivos e envio de e-mail

Programação Web 2 · TSI UNCISAL

Stack: NestJS + TypeORM + PostgreSQL (Docker) no backend, React + Vite no frontend.

## O que foi implementado

- **Upload de anexo em tarefa** (`POST /api/tarefas/:id/anexo`): o arquivo é recebido com Multer (em memória), validado (até 5 MB; PNG, JPG, WEBP, GIF ou PDF), enviado ao bucket `anexos` do Supabase Storage com nome aleatório, e a URL pública é salva na coluna `anexoUrl` (migration `AddAnexoUrl`).
- **Upload em disco** (`POST /api/tarefas/:id/anexo-disco`): versão da seção 4 do roteiro, com Multer `diskStorage` em `./uploads`, servida em `/uploads`.
- **E-mail ao criar tarefa**, via Resend, enviado sem bloquear a resposta. O destinatário é o e-mail do usuário logado (vem do token JWT).
- **Frontend**: botão de clipe para anexar e link "ver anexo" em cada tarefa.

## Status dos testes

- Envio de e-mail: testado e funcionando.
- Upload no bucket: testado e funcionando (o link "ver anexo" abre a imagem hospedada no Supabase). Arquivos acima de 5 MB ou de tipo não permitido são recusados com erro 400.
- Upload em disco: testado e funcionando (o arquivo é salvo em `backend-final/uploads`).

## Como rodar

Requisitos: Node 22 ou superior, Docker e contas no Supabase (bucket público chamado `anexos`) e no Resend.

```bash
# na raiz do projeto
docker compose up -d db

# backend
cd backend-final
npm install
cp .env.example .env     # no cmd do Windows: copy .env.example .env
# preencha SUPABASE_URL, SUPABASE_SERVICE_KEY e RESEND_API_KEY no .env
npm run migration:run
npm run start:dev        # http://localhost:3000/api

# frontend (outro terminal)
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Observação sobre o e-mail: com o remetente de teste `onboarding@resend.dev`, o Resend só entrega para o e-mail da própria conta. Cadastre o usuário do app com esse mesmo e-mail.

O arquivo `.env` contém chaves secretas e não é versionado.
