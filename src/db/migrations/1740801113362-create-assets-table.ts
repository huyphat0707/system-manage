import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssetsTable1740801113362 implements MigrationInterface {
  name = 'CreateAssetsTable1740801113362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assets\` (\`id\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`serial\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`locationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`locationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`organizationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organizations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` ADD CONSTRAINT \`FK_b594ab59868668b4a1fdbcd97f6\` FOREIGN KEY (\`locationId\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_6b0ab91dc6cd8d205fa2379fe15\` FOREIGN KEY (\`locationId\`) REFERENCES \`locations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_6ccf3c1c271638b4782216853a9\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_6ccf3c1c271638b4782216853a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_6b0ab91dc6cd8d205fa2379fe15\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assets\` DROP FOREIGN KEY \`FK_b594ab59868668b4a1fdbcd97f6\``,
    );
    await queryRunner.query(`DROP TABLE \`organizations\``);
    await queryRunner.query(`DROP TABLE \`locations\``);
    await queryRunner.query(`DROP TABLE \`devices\``);
    await queryRunner.query(`DROP TABLE \`assets\``);
  }
}
