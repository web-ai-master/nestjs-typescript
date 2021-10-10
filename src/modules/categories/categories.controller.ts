import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/utils/findOneParams';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './models/dto/createCategory.dto';
import { UpdateCategoryDto } from './models/dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService:CategoriesService) { }

    @Get('/get/all/categories')
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }

    @Get('/get/categories/with/posts')
    getAllCategoriesWithPosts() {
        return this.categoriesService.getAllCategoriesWithPosts();
    }

    @Get('/get/category/:id')
    getCategory(@Param() {id}: FindOneParams) {
        return this.categoriesService.getCategory(Number(id));
    }

    @Get('/get/category/with/posts/:id')
    getCategoryWithPosts(@Param() {id}: FindOneParams) {
        return this.categoriesService.getCategoryWithPosts(Number(id));
    }
    
    @Post('/create/category')
    createCategory(@Body() createCategoryDto:CreateCategoryDto) {
        return this.categoriesService.createCategory(createCategoryDto);
    }

    @Patch('/update/category/:id')
    updateCategory(@Param() {id}:FindOneParams, @Body() updateCategoryDto:UpdateCategoryDto) {
        return this.categoriesService.updateCategory(Number(id),updateCategoryDto);
    }

    @Delete('/delete/category/:id')
    deleteCategory(@Param() {id}: FindOneParams) {
        return this.categoriesService.deleteCategory(Number(id));
    }

}


