import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/posts/posts.module';

import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
