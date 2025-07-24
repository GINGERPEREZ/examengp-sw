import { CategoryRepository } from '../../repositories/category.repository';

export class DeleteCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<void> {
    return this.categoryRepository.delete(id);
  }
} 