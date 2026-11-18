"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefas1791591234961 = void 0;
class CreateTarefas1791591234961 {
    constructor() {
        this.name = 'CreateTarefas1791591234961';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tarefas"`);
    }
}
exports.CreateTarefas1791591234961 = CreateTarefas1791591234961;
//# sourceMappingURL=1791591234961-CreateTarefas.js.map