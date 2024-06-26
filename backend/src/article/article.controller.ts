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
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Public } from 'src/user/user.guard'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.articleService.findAll()
  }

  @Public()
  @Get('random')
  findRandom() {
    return this.articleService.findRandom()
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Post(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }

  @Post(':id/like')
  toggleLike(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.uid
    return this.articleService.toggleLike(+id, userId)
  }
}
