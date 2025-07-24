import { CategoryDatasource } from '../../domain/datasources/category.datasource';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { CategoryTypeOrm } from '../../data/typeorm/category.entity';

export class CategoryTypeOrmDatasourceImpl implements CategoryDatasource {
  private repo = AppDataSource.getRepository(CategoryTypeOrm);

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const saved = await this.repo.save({ name: category.name, description: category.description });
    return new CategoryEntity(saved.id, saved.name, saved.description);
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    await this.repo.update(category.id, { name: category.name, description: category.description });
    const updated = await this.repo.findOneBy({ id: category.id });
    if (!updated) throw new Error('Category not found');
    return new CategoryEntity(updated.id, updated.name, updated.description);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<CategoryEntity | null> {
    const cat = await this.repo.findOneBy({ id });
    return cat ? new CategoryEntity(cat.id, cat.name, cat.description) : null;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const cat = await this.repo.findOneBy({ name });
    return cat ? new CategoryEntity(cat.id, cat.name, cat.description) : null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const cats = await this.repo.find();
    return cats.map(cat => new CategoryEntity(cat.id, cat.name, cat.description));
  }
} 