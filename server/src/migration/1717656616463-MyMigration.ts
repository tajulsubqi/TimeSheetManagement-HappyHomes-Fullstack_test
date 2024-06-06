import { MigrationInterface, QueryRunner } from "typeorm"

export class MyMigration1717656616463 implements MigrationInterface {
  name = "MyMigration1717656616463"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_7feb4c01b1b454f80673a45b950\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_5a2cfe6f705df945b20c1b22c71\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`proyekId\` \`proyekId\` int NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`userId\` \`userId\` int NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_7feb4c01b1b454f80673a45b950\` FOREIGN KEY (\`proyekId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_5a2cfe6f705df945b20c1b22c71\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_5a2cfe6f705df945b20c1b22c71\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_7feb4c01b1b454f80673a45b950\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`proyekId\` \`proyekId\` int NULL DEFAULT 'NULL'`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_5a2cfe6f705df945b20c1b22c71\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_7feb4c01b1b454f80673a45b950\` FOREIGN KEY (\`proyekId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
