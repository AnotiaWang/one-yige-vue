import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Article } from './entities/article.entity'

export const articleProvider: Provider = {
  provide: 'ARTICLE_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
  inject: ['DATA_SOURCE'],
}
