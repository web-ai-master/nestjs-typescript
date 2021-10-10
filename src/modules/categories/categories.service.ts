import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './models/dto/createCategory.dto';

import { Category } from './models/entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepository:Repository<Category>) { }

    /* create new category */
    async createCategory(createCategoryDto:CreateCategoryDto) {
        const newCategory = await this.categoriesRepository.create(createCategoryDto);
        try {
            await this.categoriesRepository.save(newCategory);
            return newCategory;
        } catch (err) {
            throw new InternalServerErrorException(err)
        }
       
    }
}
