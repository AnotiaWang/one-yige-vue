import { Provider } from '@nestjs/common'
import { DailyCard } from 'src/daily-card/entities/daily-card.entity'
import { User } from 'src/user/user.entity'
import { DataSource } from 'typeorm'

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: './data/data.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      })
      return dataSource.initialize()
    },
  },
]
