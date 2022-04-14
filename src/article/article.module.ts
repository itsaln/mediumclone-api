import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from '@app/article/article.controller'
import { ArticleService } from '@app/article/article.service'
import { ArticleEntity } from '@app/article/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
