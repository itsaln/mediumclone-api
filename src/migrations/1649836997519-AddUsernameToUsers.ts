import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameToUsers1649836997519 implements MigrationInterface {
    name = 'AddUsernameToUsers1649836997519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
