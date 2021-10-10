import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import AuthUser  from 'src/common/decorators/auth-user.decorator';
import { FindOneParams } from 'src/utils/findOneParams';
import { CategoryValidationPipe } from './validations/category-validation.pipe';
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
    @UsePipes(CategoryValidationPipe)
    async createPost(@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
        return await this.postsService.createPost(createPostDto, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    async updatePost(@Param('id') id: string, @AuthUser() user: User,  @Body() updatePostDto: UpdatePostDto) {
        return await this.postsService.updatePost(Number(id), user, updatePostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deletePost(@Param('id') id: number, @AuthUser() user: User) {
        return await this.postsService.deletePost(id, user);
    }
    
}
