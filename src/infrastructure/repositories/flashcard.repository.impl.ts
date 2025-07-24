import { FlashcardRepository } from '../../domain/repositories/flashcard.repository';
import { FlashcardEntity } from '../../domain/entities/flashcard.entity';
import { FlashcardDatasource } from '../../domain/datasources/flashcard.datasource';

export class FlashcardRepositoryImpl implements FlashcardRepository {
  constructor(private readonly datasource: FlashcardDatasource) {}

  create(flashcard: FlashcardEntity): Promise<FlashcardEntity> {
    return this.datasource.create(flashcard);
  }
  update(flashcard: FlashcardEntity): Promise<FlashcardEntity> {
    return this.datasource.update(flashcard);
  }
  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
  findById(id: number): Promise<FlashcardEntity | null> {
    return this.datasource.findById(id);
  }
  findAll(): Promise<FlashcardEntity[]> {
    return this.datasource.findAll();
  }
  findByCategory(categoryId: number): Promise<FlashcardEntity[]> {
    return this.datasource.findByCategory(categoryId);
  }
} 