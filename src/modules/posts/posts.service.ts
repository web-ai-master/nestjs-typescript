import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './models/entities/post.entity';
import { CreatePostDto } from './models/dto/createPost.dto';
import { UpdatePostDto } from './models/dto/updatePost.dto';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
import { User } from '../users/models/entities/user.entity';
import { PostNotAuthorException } from './exceptions/postNotAuthor.exception';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) { }

    /* get all posts */
    async getAllPosts() {
        return await this.postsRepository.find({ 
            relations: ['author'] 
        });
    }

    /* get single post */
    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id, { relations: ['author'] });
        if (post) {
            return post;
        }
        throw new PostNotFoundException(id);
    }

    /* create new post */
    async createPost(createPostDto: CreatePostDto, user: User) {
        const newPost = await this.postsRepository.create({
            ...createPostDto,
            author: user
        });
        await this.postsRepository.save(newPost);
        return newPost;
    }

    /* update post */
    async updatePost(id: number, user: User, updatePostDto: UpdatePostDto) {
        
        const post = await this.getPostById(id);
        if(post.author.id === user.id ) {
            await this.postsRepository.update(id, updatePostDto);
            const updatedPost = await this.postsRepository.findOne(id, { relations: ['author'] });
            if (updatedPost) {
                return updatedPost
            }
            throw new PostNotFoundException(id);
        }  
        throw new PostNotAuthorException(post.author.name);
    }

    /* delete post */
    async deletePost(id: number, user: User) {

        const post = await this.getPostById(id);
        if(post.author.id === user.id ) {
            const deleteResponse = await this.postsRepository.delete(id);
            if (!deleteResponse.affected) {
                throw new PostNotFoundException(id);
            }
        }  
        throw new PostNotAuthorException(post.author.name);
    }

}
