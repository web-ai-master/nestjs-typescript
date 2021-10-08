import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './models/entities/post.entity';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) { }

    /* get all posts */
    async getAllPost() {
        return await this.postsRepository.find();
    }

    /* get single post */
    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id);
        if (post) {
        return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
}
