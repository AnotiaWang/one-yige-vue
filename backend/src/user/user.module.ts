import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { userProviders } from './user.provider'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './user.guard'
import 'dotenv/config'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [...userProviders, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [...userProviders],
})
export class UserModule {}
