import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { User } from '@app/user/decorators/user.decorator'
import { UserEntity } from '@app/user/user.entity'
import { CreateArticleDto } from '@app/article/dto/createArticle.dto'
import { ArticleResponseInterface } from '@app/article/types/articleResponse.interface'
import { ArticleEntity } from "@app/article/article.entity";

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(currentUser, createArticleDto)
    return this.articleService.buildArticleResponse(article)
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug)
    return this.articleService.buildArticleResponse(article)
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ) {
    return  await this.articleService.deleteArticle(slug, currentUserId)
  }
}
