import { Provider } from '@nestjs/common'
import { DailyCard } from './entities/daily-card.entity'
import { DataSource } from 'typeorm'

export const dailyCardProvider: Provider = {
  provide: 'DAILY_CARD_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(DailyCard),
  inject: ['DATA_SOURCE'],
}
