"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1791591334961 = void 0;
class CreateUsers1791591334961 {
    constructor() {
        this.name = 'CreateUsers1791591334961';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }
}
exports.CreateUsers1791591334961 = CreateUsers1791591334961;
//# sourceMappingURL=1791591334961-CreateUsers.js.map