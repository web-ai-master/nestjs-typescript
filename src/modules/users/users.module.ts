import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/entities/user.entity';
import { Address } from './models/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User, Address]
  )],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
