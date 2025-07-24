import { FlashcardRepository } from '../../repositories/flashcard.repository';
import { FlashcardEntity } from '../../entities/flashcard.entity';

export class GetFlashcard {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(id: number): Promise<FlashcardEntity | null> {
    return this.flashcardRepository.findById(id);
  }
} 