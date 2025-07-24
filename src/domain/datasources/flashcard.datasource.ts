import { FlashcardEntity } from '../entities/flashcard.entity';

export interface FlashcardDatasource {
  create(flashcard: FlashcardEntity): Promise<FlashcardEntity>;
  update(flashcard: FlashcardEntity): Promise<FlashcardEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<FlashcardEntity | null>;
  findAll(): Promise<FlashcardEntity[]>;
  findByCategory(categoryId: number): Promise<FlashcardEntity[]>;
} 