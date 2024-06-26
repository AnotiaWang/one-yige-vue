import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Req,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { JwtPayload, User } from './user.entity'
import { LoginRequest, RegisterRequest } from './user.dao'
import { JwtService } from '@nestjs/jwt'
import { Public } from './user.guard'

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  @Get()
  async test() {
    return true
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginRequest) {
    this.logger.log(`login: ${JSON.stringify(body)}`)
    const { username, password } = body

    const user = await this.userRepository.findOneBy({ username })
    if (!user || user.password !== password) {
      throw new BadRequestException('用户名或密码错误')
    }

    const token = this.jwtService.sign({ uid: user.id }, { expiresIn: '7d' })

    return { token }
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterRequest) {
    this.logger.log(`register: ${JSON.stringify(body)}`)
    const { username, password } = body

    const user = await this.userRepository.findOneBy({ username })
    if (user) throw new BadRequestException('此用户名已被注册')

    const newUser = new User()
    newUser.username = username
    newUser.password = password
    await this.userRepository.save(newUser)

    const token = this.jwtService.sign({ uid: newUser.id }, { expiresIn: '7d' })
    return { token }
  }

  @Get('info')
  async info(@Req() req: any) {
    const user = req.user as JwtPayload
    this.logger.log(`info: ${user.uid}`)

    const u = await this.userRepository.findOneBy({ id: user.uid })
    if (!u) throw new BadRequestException('用户不存在')

    // @ts-ignore
    u.password = undefined
    return u
  }
}
