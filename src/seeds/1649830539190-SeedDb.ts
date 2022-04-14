import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDb1649830539190 implements MigrationInterface {
  name = 'SeedDb1649830539190'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`)

    // password is 1234
    await queryRunner.query(`INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2a$10$JdF21RAWAe.Jem8bnaYsp.O3OPG9A1Xa5Q7I..t/AD7eRex0WOvf6')`)

    await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article description', 'first article body', 'coffee,dragons', 1)`)

    await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article description', 'second article body', 'coffee,dragons', 1)`)
  }

  public async down(): Promise<void> {
  }
}
