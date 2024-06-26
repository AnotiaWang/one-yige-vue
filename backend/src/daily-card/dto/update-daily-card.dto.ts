import { PartialType } from '@nestjs/mapped-types'
import { CreateDailyCardDto } from './create-daily-card.dto'

export class UpdateDailyCardDto extends PartialType(CreateDailyCardDto) {
  content: string
  category: string
  source?: string
  imageUrl: string
}
