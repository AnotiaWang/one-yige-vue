export interface UserInfo {
  id: number
  username: string
  nickname?: string
  avatar?: string
}

export interface DailyCard {
  id: number
  content: string
  /** YYYY-MM-DD */
  createdAt: string
  category: string
  source?: string
  imageUrl: string
  likeUsers: number[]
  markUsers: number[]
}

export interface Article {
  id: number
  title: string
  author: string
  content: string
  likeUsers: number[]
  markUsers: number[]
  createdAt: string
  coverUrl: string
}
