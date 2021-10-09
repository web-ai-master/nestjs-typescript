import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ 
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
        useFactory: async () => ({
          secret: process.env.JWT_SECRET,
        }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
