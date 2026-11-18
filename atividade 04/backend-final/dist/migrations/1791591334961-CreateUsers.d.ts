import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUsers1791591334961 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
