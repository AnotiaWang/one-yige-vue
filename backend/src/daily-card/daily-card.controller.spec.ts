import { Test, TestingModule } from '@nestjs/testing'
import { DailyCardController } from './daily-card.controller'
import { DailyCardService } from './daily-card.service'

describe('DailyCardController', () => {
  let controller: DailyCardController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyCardController],
      providers: [DailyCardService],
    }).compile()

    controller = module.get<DailyCardController>(DailyCardController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
