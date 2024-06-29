import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFloatPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { JwtPayload, User } from './user.entity'
import {
  LoginRequest,
  RegisterRequest,
  UpdateUserInfoRequest,
} from './user.dao'
import { JwtService } from '@nestjs/jwt'
import { Public } from './user.guard'
import { FileInterceptor } from '@nestjs/platform-express'

interface AMapAddress {
  status: string
  regeocode: {
    formatted_address: string
    addressComponent: {
      country: string
      province: string
      city: string
      district: string
      township: string
      adcode: string
    }
  }
}

interface AMapWeather {
  status: string
  count: string
  info: string
  infocode: string
  lives: {
    province: string
    city: string
    adcode: string
    weather: string
    temperature: string
    winddirection: string
    windpower: string
    humidity: string
    reporttime: string
  }[]
}
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
  async getUserInfo(@Req() req: any) {
    const user = req.user as JwtPayload
    this.logger.log(`info: ${user.uid}`)

    const u = await this.userRepository.findOneBy({ id: user.uid })
    if (!u) throw new BadRequestException('用户不存在')

    // @ts-ignore
    u.password = undefined
    return u
  }

  @Post('info')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserInfo(
    @Req() req: any,
    @Body() body: UpdateUserInfoRequest,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000 * 1000,
            message: '图片大小超出限制',
          }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ) {
    const user = req.user as JwtPayload
    this.logger.log(`update: ${user.uid}`)

    const u = await this.userRepository.findOneBy({ id: user.uid })
    if (!u) throw new BadRequestException('用户不存在')
    if (body.nickname) {
      u.nickname = body.nickname
    }
    if (avatar?.mimetype.startsWith('image')) {
      u.avatar = `data:${avatar.mimetype};base64,${avatar.buffer.toString('base64')}`
    }
    const updated = await this.userRepository.save(u)
    return updated
  }

  @Public()
  @Get('weather')
  async getWeather(
    @Query('longtitude', ParseFloatPipe) longtitude: number,
    @Query('latitude', ParseFloatPipe) latitude: number,
  ) {
    this.logger.log(`weather: ${longtitude}, ${latitude}`)
    // 逆编码地址
    const res = await fetch(
      `https://restapi.amap.com/v3/geocode/regeo?key=${process.env.AMAP_API_KEY}&location=${longtitude},${latitude}`,
    )
    const address = (await res.json()) as AMapAddress
    if (typeof address.regeocode.formatted_address !== 'string') {
      throw new BadRequestException('无法获取地址信息')
    }
    const resWeather = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${process.env.AMAP_API_KEY}&city=${address.regeocode.addressComponent.adcode}`,
    )
    const weather = (await resWeather.json()) as AMapWeather
    if (weather.status !== '1') {
      throw new BadRequestException('无法获取天气信息')
    }
    return weather.lives[0]
  }
}
