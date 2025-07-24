import { FlashcardRepository } from '../../repositories/flashcard.repository';
import { FlashcardEntity } from '../../entities/flashcard.entity';

export class UpdateFlashcard {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(flashcard: FlashcardEntity): Promise<FlashcardEntity> {
    return this.flashcardRepository.update(flashcard);
  }
} 