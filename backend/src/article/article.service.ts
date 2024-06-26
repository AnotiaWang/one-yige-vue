import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Repository } from 'typeorm'
import { Article } from './entities/article.entity'

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name)

  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article'
  }

  async findAll() {
    this.logger.log('findAll')
    return this.articleRepository.find()
  }

  async findOne(id: number) {
    this.logger.log('findOne: ' + id)
    return this.articleRepository.findOneBy({ id })
  }

  async findRandom() {
    this.logger.log('findRandom')
    const count = await this.articleRepository.count()
    const random = Math.floor(Math.random() * count)
    return this.articleRepository.findOneBy({ id: random + 1 })
  }

  async toggleLike(id: number, userId: number) {
    this.logger.log('toggleLike: ' + id)
    const article = await this.articleRepository.findOneBy({ id })
    if (!article) throw new BadRequestException('文章不存在')
    article.likeUsers = article.likeUsers.includes(userId)
      ? article.likeUsers.filter((id) => id !== userId)
      : [...article.likeUsers, userId]
    return this.articleRepository.save(article)
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
