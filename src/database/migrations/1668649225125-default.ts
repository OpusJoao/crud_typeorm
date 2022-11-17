import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668649225125 implements MigrationInterface {
    name = 'default1668649225125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_subjects" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_3e9444204bd45a027ca38dafb6b" PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb0523888389e9979859054484" ON "room_subjects" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_511e7473fe00bfdab1fbeeb952" ON "room_subjects" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "room_subjects" ADD CONSTRAINT "FK_eb0523888389e99798590544842" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_subjects" ADD CONSTRAINT "FK_511e7473fe00bfdab1fbeeb952e" FOREIGN KEY ("subject_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_subjects" DROP CONSTRAINT "FK_511e7473fe00bfdab1fbeeb952e"`);
        await queryRunner.query(`ALTER TABLE "room_subjects" DROP CONSTRAINT "FK_eb0523888389e99798590544842"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_511e7473fe00bfdab1fbeeb952"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb0523888389e9979859054484"`);
        await queryRunner.query(`DROP TABLE "room_subjects"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }

}
