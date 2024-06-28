import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './user/user.controller'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { UserModule } from './user/user.module'
import { DatabaseModule } from './database/database.module'
import { DailyCardModule } from './daily-card/daily-card.module'
import { ArticleModule } from './article/article.module'

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    DatabaseModule,
    UserModule,
    DailyCardModule,
    ArticleModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
