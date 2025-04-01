import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigrations1743514138549 implements MigrationInterface {
    name = 'FirstMigrations1743514138549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "planName" character varying NOT NULL, "priceINR" numeric NOT NULL, "priceUSD" numeric NOT NULL, "priceEUR" numeric NOT NULL, "coinAllowance" numeric NOT NULL, "bonusCoins" numeric NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paug" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "packageName" character varying NOT NULL, "priceINR" numeric NOT NULL, "priceUSD" numeric NOT NULL, "priceEUR" numeric NOT NULL, "coinAllowance" numeric NOT NULL, "bonusCoins" numeric NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cc7fe4948284334ce268d110501" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature-price" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "featureName" character varying NOT NULL, "featureDisplayName" character varying NOT NULL, "coinCost" numeric NOT NULL, "imageQuality" character varying, "videoGenerationCost" integer, "watermarkRemovalCost" integer, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_c93f39f06d5832e162ef3719a68" UNIQUE ("featureName"), CONSTRAINT "PK_4fdfbf176926a762525d9cad4e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "models" ADD "isFirstTime" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "models" ADD "coinCost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "trainedModelCount" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "trainedModelCount"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "coinCost"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "isFirstTime"`);
        await queryRunner.query(`DROP TABLE "feature-price"`);
        await queryRunner.query(`DROP TABLE "paug"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
