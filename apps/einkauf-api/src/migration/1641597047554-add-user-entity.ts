import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserEntity1641597047554 implements MigrationInterface {
    name = 'addUserEntity1641597047554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_username_unique" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_email_unique" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."users_email_unique"`);
        await queryRunner.query(`DROP INDEX "public"."users_username_unique"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
