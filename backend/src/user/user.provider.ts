import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { Provider } from '@nestjs/common'

export const userProviders: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
]
