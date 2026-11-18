"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const tarefa_entity_1 = require("./tarefas/entities/tarefa.entity");
const user_entity_1 = require("./users/entities/user.entity");
exports.dataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [tarefa_entity_1.Tarefa, user_entity_1.User],
    synchronize: false,
};
const dataSource = new typeorm_1.DataSource({
    ...exports.dataSourceOptions,
    migrations: ['src/migrations/*.ts'],
});
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map