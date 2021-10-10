import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import AuthUser  from 'src/common/decorators/auth-user.decorator';
import { FindOneParams } from 'src/utils/findOneParams';
import { User } from '../users/models/entities/user.entity';
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

    @Get('/:id')
    getPostById(@Param() {id}: FindOneParams) {
        return this.postsService.getPostById(Number(id));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
        return this.postsService.createPost(createPostDto, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    async updatePost(@Param('id') id: string, @AuthUser() user: User,  @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), user, updatePostDto);
    }

    @Delete('/:id')
    async deletePost(@Param('id') id: number) {
        return this.postsService.deletePost(id);
    }
    
}
