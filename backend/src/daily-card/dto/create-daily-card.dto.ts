export class CreateDailyCardDto {
  content: string
  category: string
  source?: string
  imageUrl: string
  /** YYYY_MM_DD */
  createdAt?: string
}
