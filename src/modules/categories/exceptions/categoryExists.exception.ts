import { ConflictException } from '@nestjs/common';
 
export class CategoryExistsException extends ConflictException {
  constructor(categoryName: string) {
    super(`Category ${categoryName} already exists`);
  }
}