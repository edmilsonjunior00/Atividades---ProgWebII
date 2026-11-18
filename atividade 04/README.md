# To-Do com JWT + cookie httpOnly — como rodar

Pré-requisitos: Node.js (LTS), Docker Desktop aberto, Postman (app desktop).

## Terminal 1 — banco de dados (pasta todo-auth)
    docker compose up -d db

## Terminal 2 — backend (pasta todo-auth/backend-final)
    cd backend-final
    npm install
    npm run migration:run
    npm run start:dev

Deve aparecer: "API NestJS To-Do em http://localhost:3000/api". Deixe esse terminal aberto.

## Terminal 3 — frontend (pasta todo-auth)
    docker compose up --build

Abra http://localhost:5173

## Postman
File > Import > selecione `To-Do-Auth.postman_collection.json`.
Rode as 8 requisições em ordem (botão Send). Depois do Logout (8), rodar /auth/me e /tarefas deve dar 401.

## Para parar tudo
Ctrl + C nos terminais e depois:  docker compose down
