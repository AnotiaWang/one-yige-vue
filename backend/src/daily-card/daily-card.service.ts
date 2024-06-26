import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CreateDailyCardDto } from './dto/create-daily-card.dto'
import { UpdateDailyCardDto } from './dto/update-daily-card.dto'
import { DailyCard } from './entities/daily-card.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DailyCardService {
  private readonly logger = new Logger(DailyCardService.name)

  constructor(
    @Inject('DAILY_CARD_REPOSITORY')
    private dailyCardRepository: Repository<DailyCard>,
  ) {}

  create(createDailyCardDto: CreateDailyCardDto) {
    this.logger.log('createDailyCardDto: ' + JSON.stringify(createDailyCardDto))
    return this.dailyCardRepository.save({
      ...createDailyCardDto,
      createdAt: createDailyCardDto.createdAt || new Date(),
    })
  }

  findAll() {
    this.logger.log('findAll')
    return this.dailyCardRepository.find()
  }

  findOne(id: number) {
    this.logger.log('findOne: ' + id)
    return this.dailyCardRepository.findOneBy({ id })
  }

  update(id: number, updateDailyCardDto: UpdateDailyCardDto) {
    this.logger.log('updateDailyCardDto: ' + JSON.stringify(updateDailyCardDto))

    return this.dailyCardRepository.update(id, updateDailyCardDto)
  }

  remove(id: number) {
    this.logger.log('remove: ' + id)
    return this.dailyCardRepository.delete(id)
  }

  async toggleLike(id: number, userId: number) {
    this.logger.log('like: ' + id + ', ' + userId)
    const dailyCard = await this.dailyCardRepository.findOneBy({ id })
    if (!dailyCard) {
      throw new BadRequestException('此卡片不存在')
    }
    if (dailyCard.likeUsers.includes(userId)) {
      dailyCard.likeUsers = dailyCard.likeUsers.filter((u) => u !== userId)
    } else {
      dailyCard.likeUsers.push(userId)
    }
    return this.dailyCardRepository.save(dailyCard)
  }

  async toggleMark(id: number, userId: number) {
    this.logger.log('mark: ' + id + ', ' + userId)
    const dailyCard = await this.dailyCardRepository.findOneBy({ id })
    if (!dailyCard) {
      throw new BadRequestException('此卡片不存在')
    }
    if (dailyCard.markUsers.includes(userId)) {
      dailyCard.markUsers = dailyCard.markUsers.filter((u) => u !== userId)
    } else {
      dailyCard.markUsers.push(userId)
    }
    return this.dailyCardRepository.save(dailyCard)
  }
}
