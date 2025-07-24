import { CategoryEntity } from '../entities/category.entity';

export interface CategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity>;
  update(category: CategoryEntity): Promise<CategoryEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<CategoryEntity | null>;
  findByName(name: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
} 