import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryDatasource } from '../../domain/datasources/category.datasource';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {}

  create(category: CategoryEntity): Promise<CategoryEntity> {
    return this.datasource.create(category);
  }
  update(category: CategoryEntity): Promise<CategoryEntity> {
    return this.datasource.update(category);
  }
  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
  findById(id: number): Promise<CategoryEntity | null> {
    return this.datasource.findById(id);
  }
  findByName(name: string): Promise<CategoryEntity | null> {
    return this.datasource.findByName(name);
  }
  findAll(): Promise<CategoryEntity[]> {
    return this.datasource.findAll();
  }
} 