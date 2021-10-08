import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreatePostDto } from './models/dto/createPost.dto';
import { UpdatePostDto } from './models/dto/updatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor( private readonly postsService: PostsService ) {}

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: number) {
        return this.postsService.getPostById(id);
    }

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }

    @Patch(':id')
    async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), updatePostDto);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number) {
        return this.postsService.deletePost(id);
    }
    
}
