import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DailyCard {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column('date')
  createdAt: Date

  @Column('text')
  category: string

  @Column('text', { nullable: true })
  source?: string

  @Column('text')
  imageUrl: string

  @Column('simple-json', { array: true, default: '[]' })
  likeUsers: number[]

  @Column('simple-json', { array: true, default: '[]' })
  markUsers: number[]
}
