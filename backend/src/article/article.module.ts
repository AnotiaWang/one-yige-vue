import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { DatabaseModule } from 'src/database/database.module'
import { articleProvider } from './article.provider'

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, articleProvider],
  imports: [DatabaseModule],
  exports: [articleProvider],
})
export class ArticleModule {}
