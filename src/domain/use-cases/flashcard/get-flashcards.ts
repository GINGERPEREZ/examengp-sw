import { FlashcardRepository } from '../../repositories/flashcard.repository';
import { FlashcardEntity } from '../../entities/flashcard.entity';

export class GetFlashcards {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(): Promise<FlashcardEntity[]> {
    return this.flashcardRepository.findAll();
  }
} 