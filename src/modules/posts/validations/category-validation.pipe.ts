import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from 'src/modules/categories/categories.service';

@Injectable()
export class CategoryValidationPipe implements PipeTransform {
    constructor(private categoriesService:CategoriesService) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const existing = await this.categoriesService.getAllCategories();
        console.log('foo',Object.keys(existing[0]));
        // console.log('foo',existing.find(Category => { return Category.id}));
        if (!(value.category in existing.find(Category => { return Category.id}))) {
            throw new BadRequestException(`${value.category} is not a valid category`)
        }
        return value;
    }
}
