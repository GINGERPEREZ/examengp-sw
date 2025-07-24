import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '../../entities/category.entity';

export class GetCategories {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll();
  }
} 