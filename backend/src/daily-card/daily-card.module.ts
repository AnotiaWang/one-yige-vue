import { Module } from '@nestjs/common'
import { DailyCardService } from './daily-card.service'
import { DailyCardController } from './daily-card.controller'
import { DatabaseModule } from 'src/database/database.module'
import { dailyCardProvider } from './daily-card.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [DailyCardController],
  providers: [DailyCardService, dailyCardProvider],
})
export class DailyCardModule {}
