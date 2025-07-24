import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '../../entities/category.entity';

export class GetCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<CategoryEntity | null> {
    return this.categoryRepository.findById(id);
  }
} 