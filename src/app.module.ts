import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import ormconfig from '@app/ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { TagModule } from '@app/tag/tag.module'
import { UserModule } from '@app/user/user.module'
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware'
import { ArticleModule } from '@app/article/article.module'
import { ProfileModule } from '@app/profile/profile.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule, ArticleModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
