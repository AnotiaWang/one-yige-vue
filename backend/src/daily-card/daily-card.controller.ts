import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common'
import { DailyCardService } from './daily-card.service'
import { CreateDailyCardDto } from './dto/create-daily-card.dto'
import { UpdateDailyCardDto } from './dto/update-daily-card.dto'
import { Public } from 'src/user/user.guard'

@Controller('daily-card')
export class DailyCardController {
  constructor(private readonly dailyCardService: DailyCardService) {}

  @Post()
  async create(@Body() createDailyCardDto: CreateDailyCardDto) {
    return this.dailyCardService.create(createDailyCardDto)
  }

  @Public()
  @Get()
  async findAll() {
    return this.dailyCardService.findAll()
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dailyCardService.findOne(+id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDailyCardDto: UpdateDailyCardDto,
  ) {
    await this.dailyCardService.update(+id, updateDailyCardDto)
    const updated = await this.dailyCardService.findOne(+id)
    return updated
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.dailyCardService.remove(+id)
  }

  @Post(':id/like')
  async toggleLike(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.uid
    return this.dailyCardService.toggleLike(+id, userId)
  }

  @Post(':id/mark')
  async toggleMark(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.uid
    return this.dailyCardService.toggleMark(+id, userId)
  }
}
