import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  author: string

  @Column('text')
  content: string

  @Column('json')
  likeUsers: number[]

  @Column('json')
  markUsers: number[]

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('text', { default: '' })
  coverUrl: string
}
