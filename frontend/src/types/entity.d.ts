export interface UserInfo {
  id: number
  username: string
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
