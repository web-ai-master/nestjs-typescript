import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './models/entities/post.entity';
import { CreatePostDto } from './models/dto/createPost.dto';
import { UpdatePostDto } from './models/dto/updatePost.dto';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) { }

    /* get all posts */
    async getAllPosts() {
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

    /* create new post */
    async createPost(createPostDto: CreatePostDto) {
        const newPost = await this.postsRepository.create(createPostDto);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    /* update post */
    async updatePost(id: number, updatePostDto: UpdatePostDto) {
        await this.postsRepository.update(id, updatePostDto);
        const updatedPost = await this.postsRepository.findOne(id);
        if (updatedPost) {
            return updatedPost
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    /* delete post */
    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

}
