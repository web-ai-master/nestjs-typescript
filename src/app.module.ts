import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), PostsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
