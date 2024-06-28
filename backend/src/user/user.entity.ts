import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  username: string

  @Column('text')
  password: string

  @Column('text', { nullable: true })
  nickname?: string

  @Column('text', { nullable: true })
  avatar?: string
}

export class JwtPayload {
  uid: number
}
