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

export interface AMapWeather {
  province: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
  temperature_float: string
  humidity_float: string
}
