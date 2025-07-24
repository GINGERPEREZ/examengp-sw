import { FlashcardDatasource } from '../../domain/datasources/flashcard.datasource';
import { FlashcardEntity } from '../../domain/entities/flashcard.entity';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { FlashcardTypeOrm } from '../../data/typeorm/flashcard.entity';
import { CategoryTypeOrm } from '../../data/typeorm/category.entity';
import { UserTypeOrm } from '../../data/typeorm/user.entity';

export class FlashcardTypeOrmDatasourceImpl implements FlashcardDatasource {
  private repo = AppDataSource.getRepository(FlashcardTypeOrm);
  private catRepo = AppDataSource.getRepository(CategoryTypeOrm);
  private userRepo = AppDataSource.getRepository(UserTypeOrm);

  async create(flashcard: FlashcardEntity): Promise<FlashcardEntity> {
    const categories = await this.catRepo.find({ where: flashcard.categories.map(c => ({ id: c.id })) });
    const createdBy = await this.userRepo.findOneBy({ id: flashcard.createdBy });
    if (!createdBy) throw new Error('User not found');
    const saved = await this.repo.save({
      question: flashcard.question,
      answer: flashcard.answer,
      imageUrl: flashcard.imageUrl || undefined,
      createdBy,
      categories
    });
    return FlashcardEntity.fromObject({ ...saved, createdBy: saved.createdBy.id, categories: saved.categories });
  }

  async update(flashcard: FlashcardEntity): Promise<FlashcardEntity> {
    // 1. Busca la flashcard existente
    const existing = await this.repo.findOne({ where: { id: flashcard.id }, relations: ['categories', 'createdBy'] });
    if (!existing) throw new Error('Flashcard not found');

    // 2. Actualiza los campos simples
    existing.question = flashcard.question;
    existing.answer = flashcard.answer;
    existing.imageUrl = flashcard.imageUrl || undefined;

    // 3. Actualiza las categorías si corresponde
    if (flashcard.categories) {
      const categories = await this.catRepo.find({ where: flashcard.categories.map(c => ({ id: c.id })) });
      existing.categories = categories;
    }

    // 4. Guarda la entidad actualizada
    const updated = await this.repo.save(existing);
    return FlashcardEntity.fromObject({ ...updated, createdBy: updated.createdBy.id, categories: updated.categories });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<FlashcardEntity | null> {
    const fc = await this.repo.findOne({ where: { id }, relations: ['categories', 'createdBy'] });
    return fc ? FlashcardEntity.fromObject({ ...fc, createdBy: fc.createdBy.id, categories: fc.categories }) : null;
  }

  async findAll(): Promise<FlashcardEntity[]> {
    const fcs = await this.repo.find({ relations: ['categories', 'createdBy'] });
    return fcs.map(fc => FlashcardEntity.fromObject({ ...fc, createdBy: fc.createdBy.id, categories: fc.categories }));
  }

  async findByCategory(categoryId: number): Promise<FlashcardEntity[]> {
    const fcs = await this.repo
      .createQueryBuilder('flashcard')
      .leftJoinAndSelect('flashcard.categories', 'category')
      .leftJoinAndSelect('flashcard.createdBy', 'createdBy')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
    return fcs.map(fc => FlashcardEntity.fromObject({ ...fc, createdBy: fc.createdBy.id, categories: fc.categories }));
  }
} 