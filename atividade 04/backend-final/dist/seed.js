"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./data-source"));
const tarefa_entity_1 = require("./tarefas/entities/tarefa.entity");
async function seed() {
    await data_source_1.default.initialize();
    const repo = data_source_1.default.getRepository(tarefa_entity_1.Tarefa);
    await repo.clear();
    await repo.save([
        { titulo: 'Estudar JWT', descricao: 'Autenticação e segurança de APIs', concluida: false },
        { titulo: 'Preparar a aula de hoje', concluida: true },
    ]);
    console.log('Seed concluído!');
    await data_source_1.default.destroy();
}
seed();
//# sourceMappingURL=seed.js.map