import { Test, TestingModule } from '@nestjs/testing';
import { DailyCardService } from './daily-card.service';

describe('DailyCardService', () => {
  let service: DailyCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyCardService],
    }).compile();

    service = module.get<DailyCardService>(DailyCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
