import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryExistsException } from './exceptions/categoryExists.exception';
import { CategoryNotFoundException } from './exceptions/categoryNotFound.exception';
import { CreateCategoryDto } from './models/dto/createCategory.dto';
import { UpdateCategoryDto } from './models/dto/updateCategory.dto';

import { Category } from './models/entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepository:Repository<Category>) { }

    /* get categories */
    async getAllCategories() {
        return await this.categoriesRepository.find();
    }

    /* get single category */
    async getCategory(id: number) {
        const category = await this.categoriesRepository.findOne(id);
        if (category) {
            return category;
        }
        throw new CategoryNotFoundException(id);
    }

    /* create new category */
    async createCategory(createCategoryDto:CreateCategoryDto) {
        try {
            const newCategory = await this.categoriesRepository.create(createCategoryDto);
            await this.categoriesRepository.save(newCategory);
            return newCategory;
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new CategoryExistsException(createCategoryDto.name)
            } 
            throw new InternalServerErrorException(err)
        }   
    }

    /* update category */
    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
        try {
            const category = await this.getCategory(id);
            if(category) {
                await this.categoriesRepository.update(id, updateCategoryDto);
                const updatedCategory = await this.categoriesRepository.findOne(id);
                return updatedCategory;
            }
            throw new CategoryNotFoundException(id);
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new CategoryExistsException(updateCategoryDto.name)
            } 
            throw new InternalServerErrorException(err)
        }  
    }
}
