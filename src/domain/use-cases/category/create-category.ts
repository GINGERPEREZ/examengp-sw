import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '../../entities/category.entity';

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.create(category);
  }
} 